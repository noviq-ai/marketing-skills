# Google Analytics 4 (GA4)

Web analytics platform for tracking user behavior, conversions, and marketing performance across websites and apps.

## Integration Methods

| Method | Available | Notes |
|--------|-----------|-------|
| API | ✓ | Data API for reports, Admin API for property configuration |
| MCP | ✓ | Available via Google Analytics MCP server |
| CLI | ✓ | `tools/clis/ga4.js` — zero-dependency Node.js script |
| SDK | ✓ | gtag.js for web, Firebase SDK for mobile |

## Authentication

- **Type**: OAuth 2.0 or Service Account
- **Scopes**: `analytics.readonly` (read), `analytics.edit` (write)
- **Setup**: Create credentials in Google Cloud Console > APIs & Services > Credentials
- **CLI env var**: `GA4_ACCESS_TOKEN`

## Common Operations

### Run a Report

```bash
node tools/clis/ga4.js reports run \
  --property 123456789 \
  --dimensions sessionSource,sessionMedium \
  --metrics sessions,conversions \
  --start-date 30daysAgo \
  --end-date today
```

API equivalent:
```
POST /v1beta/properties/{id}:runReport
{
  "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
  "dimensions": [{"name": "sessionSource"}, {"name": "sessionMedium"}],
  "metrics": [{"name": "sessions"}, {"name": "conversions"}]
}
```

### Get Real-Time Data

```bash
node tools/clis/ga4.js realtime run \
  --property 123456789 \
  --dimensions country \
  --metrics activeUsers
```

### List Conversion Events

```bash
node tools/clis/ga4.js conversions list --property 123456789
```

### Create a Conversion Event

```bash
node tools/clis/ga4.js conversions create \
  --property 123456789 \
  --event-name purchase_completed
```

### Send Event via Measurement Protocol

```bash
node tools/clis/ga4.js events send \
  --measurement-id G-XXXXXXXXXX \
  --api-secret your_secret \
  --client-id client_123 \
  --event-name purchase \
  --params '{"value": 4980, "currency": "JPY"}'
```

### Dry Run (Preview Without Sending)

Append `--dry-run` to any command to see the request that would be sent, with credentials masked:

```bash
node tools/clis/ga4.js reports run --property 123456789 --metrics sessions --dry-run
```

## Key Dimensions

| Dimension | Description |
|-----------|-------------|
| sessionSource | Traffic source (google, line, direct) |
| sessionMedium | Traffic medium (cpc, email, organic) |
| sessionCampaignName | Campaign name from UTM |
| landingPage | First page of session |
| deviceCategory | desktop, mobile, tablet |
| country | User's country |
| city | User's city |

## Key Metrics

| Metric | Description |
|--------|-------------|
| sessions | Total sessions |
| activeUsers | Users with engaged sessions |
| newUsers | First-time users |
| conversions | Key event count |
| engagementRate | % of engaged sessions |
| averageSessionDuration | Mean session length |
| screenPageViews | Total page views |

## Rate Limits

| API | Limit |
|-----|-------|
| Data API | 10 requests/second per property |
| Admin API | Varies by endpoint |
| Measurement Protocol | 1M hits/day (free tier) |

## Use Cases

- Tracking website traffic sources and user behavior
- Measuring marketing campaign performance and ROI
- Setting up conversion funnels and goal tracking
- Analyzing user journeys from landing to purchase
- Cross-channel attribution (with ad cost import from Meta, TikTok, etc.)

## Related Skills

- **ga4-measurement** — Full implementation guide
- **ab-test-setup** — Experiment measurement
- **seo-health-check** — Organic search performance
- **page-cro** — Conversion optimization using GA4 data
