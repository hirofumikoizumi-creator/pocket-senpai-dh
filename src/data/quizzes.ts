import { Quiz } from '../types';

export const quizData: Quiz[] = [
  {
    id: 'q001',
    category: '安全ルール',
    question: '本アプリで扱わない内容はどれですか？',
    options: ['説明の言い換え練習', '学習用チェックリスト', '診断や治療方針の決定', 'セルフケア説明の練習'],
    correctIndex: 2,
    explanation:
      '診断や治療方針の決定は本アプリでは扱いません。歯科医師・所属医院の方針に従います。',
  },
  {
    id: 'q002',
    category: '安全ルール',
    question: '判断が必要な内容を患者さんに聞かれた時の安全な返答はどれですか？',
    options: [
      'この場で決めます',
      '歯科医師または院内方針を確認してからご案内します',
      'ネットで調べて答えます',
      'たぶん大丈夫です',
    ],
    correctIndex: 1,
    explanation:
      '判断が必要な内容は断定せず、歯科医師または院内方針を確認してから案内します。',
  },
  {
    id: 'q003',
    category: '患者説明',
    question: '説明で最初に意識しやすいことはどれですか？',
    options: ['専門用語を増やす', '一文を短くする', '予後を断定する', 'すべて一度に話す'],
    correctIndex: 1,
    explanation:
      '一文を短くすると、患者さんにも伝わりやすく、説明する側も落ち着いて話せます。',
  },
  {
    id: 'q004',
    category: '患者説明',
    question: '患者さんへの説明で避けるべき表現はどれですか？',
    options: ['確認してからご案内します', 'わかりにくい点はありますか', '断定的に言い切る', '一緒に確認しましょう'],
    correctIndex: 2,
    explanation:
      '断定的に言い切る表現は避けます。実際の判断は歯科医師・所属医院の方針に従います。',
  },
  {
    id: 'q005',
    category: 'TBI',
    question: 'TBIで一度に伝える改善ポイントは、どの考え方が安全ですか？',
    options: ['できるだけ多く伝える', '一つか二つに絞る', '患者さんを強く注意する', '全て完璧に直してもらう'],
    correctIndex: 1,
    explanation:
      '続けやすさを重視し、一度に伝えるポイントは一つか二つに絞ると学習支援として扱いやすくなります。',
  },
  {
    id: 'q006',
    category: '職場確認',
    question: '新人が迷った時の行動として安全なのはどれですか？',
    options: ['一人で判断する', '記録・院内手順・確認先を整理する', '患者さんに断定して説明する', '後で忘れる'],
    correctIndex: 1,
    explanation:
      '迷った時は、事実を整理し、院内手順や確認先につなぐことが大切です。',
  },
];

export function getQuizzesByCategory(category: string): Quiz[] {
  return quizData.filter((quiz) => quiz.category === category);
}

export function getQuizCategories(): string[] {
  return [...new Set(quizData.map((quiz) => quiz.category))];
}
