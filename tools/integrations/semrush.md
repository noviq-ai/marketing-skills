# SEMrush

All-in-one SEO and digital marketing platform for keyword research, site auditing, competitor analysis, rank tracking, and content optimization.

## Integration Methods

| Method | Available | Notes |
|--------|-----------|-------|
| API | ✓ | Analytics API v3 + Projects API v4. Business plan + API units required |
| MCP | ✓ | Official SEMrush MCP server available |
| CLI | ✓ | `tools/clis/semrush.js` — zero-dependency Node.js script |
| SDK | - | No official SDK. Use REST API directly |

## Authentication

- **Type**: API key
- **How to get**: SEMrush account > Subscription Info > API units > Generate Key
- **Plan required**: Business subscription + API units purchased separately
- **CLI env var**: `SEMRUSH_API_KEY`
- **API v4**: Uses OAuth with access_token (expires 7 days) and refresh_token (expires 30 days)

## API Base URL

```
https://api.semrush.com/
```

## Key Endpoints

### Domain Analytics (v3)

| Report | API Type | Unit Cost | Description |
|--------|----------|-----------|-------------|
| Domain Organic Search Keywords | `domain_organic` | 10/row (live), 50/row (historical) | Keywords a domain ranks for |
| Domain Organic Search Keywords by Country | `domain_organic` + `database` | Same | Filter by country database |
| Domain Overview | `domain_ranks` | 10/row | Summary metrics for a domain |
| Domain vs Domain | `domain_domains` | 40/row | Compare keyword overlap |
| URL Organic Search Keywords | `url_organic` | 10/row | Keywords a specific URL ranks for |

### Keyword Research (v3)

| Report | API Type | Unit Cost | Description |
|--------|----------|-----------|-------------|
| Keyword Overview | `phrase_this` | 10/row | Volume, CPC, competition for a keyword |
| Related Keywords | `phrase_related` | 10/row | Semantically related keywords |
| Keyword Difficulty | `phrase_kdi` | 10/row | Estimated difficulty to rank |
| Phrase Match Keywords | `phrase_fullsearch` | 10/row | Keywords containing your phrase |

### Database Parameter

For Japan, use `database=jp` in all requests. Available databases include `us`, `uk`, `jp`, `de`, `fr`, etc.

## CLI Usage

```bash
# Keyword overview (Japan database)
node tools/clis/semrush.js keywords overview --phrase "マーケティング ツール" --database jp

# Domain organic keywords
node tools/clis/semrush.js domain organic --domain example.co.jp --database jp --limit 20

# Domain overview
node tools/clis/semrush.js domain overview --domain example.co.jp --database jp

# Related keywords
node tools/clis/semrush.js keywords related --phrase "SEO 対策" --database jp

# Domain vs domain comparison
node tools/clis/semrush.js domain versus --domains example.co.jp,competitor.co.jp --database jp

# Dry run
node tools/clis/semrush.js keywords overview --phrase "SaaS" --database jp --dry-run
```

## Key Metrics

| Metric | Description |
|--------|-------------|
| Authority Score | Domain strength (0–100) |
| Search Volume | Monthly search volume for a keyword |
| Keyword Difficulty (KD%) | Estimated ranking difficulty (0–100%) |
| CPC | Average cost per click in Google Ads |
| Competition | Density of advertisers (0–1.0) |
| Traffic | Estimated monthly organic traffic |
| Traffic Cost | Estimated value of organic traffic in ad dollars |

## MCP Server

SEMrush provides an official MCP server. Configure in your MCP settings:

```json
{
  "semrush": {
    "type": "oauth",
    "url": "https://mcp.semrush.com"
  }
}
```

The MCP server provides natural language access to SEMrush data within Claude Code and other MCP-compatible agents.

## Rate Limits

- API units are consumed per request (cost depends on report type and rows)
- Rate limiting applies per account
- Monitor usage in SEMrush dashboard

## Use Cases

- Keyword research for Japanese market (using `database=jp`)
- Competitor keyword gap analysis
- Site audit for technical SEO issues
- Tracking keyword ranking changes over time
- Estimating organic traffic value
- Finding content opportunities from competitor analysis

## Related Skills

- **seo-health-check** — Full SEO health check framework
- **content-strategy** — Content planning from keyword research
- **ad-campaign-ops** — PPC keyword and competitor data
- **competitor-alternatives** — Competitive comparison pages
