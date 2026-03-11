# Marketing Tools Registry

Quick reference for AI agents to discover tool capabilities and integration methods.

## How to Use This Registry

1. **Find tools by category** - Browse sections below for tools in each domain
2. **Check integration methods** - See what APIs, MCPs, CLIs, or SDKs are available
3. **Read integration guides** - Detailed setup and common operations in `integrations/`

---

## Tool Index

| Tool | Category | API | MCP | CLI | SDK | Guide |
|------|----------|:---:|:---:|:---:|:---:|-------|
| ga4 | Analytics | ✓ | ✓ | [✓](clis/ga4.js) | ✓ | [ga4.md](integrations/ga4.md) |
| ahrefs | SEO | ✓ | - | [✓](clis/ahrefs.js) | - | [ahrefs.md](integrations/ahrefs.md) |
| semrush | SEO | ✓ | ✓ | [✓](clis/semrush.js) | - | [semrush.md](integrations/semrush.md) |
| google-ads | Paid Ads | ✓ | - | [✓](clis/google-ads.js) | ✓ | [google-ads.md](integrations/google-ads.md) |
| search-console | SEO | ✓ | - | [✓](clis/search-console.js) | ✓ | [search-console.md](integrations/search-console.md) |
| line | Messaging / Ads | ✓ | - | [✓](clis/line.js) | ✓ | [line.md](integrations/line.md) |

---

## CLI Tools

Zero-dependency, single-file Node.js CLIs for tools that don't ship their own. See [`clis/README.md`](clis/README.md) for install instructions and usage.

All CLIs follow a consistent pattern:
- **No dependencies** — Node 18+ only, uses native `fetch`
- **JSON output** — pipe to `jq`, save to file, or use in scripts
- **Env var auth** — set `{TOOL}_API_KEY` and go
- **Consistent commands** — `{tool} <resource> <action> [options]`
