# Marketing Skills for AI Agents

A collection of AI agent skills focused on marketing tasks. Built for technical marketers and founders who want AI coding agents to help with SEO, analytics, paid ads, LINE marketing, and more. Works with Claude Code, OpenAI Codex, Cursor, Windsurf, and any agent that supports the [Agent Skills spec](https://agentskills.io).

Built by [Noviq](https://noviq.jp).

**[日本語版はこちら](README.ja.md)**

**Contributions welcome!** Found a way to improve a skill or have a new one to add? [Open a PR](#contributing).

## What are Skills?

Skills are markdown files that give AI agents specialized knowledge and workflows for specific tasks. When you add these to your project, your agent can recognize when you're working on a marketing task and apply the right frameworks and best practices.

## Available Skills

| Skill | Description |
|-------|-------------|
| `ga4-measurement` | GA4/GTM tracking plan design, event implementation, Japan privacy compliance |
| `ga4-analysis` | GA4 data analysis, reporting frameworks, anomaly diagnosis, seasonality |
| `seo-health-check` | Technical & on-page SEO audit, Japan SEO (3 writing systems, Yahoo Japan) |
| `ad-campaign-ops` | Multi-platform ad campaigns (Google, Meta, LINE, Yahoo), budget allocation |
| `line-engagement` | LINE Official Account strategy, messaging, rich menus, LIFF, Narrowcast |
| `social-posts` | Platform-specific social media content creation (X, Instagram, TikTok, LinkedIn) |
| `ad-copy-lab` | Ad creative and copy generation with Japan legal compliance (Google, Meta, LINE, Yahoo) |

## Installation

### Option 1: Claude Code Plugin

```bash
# Add the marketplace
/plugin marketplace add noviq-ai/marketing-skills

# Install all marketing skills
/plugin install marketing-skills
```

### Option 2: CLI Install

```bash
# Install all skills
npx skills add noviq-ai/marketing-skills

# Install specific skills
npx skills add noviq-ai/marketing-skills --skill ga4-measurement seo-health-check
```

### Option 3: Clone and Copy

```bash
git clone https://github.com/noviq-ai/marketing-skills.git
cp -r marketing-skills/skills/* .agents/skills/
```

### Option 4: Git Submodule

```bash
git submodule add https://github.com/noviq-ai/marketing-skills.git .agents/marketing-skills
```

## Usage

Once installed, just ask your agent to help with marketing tasks:

```
"Set up GA4 tracking for signups"
→ Uses ga4-measurement skill

"Why did our traffic drop last week?"
→ Uses ga4-analysis skill

"Audit our site's SEO"
→ Uses seo-health-check skill

"Set up Google Ads for our Japan launch"
→ Uses ad-campaign-ops skill

"Plan a LINE Official Account strategy"
→ Uses line-engagement skill

"Write an X thread to announce our product launch"
→ Uses social-posts skill

"Create Google RSA headlines for our SaaS"
→ Uses ad-copy-lab skill
```

You can also invoke skills directly:

```
/ga4-measurement
/seo-health-check
/line-engagement
```

## Skill Categories

### Measurement & Analytics
- `ga4-measurement` - GA4/GTM tracking plan design and event implementation
- `ga4-analysis` - GA4 data analysis, reporting, traffic anomaly diagnosis

### SEO
- `seo-health-check` - Technical, on-page, off-page SEO audit framework

### Paid Ads
- `ad-campaign-ops` - Google, Meta, LINE, Yahoo ad campaign management

### LINE
- `line-engagement` - LINE Official Account strategy, messaging, rich menus, LIFF

### Content & Creative
- `social-posts` - Platform-specific social media content (X, Instagram, TikTok, LinkedIn)
- `ad-copy-lab` - Ad creative and copy for Google, Meta, LINE, Yahoo with Japan compliance

## Tool Integrations

CLI tools and API guides for common marketing platforms. See [tools/REGISTRY.md](tools/REGISTRY.md).

| Tool | Category | CLI | Guide |
|------|----------|:---:|-------|
| GA4 | Analytics | [✓](tools/clis/ga4.js) | [ga4.md](tools/integrations/ga4.md) |
| Ahrefs | SEO | [✓](tools/clis/ahrefs.js) | [ahrefs.md](tools/integrations/ahrefs.md) |
| SEMrush | SEO | [✓](tools/clis/semrush.js) | [semrush.md](tools/integrations/semrush.md) |
| Search Console | SEO | [✓](tools/clis/search-console.js) | [search-console.md](tools/integrations/search-console.md) |
| Google Ads | Paid Ads | [✓](tools/clis/google-ads.js) | [google-ads.md](tools/integrations/google-ads.md) |
| LINE | Messaging / Ads | [✓](tools/clis/line.js) | [line.md](tools/integrations/line.md) |

## Contributing

Found a way to improve a skill? Have a new skill to suggest? PRs and issues welcome!

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding or improving skills.

## License

[MIT](LICENSE) - Use these however you want.
