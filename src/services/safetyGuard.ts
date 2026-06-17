import { SAFETY_NOTICE } from '../constants/safety';
import { ConsultationResponse } from '../types';

const UNSAFE_OUTPUT_PATTERNS = [
  /この患者.*です/,
  /治療方針は/,
  /診断(します|できます|です)/,
  /薬剤.*(選択|判断|処方)/,
  /麻酔.*(必要|判断)/,
  /レントゲン.*読影/,
  /外科処置.*判断/,
];

function scrub(value: string): string {
  if (!value) return value;
  if (!UNSAFE_OUTPUT_PATTERNS.some((pattern) => pattern.test(value))) return value;
  return `${SAFETY_NOTICE} 監修済み素材の範囲で、学習用の確認事項として参照してください。`;
}

export function enforceResponseSafety(response: ConsultationResponse): ConsultationResponse {
  return {
    ...response,
    conclusion: scrub(response.conclusion),
    fieldAction: scrub(response.fieldAction),
    patientTalk: scrub(response.patientTalk),
    caution: response.caution ? scrub(response.caution) : SAFETY_NOTICE,
    senpaiMessage: scrub(response.senpaiMessage),
  };
}
