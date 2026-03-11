# Google Search Console

Search performance data, URL indexing status, and sitemap management. Essential for SEO analysis — shows what queries drive impressions and clicks, which pages are indexed, and where technical issues exist.

## Integration Methods

| Method | Available | Notes |
|--------|-----------|-------|
| API | ✓ | Search Analytics API (Webmasters v3) + URL Inspection API (v1) |
| MCP | - | No official MCP server |
| CLI | ✓ | `tools/clis/search-console.js` — zero-dependency Node.js script |
| SDK | ✓ | Google APIs Node.js client library |

## Authentication

- **Type**: OAuth 2.0 (access token)
- **Scopes**: `https://www.googleapis.com/auth/webmasters.readonly` (read-only) or `https://www.googleapis.com/auth/webmasters` (read-write)
- **CLI env vars**: `GSC_ACCESS_TOKEN`, `GSC_SITE_URL`
- **Site URL formats**:
  - URL-prefix property: `https://www.example.com/`
  - Domain property: `sc-domain:example.com`

## API Base URLs

```
Search Analytics / Sitemaps / Sites: https://www.googleapis.com/webmasters/v3
URL Inspection:                      https://searchconsole.googleapis.com/v1
```

## Key Endpoints

### Search Analytics

| Method | Path | Description |
|--------|------|-------------|
| POST | `/sites/{siteUrl}/searchAnalytics/query` | Query search performance data |

**Request Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `startDate` | Yes | YYYY-MM-DD (Pacific Time) |
| `endDate` | Yes | YYYY-MM-DD (Pacific Time) |
| `dimensions` | No | `query`, `page`, `country`, `device`, `date`, `searchAppearance` |
| `type` | No | `web` (default), `image`, `video`, `news`, `discover`, `googleNews` |
| `rowLimit` | No | 1–25,000 (default: 1,000) |
| `startRow` | No | Zero-based offset for pagination |
| `dataState` | No | `final` (default) or `all` (includes fresh data) |
| `dimensionFilterGroups` | No | Filter by query, page, country, device |

**Filter Operators:** `contains`, `equals`, `notContains`, `notEquals`, `includingRegex`, `excludingRegex`

**Response Metrics:** `clicks`, `impressions`, `ctr`, `position`

### URL Inspection

| Method | Path | Description |
|--------|------|-------------|
| POST | `/urlInspection/index:inspect` | Check indexing status of a URL |

Returns: `indexStatusResult` (verdict, coverageState, robotsTxtState, indexingState, lastCrawlTime, pageFetchState, googleCanonical, userCanonical)

### Sitemaps

| Method | Path | Description |
|--------|------|-------------|
| GET | `/sites/{siteUrl}/sitemaps` | List all sitemaps |
| PUT | `/sites/{siteUrl}/sitemaps/{feedpath}` | Submit a sitemap |
| DELETE | `/sites/{siteUrl}/sitemaps/{feedpath}` | Remove a sitemap |

### Sites

| Method | Path | Description |
|--------|------|-------------|
| GET | `/sites` | List all verified sites |

## CLI Usage

```bash
# Top queries (last 30 days, default end = 3 days ago for data freshness)
node tools/clis/search-console.js performance queries --site sc-domain:example.com --limit 25

# Top pages
node tools/clis/search-console.js performance pages --site sc-domain:example.com --limit 20

# Daily trend
node tools/clis/search-console.js performance daily --site sc-domain:example.com --start 2026-01-01 --end 2026-03-08

# By country
node tools/clis/search-console.js performance countries --site sc-domain:example.com

# By device
node tools/clis/search-console.js performance devices --site sc-domain:example.com

# Query + page combinations (filtered)
node tools/clis/search-console.js performance query-pages --site sc-domain:example.com --query "マーケティング" --limit 50

# Regex filter
node tools/clis/search-console.js performance query-pages --site sc-domain:example.com --query "SEO|検索" --query-op includingRegex

# URL inspection
node tools/clis/search-console.js inspect --url https://example.com/page --site sc-domain:example.com

# List sitemaps
node tools/clis/search-console.js sitemaps list --site sc-domain:example.com

# Submit sitemap
node tools/clis/search-console.js sitemaps submit --site sc-domain:example.com --url https://example.com/sitemap.xml

# List all sites
node tools/clis/search-console.js sites list

# Dry run
node tools/clis/search-console.js performance queries --site sc-domain:example.com --dry-run
```

## Key Metrics

| Metric | Description |
|--------|-------------|
| Clicks | Times a user clicked through to your site |
| Impressions | Times your page appeared in search results |
| CTR | Click-through rate (clicks / impressions) |
| Position | Average ranking position in search results |

## Important Notes

- **Data delay**: Search Console data is 2–3 days behind. Default `--end` is set to 3 days ago
- **Data retention**: ~16 months of historical data available
- **Row limit**: Max 25,000 rows per request. Use `startRow` for pagination
- **Aggregation caveat**: When using `query` + `page` dimensions together, some data may be omitted to protect user privacy. For accurate totals, query without these dimensions
- **Site URL encoding**: URL-prefix properties must be URL-encoded in API paths. Domain properties use `sc-domain:` prefix
- **Pacific Time**: All dates are in PT timezone

## Rate Limits

| Resource | Limit |
|----------|-------|
| Search Analytics (per site) | 1,200 queries/min |
| URL Inspection (per site) | 2,000 queries/day, 600 queries/min |
| Other resources (per user) | 20 queries/sec |

## Use Cases

- Track keyword ranking changes over time
- Identify pages losing or gaining organic clicks
- Diagnose indexing issues for specific URLs
- Find cannibalization (multiple pages ranking for same query)
- Monitor crawl and index coverage
- Validate sitemap submissions
- Compare search performance across devices and countries

## Related Skills

- **seo-health-check** — Full SEO diagnostic framework
- **ga4-analysis** — Cross-reference organic traffic with GA4 engagement data
- **ga4-measurement** — Set up tracking for organic landing pages
