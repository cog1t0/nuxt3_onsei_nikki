# 🎯 ターゲットユーザー
- 子育て中の親
- 子どもの日常を「声」でサッと記録したい人
- 絵本風 or 手書き風の温かみのある絵が好まれる

# ✨ 絵日記の仕様
- 録音→テキスト変換→画像生成→絵日記として保存 の流れ
- テキスト：あとから編集可能
- 画像：絵本風 or 手描き風（OpenAI API使用）
- 1日1つの絵日記ができる
- 月ごとに一覧で振り返れるUI

# ⚙️ 技術選定・実装方針（初期案）
- 機能	技術/サービス
- フロント	Nuxt3（Composition API）
- 音声入力	Web Speech API or MediaRecorder
- 音声→テキスト	Whisper API（OpenAI）
- テキスト→画像プロンプト生成	自作プロンプト変換関数
- 画像生成	DALL·E 3 (OpenAI Image API)
- ログイン	Supabase Auth
- データ保存	Supabase 
- ストレージ	Supabase Storage
- 月ごとの一覧	サーバーサイドで日付を整理して出力

# 📝 絵日記の構成（MVP）
要素	内容
📅 日付	自動で記録（作成日）
📝 テキスト	音声→テキスト変換、あとから編集OK
🖼 画像	テキスト内容から自動生成（DALL·E）
😊 気分	ユーザーが選択（例：😊😢😡😴など）

# 🤖 AIプロンプト自動生成の方向性（MVP）
- テキストから登場人物や行動、場所を抽出（簡易でOK）
- 例：「○○ちゃんと動物園に行った」→「女の子と一緒に動物園を訪れているシーンを手描き風で」

Prompt例（日本語→英語変換してDALL·Eへ）

A watercolor illustration of a little girl and her parent visiting the zoo, smiling and watching animals.

# 🎯 MVPスコープ（まずここまで作る）
[x] ログイン機能（magic link）
[ ] 音声入力 → テキスト変換（ブラウザ録音＋Whisper API）
[ ] テキスト編集可能
[ ] AI画像生成（OpenAI Image API）
[ ] 日記保存（テキスト＋画像URL＋日付＋気分）
[ ] 月ごとの一覧表示
[ ] 親しみやすく絵本風のUI（簡易版）

# ✅ タスク分解（MVP）
## 🔐 Auth（認証）
[x] Supabase Authを導入（メール認証）
[] ログイン/サインアップページ作成

## 🎙 音声入力 + テキスト変換
[ ] ブラウザ録音機能（MediaRecorder）
[ ] 音声ファイルをWhisper APIに送信
[ ] テキスト変換結果を表示

## ✏️ テキスト編集
[ ] テキストエリアで編集可能に
[ ] 編集内容をstateに保存

## 🤖 AI画像生成
[ ] テキスト→プロンプト変換関数を作成（英語化＋雰囲気指定）
[ ] OpenAI Image API で画像生成
[ ] 画像URLを保存用stateに追加

## 😊 気分タグ
[ ] 気分アイコンを選択できるUI（例：😊😢😡😴）
[ ] 選んだ気分をstateに保存

## 🗂 絵日記保存・取得（DB）
[x] Supabaseに日記テーブル作成（text, image_url, date, mood）
[ ] 新規日記の保存処理
[ ] 月ごとの一覧取得処理

## 🖼 一覧表示（UI）
[ ] 一覧ページ作成（カード形式）
[ ] 月ごとにグループ分け（カレンダー風でもOK）

## 🎨 UI全体
[ ] 絵本風デザイン：柔らかいフォント／色味（UIライブラリ検討：Tailwind + unplugin-icons）
[ ] モバイルファースト設計（スマホで日記つけやすく）