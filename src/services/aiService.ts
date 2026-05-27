/**
 * AI サービス層
 * 
 * 現在はテンプレートデータからの回答を返す。
 * 将来的にOpenAI APIに差し替え可能な設計。
 * 
 * 差し替え時の手順:
 * 1. このファイルのgetAIResponse関数の中身をOpenAI API呼び出しに変更
 * 2. 環境変数にOPENAI_API_KEYを設定
 * 3. プロンプトテンプレートを設定
 */

import { ConsultationResponse } from '../types';
import { findConsultationResponse } from '../data/consultations';

// AI応答の遅延をシミュレート（UX向上のため）
const SIMULATED_DELAY = 1500;

/**
 * AI風の応答を取得する
 * 将来的にOpenAI APIに差し替え可能
 */
export async function getAIResponse(query: string): Promise<ConsultationResponse> {
  // 応答遅延をシミュレート（AI感を演出）
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

  // テンプレートマッチングで回答を取得
  const response = findConsultationResponse(query);

  if (!response) {
    return {
      id: 'error',
      category: 'エラー',
      keywords: [],
      conclusion: '申し訳ありません。お答えできる内容が見つかりませんでした。',
      fieldAction: '別のキーワードで質問してみてください。',
      patientTalk: '',
      caution: '',
      senpaiMessage: 'ごめんね、うまく答えられなかった。もう少し具体的に教えてもらえると嬉しいな。',
    };
  }

  return response;
}

/**
 * 将来のOpenAI API実装用テンプレート
 * 
 * export async function getOpenAIResponse(query: string): Promise<ConsultationResponse> {
 *   const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
 *     },
 *     body: JSON.stringify({
 *       model: 'gpt-4',
 *       messages: [
 *         { role: 'system', content: SYSTEM_PROMPT },
 *         { role: 'user', content: query },
 *       ],
 *       temperature: 0.7,
 *     }),
 *   });
 *   const data = await response.json();
 *   return parseAIResponse(data.choices[0].message.content);
 * }
 */
