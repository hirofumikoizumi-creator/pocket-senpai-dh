# App Review 再審査メモ

## App Reviewへの返信文

ご確認ありがとうございます。ご指摘いただいた各項目について、以下の対応を行いました。

新しいiOSビルド番号は 22 です。

1. Guideline 3.1.2(c)
   - アプリ内のプレミアム購入画面に、サブスクリプション名、期間、価格、自動更新に関する説明を表示しました。
   - 同画面から利用規約（Apple標準EULA）とプライバシーポリシーを開けるリンクを追加しました。

2. Guideline 5.1.2(i)
   - iOS初回起動時にApp Tracking Transparencyの許可リクエストを表示するよう対応しました。
   - 許可リクエストは広告表示前に実行されます。

3. Guideline 1.4.1
   - 患者説明トーク、症例別マニュアル、ミニ学習クイズ、先輩相談AIチャット回答に、出典・参考資料へのリンクを表示しました。
   - アプリ内でも、診断・治療・医療判断ではなく教育・学習支援である旨を引き続き明示しています。

4. Guideline 1.5
   - Support URLで指定している以下のページが開けるよう、GitHub Pages直下にサポートページを追加しました。
   - https://hirofumikoizumi-creator.github.io/pocket-senpai-dh/support.html

お手数ですが、再度ご確認をお願いいたします。

## Review Notesに入れる内容

The requested information is now available in the app:

- Subscription information is shown on the Premium screen: title, duration, price, auto-renewal note, Terms of Use (EULA), and Privacy Policy.
- The App Tracking Transparency permission request appears on first launch before ads are shown.
- Medical citations are shown in content detail screens and AI response screens under "出典・参考資料".
- The Support URL has been fixed: https://hirofumikoizumi-creator.github.io/pocket-senpai-dh/support.html

## App Store Connect メタデータ修正

### Privacy Policy URL

https://hirofumikoizumi-creator.github.io/pocket-senpai-dh/privacy.html

### Support URL

https://hirofumikoizumi-creator.github.io/pocket-senpai-dh/support.html

### App Description 末尾に追記

利用規約: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
プライバシーポリシー: https://hirofumikoizumi-creator.github.io/pocket-senpai-dh/privacy.html

### App Privacy

アプリのプライバシー情報で「トラッキングあり」として提出する場合は、ATT許可リクエストが実装済みです。
もし実際にはトラッキング目的のデータ利用をしない運用にする場合は、App Store ConnectのApp Privacy情報を「トラッキングなし」に修正してください。
