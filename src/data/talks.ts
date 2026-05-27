import { TalkScript } from '../types';

/**
 * 患者説明トーク集データ
 */
export const talkScripts: TalkScript[] = [
  {
    id: 't001',
    category: '歯周病説明',
    title: '歯周病の基本説明',
    situation: '初診の患者さんに歯周病について説明する場面',
    dialogues: [
      { speaker: 'dh', text: '検査の結果、歯ぐきに少し炎症がみられます。歯周病の初期段階ですね。' },
      { speaker: 'patient', text: '歯周病って歯が抜けちゃうんですか？' },
      { speaker: 'dh', text: '今の段階でしっかりケアすれば大丈夫ですよ。歯周病は歯を支えている骨が少しずつ溶ける病気なんですが、早期に対応すれば進行を止められます。' },
      { speaker: 'patient', text: '何をすればいいですか？' },
      { speaker: 'dh', text: 'まずは毎日の歯磨きで歯と歯ぐきの境目を丁寧に磨くこと、そして定期的にクリーニングに来ていただくことが大切です。一緒に頑張りましょうね。' },
    ],
  },
  {
    id: 't002',
    category: 'フロス説明',
    title: 'フロスの使い方と重要性',
    situation: 'フロスを使っていない患者さんへの説明',
    dialogues: [
      { speaker: 'dh', text: '歯ブラシだけだと、実は歯と歯の間の汚れは60%くらいしか取れないんです。' },
      { speaker: 'patient', text: 'えっ、そんなに取れてないんですか？' },
      { speaker: 'dh', text: 'そうなんです。フロスを使うと80%以上きれいにできますよ。特に歯と歯の間は虫歯になりやすい場所なので、フロスがとても効果的なんです。' },
      { speaker: 'patient', text: 'フロスって難しそう...' },
      { speaker: 'dh', text: '最初は鏡を見ながらゆっくりでOKですよ。今日は一緒に練習してみましょうか？コツをつかめばすぐ慣れますよ。' },
    ],
  },
  {
    id: 't003',
    category: '歯石説明',
    title: '歯石除去の必要性',
    situation: '歯石除去を嫌がる患者さんへの説明',
    dialogues: [
      { speaker: 'patient', text: '歯石取りって痛いから嫌なんですよね...' },
      { speaker: 'dh', text: 'お気持ちよく分かります。できるだけ痛みが少ないように丁寧に行いますね。' },
      { speaker: 'dh', text: '歯石は歯ブラシでは取れない硬い汚れで、放っておくと歯周病が進んでしまうんです。定期的に取ることで歯ぐきが健康に保てますよ。' },
      { speaker: 'patient', text: 'どのくらいの頻度で来ればいいですか？' },
      { speaker: 'dh', text: '個人差はありますが、3〜4ヶ月に1回が目安です。こまめに来ていただくと、1回あたりの歯石も少なくなるので、痛みも軽くなりますよ。' },
    ],
  },
  {
    id: 't004',
    category: '定期検診説明',
    title: '定期検診の重要性',
    situation: '治療が終わった患者さんに定期検診を勧める場面',
    dialogues: [
      { speaker: 'dh', text: '今日で治療は一段落ですね。お疲れさまでした！' },
      { speaker: 'patient', text: 'ありがとうございます。もう来なくていいですか？' },
      { speaker: 'dh', text: 'ぜひ定期検診にいらしてくださいね。虫歯や歯周病は初期段階では自覚症状がないことが多いので、定期的にチェックすることで早期発見できるんです。' },
      { speaker: 'dh', text: '定期検診に通っている方は、そうでない方に比べて将来残る歯の本数が多いというデータもあるんですよ。' },
      { speaker: 'patient', text: 'そうなんですね。じゃあ次の予約を入れておきます。' },
    ],
  },
  {
    id: 't005',
    category: '小児歯科説明',
    title: '保護者への仕上げ磨き説明',
    situation: 'お子さんの仕上げ磨きについて保護者に説明する場面',
    dialogues: [
      { speaker: 'dh', text: 'お子さんの歯磨き、おうちではどうされていますか？' },
      { speaker: 'patient', text: '自分で磨いてるんですけど、ちゃんと磨けてるか心配で...' },
      { speaker: 'dh', text: '小学校低学年くらいまでは、仕上げ磨きをしてあげるのがおすすめです。特に奥歯や歯と歯の間は子どもには難しい場所なんです。' },
      { speaker: 'dh', text: '寝る前に膝の上に頭を乗せて、お口の中を見ながら磨いてあげてくださいね。1〜2分で大丈夫ですよ。' },
      { speaker: 'patient', text: '分かりました。やってみます！' },
    ],
  },
  {
    id: 't006',
    category: '自費クリーニング説明',
    title: '自費クリーニングの提案',
    situation: '審美的なクリーニングに興味がある患者さんへの説明',
    dialogues: [
      { speaker: 'patient', text: '歯の着色が気になるんですけど...' },
      { speaker: 'dh', text: 'コーヒーやお茶の着色ですね。保険のクリーニングでもある程度きれいになりますが、より徹底的にきれいにしたい場合は自費のクリーニングもございます。' },
      { speaker: 'patient', text: 'どう違うんですか？' },
      { speaker: 'dh', text: '自費クリーニングでは、専用のパウダーを使って細かい着色まで除去できます。また、時間をかけて丁寧に行うので、仕上がりがとてもツルツルになりますよ。' },
      { speaker: 'dh', text: '料金は○○円で、所要時間は約60分です。ご興味があればお気軽にご相談くださいね。' },
    ],
  },
];

export function getTalksByCategory(category: string): TalkScript[] {
  return talkScripts.filter(t => t.category === category);
}

export function getTalkCategories(): string[] {
  return [...new Set(talkScripts.map(t => t.category))];
}
