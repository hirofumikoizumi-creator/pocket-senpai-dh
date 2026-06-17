import { buildNoMatchResponse } from '../constants/safety';
import { ConsultationResponse } from '../types';

export const consultationData: ConsultationResponse[] = [
  {
    id: 'c001',
    category: 'SRP・出血時の不安',
    keywords: ['SRP', '出血', '不安', 'スケーリング', '歯石除去'],
    conclusion:
      'SRPやスケーリング中に出血が気になる場合は、量や続き方を観察し、自己判断せず院内の報告ルールに沿って確認します。',
    fieldAction:
      '1. いつ・どの部位で・どの程度気になったかを整理する  2. 患者さんの様子を確認する  3. 歯科医師または先輩へ早めに共有する  4. 院内マニュアルの手順を再確認する',
    patientTalk:
      '「少し確認が必要ですので、歯科医師または院内の方針を確認しながら進めますね。」',
    caution:
      '止血や処置継続の判断、服薬に関する判断は本アプリでは扱いません。必ず歯科医師・所属医院の方針に従ってください。',
    senpaiMessage:
      '出血を見ると不安になりますよね。まずは落ち着いて、観察したことを短く整理して共有できれば十分です。',
  },
  {
    id: 'c002',
    category: '患者説明',
    keywords: ['患者説明', '苦手', '説明', 'コミュニケーション', '伝え方'],
    conclusion:
      '患者説明は「確認したこと」「これから確認すること」「院内方針に従うこと」を分けて伝えると、学習中でも落ち着いて話しやすくなります。',
    fieldAction:
      '1. 専門用語を減らす  2. 断定せず、確認中の内容は確認中と伝える  3. 最後に不明点がないか聞く  4. 判断が必要な内容は歯科医師へつなぐ',
    patientTalk:
      '「わかりにくい点があれば途中で止めてくださいね。判断が必要な内容は、歯科医師に確認してからご案内します。」',
    caution:
      '診断名・治療方針・予後を断定する説明は避けてください。医院で決まっている説明文や歯科医師の指示を優先します。',
    senpaiMessage:
      '上手に話そうとしすぎなくて大丈夫。安全に確認しながら伝える姿勢のほうが大事です。',
  },
  {
    id: 'c003',
    category: '小児対応',
    keywords: ['小児', '子ども', '怖い', '泣く', '対応', 'キッズ'],
    conclusion:
      '小児対応では、無理に進めず、安心できる声かけと院内方針の確認を優先します。',
    fieldAction:
      '1. 目線を合わせて短く声をかける  2. 器具や流れを見せて説明する  3. できたことを具体的に伝える  4. 進め方に迷う場合は歯科医師・先輩へ確認する',
    patientTalk:
      '「今日はできるところまで一緒にやってみようね。苦しくなったら手を上げて教えてね。」',
    caution:
      '抑制や処置継続の判断は本アプリでは扱いません。必ず歯科医師・所属医院の方針を確認してください。',
    senpaiMessage:
      '小児対応は、できたことを一つ見つけるだけでも前進です。焦らず安全第一でいきましょう。',
  },
  {
    id: 'c004',
    category: '職場コミュニケーション',
    keywords: ['先輩', 'コミュニケーション', '人間関係', '職場', '悩み', '怖い'],
    conclusion:
      '職場で困った時は、事実・相談したいこと・確認したいことを分けて伝えると相談しやすくなります。',
    fieldAction:
      '1. 事実をメモする  2. 何を確認したいか一つに絞る  3. 指示は復唱する  4. 困りごとが続く場合は院内の相談先へ共有する',
    patientTalk: '',
    caution:
      'ハラスメントや安全に関わる内容を一人で抱え込まないでください。院内外の相談窓口も活用しましょう。',
    senpaiMessage:
      '質問するのは悪いことではありません。安全に働くための確認だと思って、短く聞いてみましょう。',
  },
  {
    id: 'c005',
    category: 'メンテナンス説明',
    keywords: ['メンテナンス', '説明', '定期検診', 'リコール', '継続'],
    conclusion:
      'メンテナンスの説明は、医院の方針に沿って、継続受診の目的やセルフケアの振り返りをわかりやすく伝えます。',
    fieldAction:
      '1. 前回からの変化を確認する  2. 良かった点を先に伝える  3. 次回までの目標を一つに絞る  4. 受診間隔は院内方針・歯科医師の判断に従う',
    patientTalk:
      '「前回から続けられている点がありますね。次回までに意識するところを一つだけ一緒に決めましょう。」',
    caution:
      '個別のリスク判定や受診間隔の決定は本アプリでは扱いません。歯科医師・所属医院の方針を優先してください。',
    senpaiMessage:
      'できている点を先に伝えると、患者さんも前向きに聞きやすくなります。',
  },
  {
    id: 'c006',
    category: 'TBI',
    keywords: ['TBI', 'ブラッシング', '歯磨き指導', '指導', 'プラーク'],
    conclusion:
      'TBIでは、完璧を求めず、患者さんが続けやすいポイントを一つずつ整理します。',
    fieldAction:
      '1. 普段の磨き方を聞く  2. できている点を伝える  3. 改善点は一つか二つに絞る  4. 次回確認する内容を共有する',
    patientTalk:
      '「今できているところもあります。今日は次回までに意識する場所を一つだけ決めてみましょう。」',
    caution:
      '患者さんを否定する表現や、個別の治療効果を断定する表現は避けてください。',
    senpaiMessage:
      'TBIは一緒に作戦会議をするイメージです。できることから始めれば大丈夫。',
  },
];

export function findConsultationResponse(query: string): ConsultationResponse | null {
  const normalizedQuery = query.toLowerCase();
  let bestMatch: ConsultationResponse | null = null;
  let bestScore = 0;

  for (const item of consultationData) {
    const score = item.keywords.reduce((total, keyword) => {
      return normalizedQuery.includes(keyword.toLowerCase()) ? total + 1 : total;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  return bestScore > 0 ? bestMatch : buildNoMatchResponse();
}
