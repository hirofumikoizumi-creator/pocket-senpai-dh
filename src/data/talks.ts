import { TalkScript } from '../types';

export const talkScripts: TalkScript[] = [
  {
    id: 't001',
    category: '説明の基本',
    title: '確認しながら説明する',
    situation: '判断が必要な内容を歯科医師へつなぐ場面',
    dialogues: [
      { speaker: 'dh', text: '今日は確認しながら、わかりやすくご案内しますね。' },
      { speaker: 'patient', text: 'これは悪い状態なんですか？' },
      {
        speaker: 'dh',
        text: '診断に関わる内容は歯科医師が確認します。私は今わかる範囲の説明と、確認が必要な点を整理してお伝えしますね。',
      },
      { speaker: 'patient', text: 'わかりました。' },
    ],
  },
  {
    id: 't002',
    category: 'セルフケア説明',
    title: 'ブラッシングの振り返り',
    situation: 'セルフケアの継続を支援する場面',
    dialogues: [
      { speaker: 'dh', text: '普段の歯みがきで、やりにくい場所はありますか？' },
      { speaker: 'patient', text: '奥のほうがうまく磨けているか不安です。' },
      {
        speaker: 'dh',
        text: 'では今日は、奥のほうを確認しやすい持ち方を一つだけ一緒に練習してみましょう。',
      },
      { speaker: 'patient', text: '一つなら続けられそうです。' },
    ],
  },
  {
    id: 't003',
    category: '不安への声かけ',
    title: '処置前に不安を聞く',
    situation: '患者さんが緊張している場面',
    dialogues: [
      { speaker: 'patient', text: '痛かったらどうしようと思って不安です。' },
      {
        speaker: 'dh',
        text: '不安なお気持ち、教えてくださってありがとうございます。違和感やつらさがあれば、手を上げて知らせてくださいね。',
      },
      { speaker: 'patient', text: '途中で止めてもらえますか？' },
      {
        speaker: 'dh',
        text: 'はい、すぐ確認します。進め方で判断が必要な時は、歯科医師や院内方針を確認しますね。',
      },
    ],
  },
  {
    id: 't004',
    category: '小児対応',
    title: 'できたことを伝える',
    situation: '小児患者さんへ声をかける場面',
    dialogues: [
      { speaker: 'dh', text: 'こんにちは。今日はお口を少しだけ見せてもらうね。' },
      { speaker: 'patient', text: 'こわい。' },
      {
        speaker: 'dh',
        text: '教えてくれてありがとう。まずはこの鏡を見るところから一緒にやってみよう。',
      },
      { speaker: 'dh', text: '今、口を開けられたね。できたところまでで一度確認するね。' },
    ],
  },
];

export function getTalksByCategory(category: string): TalkScript[] {
  return talkScripts.filter((talk) => talk.category === category);
}

export function getTalkCategories(): string[] {
  return [...new Set(talkScripts.map((talk) => talk.category))];
}
