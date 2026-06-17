# ポケット先輩（歯科衛生士）

新人・若手歯科衛生士向けの教育・学習支援アプリです。診断・治療を目的としたものではありません。

## 絶対ルール

- 診断、治療方針、薬剤判断、麻酔判断、レントゲン読影、外科処置判断、医療事故判断を扱いません。
- OpenAI 等のクラウドLLMには接続しません。
- 相談機能は `src/data/` の監修済み素材を整形するだけです。
- Qwen3 はオンデバイス整形器としてのみ扱い、素材外の医療事実を生成させません。
- Qwen3 ランタイムが利用できない環境でもテンプレート応答で動作します。
- 相談・トーク・マニュアル等の画面に免責文を常設します。

## 免責文

本アプリは教育・学習支援を目的とした参考情報を提供するものであり、診断・治療を行うものではありません。実際の診療判断は歯科医師・所属医院の方針に従ってください。

## 技術スタック

- Expo SDK 56
- React Native 0.85
- TypeScript strict
- Expo Router
- React Native Paper
- AsyncStorage

## 主な機能

- 先輩相談
- 患者説明トーク集
- 学習用マニュアル
- チェックリスト
- ミニ学習クイズ
- お気に入り

## 開発

```bash
npm install
npx expo start
npx tsc --noEmit
```

## iOS / TestFlight

`eas.json` の `submit.production.ios` には、実際の Apple ID、App Store Connect App ID、Team ID を設定してください。

```bash
npx eas build --platform ios --profile production
npx eas submit --platform ios --profile production
```
