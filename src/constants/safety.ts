import { ConsultationResponse } from '../types';

export const FULL_DISCLAIMER =
  '本アプリは教育・学習支援を目的とした参考情報を提供するものであり、診断・治療を行うものではありません。実際の診療判断は歯科医師・所属医院の方針に従ってください。';

export const SAFETY_NOTICE =
  '診断・治療方針・薬剤・麻酔・レントゲン読影・外科処置・医療事故の判断は扱えません。必要な判断は歯科医師・所属医院の方針を確認してください。';

const UNSAFE_REQUEST_PATTERNS = [
  /診断/,
  /治療方針/,
  /薬剤|投薬|処方|服薬判断/,
  /麻酔/,
  /レントゲン|X線|読影/,
  /外科|抜歯|切開/,
  /医療事故|過誤/,
  /病気です|疾患です/,
];

export function isUnsafeMedicalJudgmentRequest(text: string): boolean {
  return UNSAFE_REQUEST_PATTERNS.some((pattern) => pattern.test(text));
}

export function buildSafetyFallbackResponse(query: string): ConsultationResponse {
  return {
    id: 'safety-fallback',
    category: '安全確認',
    keywords: [],
    conclusion:
      'これは診断・治療などの判断に関わる可能性があるから、ここでは断定しないでおこうね。学習用として、確認する順番を一緒に整理しよう。',
    fieldAction:
      '患者さん個別の判断は自分だけで決めず、記録・院内手順・歯科医師または所属医院の方針を確認してね。緊急性を感じる時も、院内の報告ルートで早めに共有しよう。',
    patientTalk:
      '「確認が必要な内容ですので、歯科医師または医院の方針を確認してからご案内します。」',
    caution: SAFETY_NOTICE,
    senpaiMessage:
      query.trim().length > 0
        ? '判断に迷う内容を一人で抱えないことが大切です。学習アプリの範囲を超える部分は、必ず院内で確認しましょう。'
        : '相談内容を入力するときも、患者さん個人を特定できる情報は入れないでください。',
  };
}

export function buildNoMatchResponse(): ConsultationResponse {
  return {
    id: 'template-fallback',
    category: '一般',
    keywords: [],
    conclusion:
      'ぴったり同じ相談例は見つからなかったけれど、大丈夫。まずは状況・困っている点・確認先を分けて考えてみよう。',
    fieldAction:
      '1. 何に困っているかを短く書き出す  2. 患者さんへの説明なのか、手順確認なのかを分ける  3. 判断が必要な部分は歯科医師・先輩・院内マニュアルへ確認する。この順番で見れば落ち着いて動けるよ。',
    patientTalk: '「確認してから、わかりやすくご案内しますね。」',
    caution: SAFETY_NOTICE,
    senpaiMessage:
      'うまく言葉にできない時は、まず「何が不安か」だけでも大丈夫。判断ではなく、確認する順番を一緒に整理していきましょう。',
  };
}
