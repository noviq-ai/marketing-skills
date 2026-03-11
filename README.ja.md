# Marketing Skills for AI Agents

AIエージェント向けのマーケティングスキル集です。SEO、アナリティクス、広告運用、LINEマーケティングなどをAIコーディングエージェントに任せたいマーケターや創業者のために作られました。Claude Code、OpenAI Codex、Cursor、Windsurf、および[Agent Skills仕様](https://agentskills.io)をサポートする任意のエージェントで動作します。

Built by [Noviq](https://noviq.jp).

**[English version](README.md)**

**コントリビューション歓迎！** スキルの改善案や新しいスキルの追加は [PRを送って](#コントリビューション) ください。

## スキルとは？

スキルはAIエージェントに専門知識とワークフローを与えるMarkdownファイルです。プロジェクトに追加すると、エージェントがマーケティングタスクを認識し、適切なフレームワークとベストプラクティスを適用できるようになります。

## 利用可能なスキル

| スキル | 説明 |
|--------|------|
| `ga4-measurement` | GA4/GTMトラッキング設計、イベント実装、日本プライバシー法対応 |
| `ga4-analysis` | GA4データ分析、レポートフレームワーク、異常診断、季節性 |
| `seo-health-check` | テクニカル・オンページSEO監査、日本SEO（3書記体系、Yahoo Japan） |
| `ad-campaign-ops` | マルチプラットフォーム広告運用（Google、Meta、LINE、Yahoo）、予算配分 |
| `line-engagement` | LINE公式アカウント運用、配信戦略、リッチメニュー、LIFF、ナローキャスト |
| `social-posts` | プラットフォーム別SNSコンテンツ作成（X、Instagram、TikTok、LinkedIn） |
| `ad-copy-lab` | 広告クリエイティブ・コピー生成、日本法規制対応（Google、Meta、LINE、Yahoo） |

## インストール

### 方法1: Claude Code プラグイン

```bash
# マーケットプレイスを追加
/plugin marketplace add noviq-ai/marketing-skills

# 全マーケティングスキルをインストール
/plugin install marketing-skills
```

### 方法2: CLI インストール

```bash
# 全スキルをインストール
npx skills add noviq-ai/marketing-skills

# 特定のスキルをインストール
npx skills add noviq-ai/marketing-skills --skill ga4-measurement seo-health-check
```

### 方法3: クローンしてコピー

```bash
git clone https://github.com/noviq-ai/marketing-skills.git
cp -r marketing-skills/skills/* .agents/skills/
```

### 方法4: Git サブモジュール

```bash
git submodule add https://github.com/noviq-ai/marketing-skills.git .agents/marketing-skills
```

## 使い方

インストール後、エージェントにマーケティングタスクを依頼するだけです：

```
「GA4でサインアップのトラッキングを設定して」
→ ga4-measurement スキルを使用

「先週トラフィックが落ちた原因を調べて」
→ ga4-analysis スキルを使用

「サイトのSEOを診断して」
→ seo-health-check スキルを使用

「日本ローンチ向けにGoogle広告を設定して」
→ ad-campaign-ops スキルを使用

「LINE公式アカウントの戦略を立てて」
→ line-engagement スキルを使用

「ローンチ告知のXスレッドを書いて」
→ social-posts スキルを使用

「SaaS向けのGoogle RSA見出しを作って」
→ ad-copy-lab スキルを使用
```

スキルを直接呼び出すこともできます：

```
/ga4-measurement
/seo-health-check
/line-engagement
```

## スキルカテゴリ

### 計測 & アナリティクス
- `ga4-measurement` - GA4/GTMトラッキング設計とイベント実装
- `ga4-analysis` - GA4データ分析、レポート、トラフィック異常診断

### SEO
- `seo-health-check` - テクニカル・オンページ・オフページSEO監査

### 広告
- `ad-campaign-ops` - Google、Meta、LINE、Yahoo広告キャンペーン管理

### LINE
- `line-engagement` - LINE公式アカウント運用、配信戦略、リッチメニュー、LIFF

### コンテンツ & クリエイティブ
- `social-posts` - プラットフォーム別SNSコンテンツ（X、Instagram、TikTok、LinkedIn）
- `ad-copy-lab` - Google、Meta、LINE、Yahoo広告クリエイティブ・コピー、日本法規制対応

## ツール連携

マーケティングプラットフォーム向けのCLIツールとAPIガイド。詳細は [tools/REGISTRY.md](tools/REGISTRY.md) を参照。

| ツール | カテゴリ | CLI | ガイド |
|--------|----------|:---:|--------|
| GA4 | アナリティクス | [✓](tools/clis/ga4.js) | [ga4.md](tools/integrations/ga4.md) |
| Ahrefs | SEO | [✓](tools/clis/ahrefs.js) | [ahrefs.md](tools/integrations/ahrefs.md) |
| SEMrush | SEO | [✓](tools/clis/semrush.js) | [semrush.md](tools/integrations/semrush.md) |
| Search Console | SEO | [✓](tools/clis/search-console.js) | [search-console.md](tools/integrations/search-console.md) |
| Google Ads | 広告 | [✓](tools/clis/google-ads.js) | [google-ads.md](tools/integrations/google-ads.md) |
| LINE | メッセージング / 広告 | [✓](tools/clis/line.js) | [line.md](tools/integrations/line.md) |

## コントリビューション

スキルの改善案や新しいスキルの提案はPRとIssueで受け付けています。

詳しくは [CONTRIBUTING.md](CONTRIBUTING.md) をご覧ください。

## ライセンス

[MIT](LICENSE)
