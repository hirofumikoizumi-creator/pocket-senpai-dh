import * as FileSystem from 'expo-file-system';
import { modelManifest } from '../data/modelManifest';
import { ConsultationResponse } from '../types';
import { enforceResponseSafety } from './safetyGuard';

export type OnDeviceQwenStatus =
  | 'ready'
  | 'loading'
  | 'missing_model'
  | 'native_unavailable'
  | 'error';

export type QwenFormatInput = {
  query: string;
  source: ConsultationResponse;
};

type LlamaModule = typeof import('llama.rn');
type LlamaContext = Awaited<ReturnType<LlamaModule['initLlama']>>;

const MIN_REAL_MODEL_BYTES = 500 * 1024 * 1024;
const STOP_WORDS = ['</s>', '<|end|>', '<|im_end|>', '<|endoftext|>'];

let contextPromise: Promise<LlamaContext | null> | null = null;
let lastStatus: OnDeviceQwenStatus = 'loading';

function getBundledModelCandidates(): string[] {
  const bundleDirectory = (FileSystem as typeof FileSystem & { bundleDirectory?: string }).bundleDirectory;
  if (!bundleDirectory) return [];

  return [
    `${bundleDirectory}${modelManifest.filename}`,
    `${bundleDirectory}assets/models/${modelManifest.filename}`,
  ];
}

async function getBundledModelUri(): Promise<string | null> {
  for (const uri of getBundledModelCandidates()) {
    const info = await FileSystem.getInfoAsync(uri);
    if (info.exists && typeof info.size === 'number' && info.size >= MIN_REAL_MODEL_BYTES) {
      return uri.startsWith('file://') ? uri : `file://${uri}`;
    }
  }

  return null;
}

async function loadContext(): Promise<LlamaContext | null> {
  try {
    const model = await getBundledModelUri();
    if (!model) {
      lastStatus = 'missing_model';
      return null;
    }

    const llama = await import('llama.rn');
    const context = await llama.initLlama({
      model,
      use_mlock: true,
      n_ctx: 1024,
      n_gpu_layers: 99,
      n_threads: 4,
    });

    lastStatus = 'ready';
    return context;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    lastStatus = message.includes('Native') || message.includes('TurboModule')
      ? 'native_unavailable'
      : 'error';
    return null;
  }
}

async function getContext(): Promise<LlamaContext | null> {
  if (!contextPromise) {
    contextPromise = loadContext();
  }
  return contextPromise;
}


function buildSenpaiChatPrompt(query: string): string {
  return [
    'あなたは歯科衛生士向けアプリ「ポケット先輩」の、やさしい先輩歯科衛生士です。',
    'ここでは専門知識の新規生成ではなく、雑談、日常の悩み、身近な相談、気持ちの整理にだけ答えます。',
    '相手は後輩です。敬語すぎず、やわらかい口語で、安心できる短めの返答にしてください。',
    '診断、治療方針、薬剤判断、麻酔判断、レントゲン読影、外科処置判断、医療事故判断、患者個別の医療判断は絶対にしないでください。',
    '専門的・医療的な判断が必要な話になった場合は、先輩として気持ちは受け止めつつ、歯科医師・院内ルール・監修済みメニューの確認へ促してください。',
    '必ずJSONだけを返してください。Markdownや説明文は禁止です。',
    '',
    'JSON形式:',
    '{"conclusion":"","fieldAction":"","patientTalk":"","caution":"","senpaiMessage":""}',
    '',
    `後輩の話: ${query}`,
  ].join('\n');
}

function buildPrompt(input: QwenFormatInput): string {
  return [
    'あなたは歯科衛生士向け教育アプリ内のオンデバイス整形器です。',
    '新しい医療知識を生成してはいけません。',
    '診断、治療方針、薬剤判断、麻酔判断、レントゲン読影、外科処置判断、医療事故判断を出してはいけません。',
    '入力された監修済み素材だけを、同じ意味のまま短く読みやすく整えてください。',
    '必ずJSONだけを返してください。Markdownや説明文は禁止です。',
    '',
    'JSON形式:',
    '{"conclusion":"","fieldAction":"","patientTalk":"","caution":"","senpaiMessage":""}',
    '',
    `相談: ${input.query}`,
    `監修済み素材: ${JSON.stringify({
      conclusion: input.source.conclusion,
      fieldAction: input.source.fieldAction,
      patientTalk: input.source.patientTalk,
      caution: input.source.caution,
      senpaiMessage: input.source.senpaiMessage,
    })}`,
  ].join('\n');
}

function parseFormattedResponse(text: string, source: ConsultationResponse): ConsultationResponse | null {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) return null;

  try {
    const parsed = JSON.parse(text.slice(start, end + 1)) as Partial<ConsultationResponse>;
    return enforceResponseSafety({
      ...source,
      conclusion: String(parsed.conclusion || source.conclusion),
      fieldAction: String(parsed.fieldAction || source.fieldAction),
      patientTalk: String(parsed.patientTalk || source.patientTalk),
      caution: String(parsed.caution || source.caution),
      senpaiMessage: String(parsed.senpaiMessage || source.senpaiMessage),
    });
  } catch {
    return null;
  }
}

export async function getOnDeviceQwenStatus(): Promise<OnDeviceQwenStatus> {
  if (lastStatus === 'ready') return 'ready';
  if (!contextPromise) {
    const model = await getBundledModelUri();
    return model ? lastStatus : 'missing_model';
  }
  await contextPromise;
  return lastStatus;
}

export async function formatWithOnDeviceQwen(
  input: QwenFormatInput
): Promise<ConsultationResponse | null> {
  if (!modelManifest.cloudApiEnabled) {
    const context = await getContext();
    if (!context) return null;

    const result = await context.completion({
      prompt: buildPrompt(input),
      n_predict: 220,
      temperature: 0.1,
      top_k: 20,
      top_p: 0.8,
      stop: STOP_WORDS,
    });

    return parseFormattedResponse(result.text, input.source);
  }

  return null;
}

export async function chatWithOnDeviceSenpai(query: string): Promise<ConsultationResponse | null> {
  if (!modelManifest.cloudApiEnabled) {
    const context = await getContext();
    if (!context) return null;

    const source: ConsultationResponse = {
      id: `senpai-chat-${Date.now()}`,
      category: '先輩との雑談',
      keywords: [],
      conclusion: '話してくれてありがとう。先輩として、まずは気持ちを一緒に整理するね。',
      fieldAction: '',
      patientTalk: '',
      caution: '専門的な判断が必要な内容は、歯科医師・所属医院の方針・監修済みメニューを確認してください。',
      senpaiMessage: 'ひとりで抱えなくて大丈夫。少しずつ一緒に考えよう。',
    };

    const result = await context.completion({
      prompt: buildSenpaiChatPrompt(query),
      n_predict: 260,
      temperature: 0.65,
      top_k: 40,
      top_p: 0.9,
      stop: STOP_WORDS,
    });

    return parseFormattedResponse(result.text, source);
  }

  return null;
}

