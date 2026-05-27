import { Quiz } from '../types';

/**
 * ミニ学習クイズデータ
 */
export const quizData: Quiz[] = [
  // 歯周病基礎
  {
    id: 'q001',
    category: '歯周病基礎',
    question: '歯周病の直接的な原因は何ですか？',
    options: ['加齢', 'プラーク（歯垢）', '遺伝', '食生活'],
    correctIndex: 1,
    explanation: '歯周病の直接的な原因はプラーク（歯垢）中の細菌です。加齢や遺伝はリスク因子ですが、直接原因ではありません。',
  },
  {
    id: 'q002',
    category: '歯周病基礎',
    question: '健康な歯周ポケットの深さはどれくらいですか？',
    options: ['1〜3mm', '4〜5mm', '6mm以上', '0mm'],
    correctIndex: 0,
    explanation: '健康な歯肉溝（歯周ポケット）の深さは1〜3mmです。4mm以上は歯周病の可能性があります。',
  },
  {
    id: 'q003',
    category: '歯周病基礎',
    question: 'BOP（Bleeding on Probing）は何を示していますか？',
    options: ['歯石の存在', '歯肉の炎症', '虫歯の存在', '知覚過敏'],
    correctIndex: 1,
    explanation: 'BOPはプロービング時の出血で、歯肉に炎症があることを示しています。歯周病の活動性の指標として重要です。',
  },
  // TBI
  {
    id: 'q004',
    category: 'TBI',
    question: 'バス法で歯ブラシを当てる角度は？',
    options: ['歯面に対して90度', '歯軸に対して45度', '歯面に対して0度（水平）', '歯軸に対して90度'],
    correctIndex: 1,
    explanation: 'バス法では歯ブラシの毛先を歯軸に対して45度の角度で歯肉溝に向けて当てます。歯周病予防に効果的な磨き方です。',
  },
  {
    id: 'q005',
    category: 'TBI',
    question: 'TBIで一度に指導するポイントは何点が適切？',
    options: ['5点以上', '3〜4点', '1〜2点', '全部位'],
    correctIndex: 2,
    explanation: '一度に多くのことを指導しても患者さんは覚えきれません。1〜2点に絞って指導し、次回フォローするのが効果的です。',
  },
  // SRP
  {
    id: 'q006',
    category: 'SRP',
    question: 'グレーシーキュレット11/12の適応部位は？',
    options: ['前歯部', '小臼歯部', '大臼歯近心', '大臼歯遠心'],
    correctIndex: 2,
    explanation: 'グレーシーキュレット11/12は大臼歯の近心面に適応します。13/14は大臼歯の遠心面に使用します。',
  },
  {
    id: 'q007',
    category: 'SRP',
    question: 'SRP後に患者さんに起こりやすい症状は？',
    options: ['歯の変色', '知覚過敏', '歯の動揺増加', '口内炎'],
    correctIndex: 1,
    explanation: 'SRP後はセメント質が除去されるため、一時的に知覚過敏が起こることがあります。事前に患者さんに説明しておきましょう。',
  },
  // プラークコントロール
  {
    id: 'q008',
    category: 'プラークコントロール',
    question: '歯ブラシだけでのプラーク除去率は約何%？',
    options: ['約40%', '約60%', '約80%', '約95%'],
    correctIndex: 1,
    explanation: '歯ブラシだけでは約60%のプラークしか除去できません。フロスや歯間ブラシを併用することで80%以上の除去が可能になります。',
  },
  {
    id: 'q009',
    category: 'プラークコントロール',
    question: 'プラークが石灰化して歯石になるまでの期間は？',
    options: ['約1日', '約2〜3日', '約2週間', '約1ヶ月'],
    correctIndex: 2,
    explanation: 'プラークは約2週間で石灰化が始まり歯石になります。そのため、定期的なブラッシングとプロフェッショナルケアが重要です。',
  },
  // 器具知識
  {
    id: 'q010',
    category: '器具知識',
    question: '超音波スケーラーの禁忌はどれ？',
    options: ['高血圧の患者', 'ペースメーカー装着者', '糖尿病の患者', '妊婦'],
    correctIndex: 1,
    explanation: '超音波スケーラーはペースメーカー装着者には禁忌です。電磁波がペースメーカーの動作に影響を与える可能性があります。',
  },
  {
    id: 'q011',
    category: '器具知識',
    question: 'シックルスケーラーの主な用途は？',
    options: ['歯肉縁下の歯石除去', '歯肉縁上の歯石除去', 'ルートプレーニング', '歯面研磨'],
    correctIndex: 1,
    explanation: 'シックルスケーラーは主に歯肉縁上の歯石除去に使用します。歯肉縁下にはキュレットを使用します。',
  },
  // 患者対応
  {
    id: 'q012',
    category: '患者対応',
    question: '小児歯科で用いるTell-Show-Do法の正しい順番は？',
    options: ['見せる→説明する→実行する', '説明する→見せる→実行する', '実行する→説明する→見せる', '説明する→実行する→見せる'],
    correctIndex: 1,
    explanation: 'Tell-Show-Do法は「説明する（Tell）→見せる（Show）→実行する（Do）」の順番で行います。子どもの不安を軽減する効果的な方法です。',
  },
  {
    id: 'q013',
    category: '患者対応',
    question: '高齢者の口腔ケアで最も注意すべきリスクは？',
    options: ['虫歯', '歯周病', '誤嚥', '口内炎'],
    correctIndex: 2,
    explanation: '高齢者の口腔ケアでは誤嚥リスクに最も注意が必要です。水の使用を最小限にし、適切な体位と吸引を行いましょう。',
  },
  {
    id: 'q014',
    category: '患者対応',
    question: '患者さんへの説明で最初に伝えるべきことは？',
    options: ['詳細な手順', '結論（何をするか）', '費用', '所要時間'],
    correctIndex: 1,
    explanation: '患者さんへの説明は「結論→理由→具体的な行動」の順で伝えると分かりやすくなります。まず何をするかを簡潔に伝えましょう。',
  },
  {
    id: 'q015',
    category: '歯周病基礎',
    question: '歯周病のリスク因子として最も影響が大きいのは？',
    options: ['飲酒', '喫煙', '運動不足', '睡眠不足'],
    correctIndex: 1,
    explanation: '喫煙は歯周病の最大のリスク因子です。喫煙者は非喫煙者に比べて歯周病の罹患率が2〜8倍高いとされています。',
  },
];

export function getQuizzesByCategory(category: string): Quiz[] {
  return quizData.filter(q => q.category === category);
}

export function getQuizCategories(): string[] {
  return [...new Set(quizData.map(q => q.category))];
}
