# ポケット先輩（歯科衛生士）

新人・若手歯科衛生士が、現場で困った時にすぐ確認できる「スマホの中の先輩歯科衛生士」アプリです。

## コンセプト

本アプリは**教育・学習支援目的**の参考情報アプリです。診断・治療を目的としたものではありません。

## 技術スタック

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Expo | SDK 56 | フレームワーク |
| React Native | 0.85 | UIフレームワーク |
| TypeScript | 6.0 | 型安全性 |
| Expo Router | 56 | ナビゲーション |
| React Native Paper | 5.x | UIコンポーネント |
| AsyncStorage | 3.x | ローカルデータ保存 |
| AdMob | 16.x | 広告表示 |
| Firebase | - | 将来拡張用 |

## 機能一覧

| 機能 | 説明 |
|------|------|
| 先輩相談 | AI風UIで悩みに回答（テンプレートマッチング） |
| 患者説明トーク集 | 患者さんへの説明会話例 |
| 症例別マニュアル | 各処置の手順とポイント |
| チェックリスト | 処置前の準備確認（状態保存対応） |
| ミニ学習クイズ | 4択クイズで知識チェック |
| お気に入り | コンテンツの保存機能 |

## ディレクトリ構成

```
pocket-senpai/
├── app/                    # Expo Router ページ
│   ├── _layout.tsx         # ルートレイアウト
│   ├── index.tsx           # ホーム画面
│   ├── consultation/       # 先輩相談
│   ├── talk/               # 患者説明トーク集
│   ├── manual/             # 症例別マニュアル
│   ├── checklist/          # チェックリスト
│   ├── quiz/               # ミニ学習クイズ
│   └── favorites/          # お気に入り
├── src/
│   ├── components/         # 共通コンポーネント
│   │   └── AdBanner.tsx    # 広告コンポーネント
│   ├── data/               # テンプレートデータ
│   │   ├── consultations.ts
│   │   ├── talks.ts
│   │   ├── manuals.ts
│   │   ├── checklists.ts
│   │   └── quizzes.ts
│   ├── hooks/              # カスタムフック
│   │   └── useFavorites.ts
│   ├── services/           # サービス層
│   │   ├── aiService.ts    # AI応答サービス
│   │   ├── adService.ts    # 広告サービス
│   │   └── firebase.ts     # Firebase設定
│   ├── types/              # 型定義
│   │   └── index.ts
│   └── utils/              # ユーティリティ
│       └── theme.ts        # テーマ定数
├── assets/                 # 画像・フォント
├── app.json                # Expo設定
├── eas.json                # EAS Build設定
├── babel.config.js         # Babel設定
├── tsconfig.json           # TypeScript設定
└── package.json
```

## セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)
- Apple Developer Account（iOSビルド用）

### 起動方法

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npx expo start

# iOSシミュレーターで起動
npx expo start --ios

# Expo Goで実機確認
# QRコードをスキャンして確認
```

### Firebase設定方法

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成
2. iOSアプリを追加（バンドルID: `com.pocketsenpai.dh`）
3. `GoogleService-Info.plist` をダウンロード
4. `app.json` の `extra` セクションに実際の値を設定:

```json
{
  "extra": {
    "firebaseApiKey": "実際のAPIキー",
    "firebaseAuthDomain": "your-project.firebaseapp.com",
    "firebaseProjectId": "your-project-id",
    "firebaseStorageBucket": "your-project.appspot.com",
    "firebaseMessagingSenderId": "123456789",
    "firebaseAppId": "1:123456789:ios:abcdef"
  }
}
```

5. `src/services/firebase.ts` のコメントアウトを解除して有効化

### AdMob設定方法

1. [Google AdMob](https://admob.google.com/) でアカウント作成
2. アプリを登録してApp IDを取得
3. 各広告ユニットを作成（バナー、リワード、アプリ起動）
4. `app.json` の以下を実際のIDに置き換え:

```json
{
  "ios": {
    "config": {
      "googleMobileAdsAppId": "ca-app-pub-XXXXX~YYYYY"
    }
  },
  "plugins": [
    ["react-native-google-mobile-ads", {
      "iosAppId": "ca-app-pub-XXXXX~YYYYY"
    }]
  ]
}
```

5. `src/components/AdBanner.tsx` と `src/services/adService.ts` のコメントアウトを解除

### EAS Build方法

```bash
# EAS CLIのインストール
npm install -g eas-cli

