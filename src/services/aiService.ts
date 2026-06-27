import { buildNoMatchResponse, buildSafetyFallbackResponse, isUnsafeMedicalJudgmentRequest } from '../constants/safety';
import { findConsultationResponse } from '../data/consultations';
import { ConsultationResponse } from '../types';
import { chatWithOnDeviceSenpai, formatWithOnDeviceQwen } from './onDeviceQwen';
import { enforceResponseSafety } from './safetyGuard';

const RESPONSE_DELAY_MS = 500;


const PROFESSIONAL_CONSULTATION_PATTERNS = [
  /歯|口腔|歯肉|歯周|虫歯|う蝕|患者|診療|医院|歯科|衛生士/,
  /SRP|SC|TBI|PMTC|P検|プロービング|スケーリング|メンテナンス/i,
  /出血|疼痛|痛み|腫れ|膿|麻酔|薬|処方|レントゲン|X線|抜歯|外科|感染/,
  /器具|滅菌|消毒|印象|補綴|矯正|義歯|インプラント|ホワイトニング/,
  /説明|申し送り|カルテ|記録|報告|院内|マニュアル/,
];

function isLikelyProfessionalConsultation(query: string): boolean {
  return PROFESSIONAL_CONSULTATION_PATTERNS.some((pattern) => pattern.test(query));
}

function buildCasualFallbackResponse(query: string): ConsultationResponse {
  const trimmed = query.trim();
  return enforceResponseSafety({
    id: `senpai-chat-${Date.now()}`,
    category: '先輩との雑談',
    keywords: [],
    conclusion: trimmed
      ? `話してくれてありがとう。${trimmed.length > 18 ? 'その気持ち、ちゃんと受け止めるね。' : 'うん、聞いてるよ。'}`
      : '話してくれてありがとう。先輩として、まずは気持ちを一緒に整理するね。',
    fieldAction:
      '今すぐ答えを出そうとしなくて大丈夫。まずは「何がしんどいか」「本当はどうしたいか」を一つずつ分けてみよう。',
    patientTalk: '',
    caution:
      '専門的な判断や患者さん個別の内容は、監修済みメニュー・歯科医師・所属医院の方針を確認してください。',
    senpaiMessage:
      'ひとりで抱えなくて大丈夫。雑談でも相談でも、ここでは先輩に話す感じで少しずつ言葉にしていこうね。',
  });
}


function addPrefix(text: string, prefix: string): string {
  if (!text.trim()) return text;
  return text.startsWith(prefix) ? text : `${prefix}${text}`;
}

function addSuffix(text: string, suffix: string): string {
  if (!text.trim() || text.includes(suffix)) return text;
  return `${text} ${suffix}`;
}

function makeSenpaiVoice(response: ConsultationResponse): ConsultationResponse {
  const safe = enforceResponseSafety(response);
  if (safe.category === 'エラー') return safe;

  return enforceResponseSafety({
    ...safe,
    conclusion: addPrefix(safe.conclusion, '大丈夫、まずはここから整理してみよう。'),
    fieldAction: safe.fieldAction ? addPrefix(safe.fieldAction, '現場ではね、') : safe.fieldAction,
    caution: safe.caution ? addPrefix(safe.caution, 'ここだけは一緒に気をつけよう。') : safe.caution,
    senpaiMessage: addSuffix(
      safe.senpaiMessage || '焦らなくて大丈夫。確認しながら進めればいいよ。',
      'ひとりで抱えず、一緒に確認していこうね。'
    ),
  });
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAIResponse(query: string): Promise<ConsultationResponse> {
  await wait(RESPONSE_DELAY_MS);

  if (isUnsafeMedicalJudgmentRequest(query)) {
    return makeSenpaiVoice(buildSafetyFallbackResponse(query));
  }

  const approvedSource = findConsultationResponse(query);

  if (approvedSource) {
    const qwenFormatted = await formatWithOnDeviceQwen({ query, source: approvedSource });
    return makeSenpaiVoice(qwenFormatted ?? approvedSource);
  }

  if (!isLikelyProfessionalConsultation(query)) {
    const senpaiChat = await chatWithOnDeviceSenpai(query);
    return makeSenpaiVoice(senpaiChat ?? buildCasualFallbackResponse(query));
  }

  const fallbackSource = buildNoMatchResponse();
  const qwenFormatted = await formatWithOnDeviceQwen({ query, source: fallbackSource });

  return makeSenpaiVoice(qwenFormatted ?? fallbackSource);
}
