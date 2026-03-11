# Ahrefs

SEO toolset for backlink analysis, keyword research, content exploration, rank tracking, and site auditing.

## Integration Methods

| Method | Available | Notes |
|--------|-----------|-------|
| API | ✓ | API v3 (v2 discontinued Nov 2025). Enterprise plan required |
| MCP | - | No official MCP server |
| CLI | ✓ | `tools/clis/ahrefs.js` — zero-dependency Node.js script |
| SDK | - | No official SDK. Use REST API directly |

## Authentication

- **Type**: Bearer token
- **How to get**: Ahrefs account > Settings > API Access > Generate New Token
- **Plan required**: Enterprise (API v3 access)
- **CLI env var**: `AHREFS_API_KEY`

## API v3 Base URL

```
https://api.ahrefs.com/v3
```

All requests consume API units. Minimum 50 units per request. Cost scales with rows returned and fields requested.

## Key Endpoints

### Site Explorer

| Endpoint | Description | Use Case |
|----------|-------------|----------|
| `/site-explorer/overview` | Domain metrics (DR, traffic, keywords) | Quick domain health check |
| `/site-explorer/backlinks` | List all backlinks to a target | Backlink audit |
| `/site-explorer/broken-backlinks` | Broken inbound links | Link reclamation |
| `/site-explorer/referring-domains` | Unique linking domains | Authority assessment |
| `/site-explorer/anchors` | Anchor text distribution | Link profile analysis |
| `/site-explorer/organic-keywords` | Keywords the domain ranks for | Keyword portfolio review |
| `/site-explorer/top-pages` | Pages with most organic traffic | Content performance |

### Keywords Explorer

| Endpoint | Description | Use Case |
|----------|-------------|----------|
| `/keywords-explorer/overview` | Single keyword metrics (volume, KD, CPC) | Keyword evaluation |
| `/keywords-explorer/metrics-by-country` | Volume by country | Japan-specific volume check |
| `/keywords-explorer/volume-history` | Historical search volume | Trend analysis |

### SERP Overview

| Endpoint | Description | Use Case |
|----------|-------------|----------|
| `/serp-overview/serp` | Top-ranking pages for a keyword | Competitor SERP analysis |

## CLI Usage

```bash
# Domain overview
node tools/clis/ahrefs.js site-explorer overview --target example.co.jp

# List backlinks
node tools/clis/ahrefs.js site-explorer backlinks --target example.co.jp --limit 50

# Referring domains
node tools/clis/ahrefs.js site-explorer referring-domains --target example.co.jp

# Keyword overview (Japan database)
node tools/clis/ahrefs.js keywords overview --keyword "マーケティング" --country jp

# Organic keywords for a domain
node tools/clis/ahrefs.js site-explorer organic-keywords --target example.co.jp --country jp

# Dry run (preview request)
node tools/clis/ahrefs.js site-explorer overview --target example.co.jp --dry-run
```

## Key Metrics

| Metric | Description | Range |
|--------|-------------|-------|
| Domain Rating (DR) | Backlink profile strength | 0–100 |
| URL Rating (UR) | Page-level link strength | 0–100 |
| Keyword Difficulty (KD) | Estimated difficulty to rank | 0–100 |
| Traffic | Estimated monthly organic traffic | Number |
| Referring Domains | Unique domains linking to target | Number |

## Rate Limits

- Rate limit depends on your Enterprise plan tier
- API units are consumed per request (minimum 50)
- Monitor usage in Ahrefs dashboard > API Usage

## Use Cases

- Auditing backlink profiles for quality and toxic links
- Finding content gaps vs competitors
- Tracking keyword rankings over time
- Discovering link-building opportunities
- Analyzing competitor strategies
- Researching Japanese keyword variations (set country to `jp`)

## Related Skills

- **seo-health-check** — Full SEO health check framework
- **content-strategy** — Content planning based on keyword data
- **competitor-alternatives** — Competitive analysis pages