# EASにログイン
eas login

# プロジェクトの初期化
eas init

# 開発ビルド（シミュレーター用）
eas build --platform ios --profile development

# プレビュービルド（実機テスト用）
eas build --platform ios --profile preview

# 本番ビルド（App Store提出用）
eas build --platform ios --profile production

# ビルド＋自動送信
eas build --platform ios --profile production --auto-submit
```

### App Store提出方法

1. [App Store Connect](https://appstoreconnect.apple.com/) でアプリを作成
2. `eas.json` の `submit` セクションに情報を設定:

```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@email.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCDEFGHIJ"
      }
    }
  }
}
```

3. 本番ビルドを実行:
```bash
eas build --platform ios --profile production
```

4. App Store Connectに送信:
```bash
eas submit --platform ios
```

5. App Store Connectで審査に提出

#### App Store審査のポイント

- 本アプリは「教育・学習支援アプリ」として申請
- カテゴリ: Education > Reference
- 医療アプリではないことを明記
- 免責事項を表示していることを説明
- プライバシーポリシーを用意

## 広告設計

| 広告タイプ | 配置場所 | 頻度 |
|-----------|---------|------|
| バナー広告 | ホーム画面下部 | 常時表示 |
| インライン広告 | マニュアル・記事内 | コンテンツ中間 |
| リワード広告 | クイズ終了後 | 任意視聴 |
| リワード広告 | AI相談追加利用 | 将来実装 |
| アプリ起動広告 | 起動時 | 1日1回まで |

## 将来の拡張計画

| 機能 | 説明 | 必要技術 |
|------|------|---------|
| AI先輩相談 | OpenAI APIによる自然言語応答 | OpenAI API |
| ログイン機能 | ユーザー認証 | Firebase Auth |
| 月額課金 | プレミアム機能 | RevenueCat |
| Push通知 | 学習リマインダー | Firebase FCM |
| 学習履歴 | 進捗管理 | Firestore |
| 医院別マニュアル | カスタムコンテンツ配信 | Firestore + Cloud Functions |

### OpenAI API追加手順

1. `src/services/aiService.ts` の `getAIResponse` 関数を修正
2. OpenAI APIキーを環境変数に設定
3. プロンプトテンプレートを作成
4. レスポンスのパース処理を実装

## 医療リスク対策

本アプリでは以下のテーマは実装していません:

- 疾患診断
- 薬剤判断
- 麻酔
- レントゲン診断
- 医療事故判断
- 外科処置判断

アプリ内に以下の免責事項を表示しています:

> 本アプリは教育・学習支援を目的とした参考情報を提供するものであり、診断・治療を行うものではありません。実際の診療判断は歯科医師・所属医院へ確認してください。

## コマンド一覧

```bash
# 開発
npx expo start              # 開発サーバー起動
npx expo start --ios        # iOSシミュレーター
npx expo start --android    # Androidエミュレーター

# ビルド
eas build --platform ios --profile development   # 開発ビルド
eas build --platform ios --profile preview       # プレビュー
eas build --platform ios --profile production    # 本番

# 提出
eas submit --platform ios   # App Store提出

# その他
npx tsc --noEmit            # 型チェック
npx expo prebuild           # ネイティブプロジェクト生成
npx expo export             # バンドル出力
```

## ライセンス

Private - All rights reserved.
