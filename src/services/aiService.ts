import { buildNoMatchResponse, buildSafetyFallbackResponse, isUnsafeMedicalJudgmentRequest } from '../constants/safety';
import { findConsultationResponse } from '../data/consultations';
import { ConsultationResponse } from '../types';
import { formatWithOnDeviceQwen } from './onDeviceQwen';
import { enforceResponseSafety } from './safetyGuard';

const RESPONSE_DELAY_MS = 500;

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

  const approvedSource = findConsultationResponse(query) ?? buildNoMatchResponse();
  const qwenFormatted = await formatWithOnDeviceQwen({ query, source: approvedSource });

  return makeSenpaiVoice(qwenFormatted ?? approvedSource);
}
