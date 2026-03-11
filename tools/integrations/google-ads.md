# Google Ads

Paid search, display, video, and Performance Max campaign management platform.

## Integration Methods

| Method | Available | Notes |
|--------|-----------|-------|
| API | ✓ | REST API (current: v19+). Requires developer token |
| MCP | ✓ | Available via Google Ads MCP server |
| CLI | ✓ | `tools/clis/google-ads.js` — zero-dependency Node.js script |
| SDK | ✓ | Official client libraries for Python, Java, Ruby, PHP, .NET, Perl |

## Authentication

- **Type**: OAuth 2.0 + Developer Token
- **Requirements**: Google Ads Manager account, developer token (apply via Ads account), OAuth client credentials
- **CLI env vars**: `GOOGLE_ADS_TOKEN` (OAuth access token), `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_CUSTOMER_ID`
- **API base**: `https://googleads.googleapis.com`

## Common Operations

### Query Campaigns (GAQL)

Google Ads API uses Google Ads Query Language (GAQL) for all data retrieval:

```bash
node tools/clis/google-ads.js query --gaql "SELECT campaign.name, campaign.status, metrics.impressions, metrics.clicks, metrics.cost_micros FROM campaign WHERE campaign.status = 'ENABLED' ORDER BY metrics.cost_micros DESC LIMIT 20"
```

API equivalent:
```
POST /v19/customers/{customer_id}/googleAds:search
{
  "query": "SELECT campaign.name, metrics.impressions, metrics.clicks, metrics.cost_micros FROM campaign WHERE campaign.status = 'ENABLED'"
}
```

### Get Keyword Performance

```bash
node tools/clis/google-ads.js query --gaql "SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros FROM keyword_view WHERE segments.date DURING LAST_30_DAYS ORDER BY metrics.conversions DESC LIMIT 50"
```

### Get Search Terms Report

```bash
node tools/clis/google-ads.js query --gaql "SELECT search_term_view.search_term, metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros FROM search_term_view WHERE segments.date DURING LAST_30_DAYS ORDER BY metrics.impressions DESC LIMIT 100"
```

### Get Ad Performance

```bash
node tools/clis/google-ads.js query --gaql "SELECT ad_group_ad.ad.responsive_search_ad.headlines, metrics.impressions, metrics.clicks, metrics.conversions FROM ad_group_ad WHERE segments.date DURING LAST_30_DAYS AND ad_group_ad.status = 'ENABLED'"
```

### List Campaigns

```bash
node tools/clis/google-ads.js campaigns list
```

### Dry Run

```bash
node tools/clis/google-ads.js query --gaql "SELECT campaign.name FROM campaign" --dry-run
```

## Key Resources and Fields

| Resource | Key Fields |
|----------|------------|
| campaign | name, status, bidding_strategy_type, budget |
| ad_group | name, status, cpc_bid_micros |
| ad_group_criterion | keyword.text, keyword.match_type, quality_info |
| ad_group_ad | ad.responsive_search_ad, status |
| search_term_view | search_term, status |
| keyword_view | (join with ad_group_criterion for keyword data) |

## Key Metrics

| Metric | Field | Description |
|--------|-------|-------------|
| Impressions | metrics.impressions | Times ad was shown |
| Clicks | metrics.clicks | Times ad was clicked |
| Cost | metrics.cost_micros | Spend in micros (÷1,000,000 for currency) |
| Conversions | metrics.conversions | Conversion actions |
| Conv. Value | metrics.conversions_value | Monetary value of conversions |
| CTR | metrics.ctr | Click-through rate |
| CPC | metrics.average_cpc | Average cost per click (micros) |
| Conv. Rate | metrics.conversions_from_interactions_rate | Conversion rate |

**Note on micros**: Cost values are in micros. For JPY, divide by 1,000,000. Example: `cost_micros: 150000000` = ¥150.

## Rate Limits

- 15,000 mutate operations per day per account
- 1,000 Google Ads Query Language requests per day per account
- Rate limits are per customer ID

## Use Cases

- Managing search campaigns for Japanese keywords
- Analyzing keyword performance and search terms
- Tracking ad spend and ROAS across campaigns
- Identifying negative keyword opportunities
- Comparing Performance Max vs standard campaigns
- Automating bid adjustments and budget allocation

## Related Skills

- **ad-campaign-ops** — Full paid advertising strategy
- **ad-creative** — Ad copy and creative generation
- **ga4-measurement** — Conversion tracking setup
- **page-cro** — Landing page optimization for ad traffic
