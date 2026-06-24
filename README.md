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
- RevenueCat
- Google AdMob

## 主な機能

- 先輩相談
- 患者説明トーク集
- 学習用マニュアル
- チェックリスト
- ミニ学習クイズ
- お気に入り
- 月額500円プレミアムプラン

## 開発

```bash
npm install
npx expo start
npx tsc --noEmit
```

## ブラウザでテスト

ローカルでWeb版を起動する場合は次を使います。

```bash
npm install
npm run web
```

静的Web版を書き出す場合は次を使います。

```bash
npm run export:web
```

GitHub Pages用のworkflowも追加しています。GitHubの `Actions` タブで `Deploy web preview` を実行すると、Expo Web版が `dist` に書き出され、GitHub Pagesへ公開されます。

```text
https://hirofumikoizumi-creator.github.io/pocket-senpai-dh/
```

## 本番設定

本番ビルドでは `app.config.js` が次の環境変数を読み込みます。未設定、またはダミー値のままの場合は本番ビルド前の検証で失敗します。

```text
ADMOB_IOS_APP_ID
ADMOB_ANDROID_APP_ID
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
REVENUECAT_IOS_API_KEY
REVENUECAT_ANDROID_API_KEY
```

検証だけを実行する場合は次を使います。

```bash
npm run validate:production-config
```

EAS Build では、これらの値を EAS environment variables / secrets に登録してから production profile を実行してください。添付IPAと同じ本番アプリに合わせる場合は、IPAに含まれる広告IDやFirebase設定と同じ値を登録します。

## AdMob

無料プランでは広告を表示し、プレミアムでは広告を非表示にします。

現在の広告ユニットIDは次の値を使用します。

```text
banner_main: ca-app-pub-5840457424714744/1680532309
interstitial_main: ca-app-pub-5840457424714744/6338530833
reward_main: ca-app-pub-5840457424714744/6918370940
```

`ADMOB_IOS_APP_ID` / `ADMOB_ANDROID_APP_ID` には、広告ユニットIDではなく AdMob のアプリIDを設定してください。形式は `ca-app-pub-...~...` です。

必要に応じて広告ユニットIDも EAS environment variables で上書きできます。

```text
ADMOB_BANNER_UNIT_ID
ADMOB_INTERSTITIAL_UNIT_ID
ADMOB_REWARDED_UNIT_ID
```

## RevenueCat / アプリ内課金

月額500円プランは RevenueCat 経由で Apple / Google のストア課金を扱います。

RevenueCat 側では次の設定名に合わせてください。

```text
Entitlement: premium
Offering: default
Product ID: pocket_senpai_monthly_500
```

アプリ側では `react-native-purchases` を使って、購入、復元、現在の購読状態確認を行います。Web版ではネイティブ課金が使えないため、課金画面には設定案内と開発用の表示切替だけが出ます。

## オンデバイスQwen3

ローカルLLM実行には `llama.rn` を使います。クラウドLLMには接続しません。

本番ビルド前に、次のファイルを実モデルへ差し替えてください。

```text
assets/models/Qwen3-0.6B-Q8_0.gguf
```

このリポジトリではGGUFモデルをGit LFSで管理します。実モデルが500MB未満、読み込み不可、またはネイティブモジュールが使えない環境では、相談機能は監修済みテンプレートへフォールバックします。

## iOS / TestFlight

`eas.json` の `submit.production.ios` には、実際の Apple ID、App Store Connect App ID、Team ID を設定してください。

```bash
npx eas build --platform ios --profile production
npx eas submit --platform ios --profile production
```