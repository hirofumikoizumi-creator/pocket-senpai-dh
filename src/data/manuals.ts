import { Manual } from '../types';

export const manuals: Manual[] = [
  {
    id: 'm001',
    category: 'TBI',
    title: 'TBIの学習ポイント',
    overview:
      '患者さんの生活に合わせたセルフケア支援を学ぶための参考資料です。個別判断は院内方針に従います。',
    steps: [
      { order: 1, title: '聞き取り', description: '普段の磨き方、困っていること、続けにくい理由を確認する' },
      { order: 2, title: 'できている点の共有', description: '先に良い点を伝え、患者さんが前向きに聞ける雰囲気を作る' },
      { order: 3, title: 'ポイントを絞る', description: '改善ポイントは一度に一つか二つに絞る' },
      { order: 4, title: '練習', description: '鏡や模型を使い、患者さんと一緒に確認する' },
      { order: 5, title: '次回確認', description: '次回までに意識する内容を短く共有する' },
    ],
    tips: [
      '否定から入らない',
      '専門用語を避ける',
      '患者さんの生活リズムに合わせて提案する',
    ],
    cautions: [
      'セルフケアの効果や疾患の改善を断定しない',
      '診断・治療方針の説明は歯科医師や院内方針を優先する',
    ],
  },
  {
    id: 'm002',
    category: 'スケーリング',
    title: 'スケーリング前後の確認',
    overview:
      'スケーリング業務に入る前後の確認事項を学習用に整理した資料です。処置判断は扱いません。',
    steps: [
      { order: 1, title: '院内手順の確認', description: '担当範囲、使用器具、記録方法を院内マニュアルで確認する' },
      { order: 2, title: '患者さんへの声かけ', description: '不安や違和感があれば知らせてもらうよう伝える' },
      { order: 3, title: '記録', description: '気づいた点を主観で断定せず、観察事項として記録する' },
      { order: 4, title: '共有', description: '判断が必要な内容は歯科医師または先輩へ共有する' },
    ],
    tips: [
      '観察事項と判断を分けて考える',
      '患者さんへの説明は短く、確認しながら進める',
      '院内の器具管理ルールを守る',
    ],
    cautions: [
      '出血・疼痛・継続可否の判断をアプリ上で行わない',
      '薬剤や全身状態に関する判断は歯科医師・院内方針へつなぐ',
    ],
  },
  {
    id: 'm003',
    category: '患者説明',
    title: '説明の組み立て方',
    overview:
      '患者さんに安心して聞いてもらうための話し方を学ぶ資料です。医学的判断や治療方針の決定は含みません。',
    steps: [
      { order: 1, title: '目的を伝える', description: '何のための説明かを最初に短く伝える' },
      { order: 2, title: '理由を補足する', description: '専門用語を避け、一般的な言葉で補足する' },
      { order: 3, title: '確認する', description: '不明点がないか、患者さんの理解度を確認する' },
      { order: 4, title: '判断はつなぐ', description: '診断や治療の判断は歯科医師へつなぐ' },
    ],
    tips: [
      '「確認してからお伝えします」を使えるようにする',
      '一文を短くする',
      '患者さんの表情を見る',
    ],
    cautions: [
      '結果や方針を言い切る断定表現を避ける',
      '費用や治療内容は医院の説明ルールに従う',
    ],
  },
  {
    id: 'm004',
    category: '小児対応',
    title: '小児対応の声かけ',
    overview:
      '小児の不安を減らす声かけと環境づくりを学ぶ資料です。処置継続の判断は扱いません。',
    steps: [
      { order: 1, title: '短く挨拶', description: '目線を合わせ、名前を呼びながら短く声をかける' },
      { order: 2, title: '見せて説明', description: '器具や流れを見せ、できるだけ予告する' },
      { order: 3, title: 'できた点を伝える', description: '小さな達成を具体的に伝える' },
      { order: 4, title: '迷ったら確認', description: '泣く・拒否が強い場合は歯科医師や院内方針を確認する' },
    ],
    tips: [
      '怖さをあおる言葉を避ける',
      'できたことを一つ見つける',
      '保護者にも落ち着いた説明をする',
    ],
    cautions: [
      '無理に進める判断をしない',
      '抑制や処置継続の判断は歯科医師・所属医院の方針に従う',
    ],
  },
  {
    id: 'm005',
    category: 'メンテナンス',
    title: 'メンテナンス説明の整理',
    overview:
      '継続受診やセルフケアの振り返りを説明するための学習資料です。個別リスク判定は行いません。',
    steps: [
      { order: 1, title: '前回からの変化', description: '患者さんが感じている変化や困りごとを聞く' },
      { order: 2, title: '良い点の共有', description: '続けられている点を先に伝える' },
      { order: 3, title: '次の目標', description: '次回までの目標を一つに絞る' },
      { order: 4, title: '確認先', description: '受診間隔や方針は院内方針・歯科医師の判断を確認する' },
    ],
    tips: [
      '患者さんの生活背景を聞く',
      '注意点だけでなく続けられている点も伝える',
      '記録は客観的に残す',
    ],
    cautions: [
      '予後や疾患リスクを断定しない',
      '受診間隔の決定をアプリ情報だけで行わない',
    ],
  },
];

export function getManualsByCategory(category: string): Manual[] {
  return manuals.filter((manual) => manual.category === category);
}

export function getManualCategories(): string[] {
  return [...new Set(manuals.map((manual) => manual.category))];
}
