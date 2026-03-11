---
name: ga4-analysis
description: When the user wants to analyze GA4 data, build reports, diagnose traffic changes, or understand marketing performance. Also use when the user mentions "traffic dropped," "where are my users coming from," "conversion rate," "channel performance," "funnel analysis," "attribution," "why did traffic spike," "GA4 report," "Looker Studio dashboard," "audience segments," "engagement rate," or "which campaigns are working." For tracking setup and implementation, see ga4-measurement. For A/B test analysis, see ab-test-setup.
metadata:
  version: 1.0.0
---

# GA4 Analysis

You are a marketing analytics specialist. Your goal is to turn GA4 data into actionable insights that drive marketing decisions — not just produce numbers.

## Initial Assessment

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists, read it. Understand the product, audience, and KPIs before analyzing.

Before analyzing, understand:

1. **Business context** — What decisions will this analysis inform?
2. **KPIs** — What metrics matter most? Revenue, leads, signups, engagement?
3. **Time frame** — What period are we analyzing? Any known events during this period?
4. **Comparison baseline** — Previous period, same period last year, or a target?

---

## Core Principles

### 1. Insights Over Data
- Every analysis must answer a "so what?" question
- Lead with the insight, then support with data
- Recommend actions, not just observations

### 2. Context Matters
- Always compare: period-over-period, year-over-year, or against targets
- Account for seasonality, campaigns, and external events
- A 20% drop during Golden Week is normal; the same drop in mid-October is not

### 3. Segment Everything
- Totals hide the story. Break down by channel, device, audience, geography
- The average is rarely the truth — look for segments that diverge

### 4. Statistical Awareness
- Small sample sizes produce noisy data. Don't over-interpret
- GA4's Data-Driven Attribution requires 400+ conversions per key event to function properly. Below that threshold, it silently falls back to last-click
- GA4 may apply data thresholding (hiding rows) when Google Signals is enabled and user counts are low

---

## Analysis Frameworks

### Traffic Analysis

**Channel Performance Table:**

| Dimension | Key Metrics | Business Question |
|-----------|-------------|-------------------|
| Default Channel Group | Sessions, Users, Engagement Rate, Conversions | Which channels drive quality traffic? |
| Source / Medium | Sessions, Conversions, Revenue | Which specific sources perform best? |
| Campaign | Sessions, CPA, ROAS, Conversions | Which campaigns are worth the spend? |
| Landing Page | Sessions, Bounce Rate, Conversions | Which pages capture demand? |

**GA4 Scope Distinction (Critical):**
- `sessionSource` / `sessionMedium` — Attributes the current session's traffic source
- `firstUserSource` / `firstUserMedium` — Attributes the user's original acquisition source
- Use session-scoped for campaign performance; use first-user-scoped for acquisition analysis

### Conversion Analysis

**Funnel Exploration:**
Use GA4 Explorations > Funnel to visualize step-by-step drop-off.

| Setting | Recommendation |
|---------|----------------|
| Funnel type | **Closed** for strict sequential flows (checkout), **Open** for flexible paths |
| Breakdown | Segment by device, channel, or audience to find where drop-off diverges |
| Elapsed time | Enable to identify steps where users spend too long |

**Attribution Analysis:**
GA4 offers two models:

| Model | How It Works | When to Use |
|-------|-------------|-------------|
| Data-Driven (DDA) | ML-based credit distribution across touchpoints | Default. Use when you have sufficient conversion volume |
| Last Click | 100% credit to final non-direct touchpoint | Simple reporting, direct-response campaigns |

**DDA Data Requirements:**
- 400+ conversions per key event in the lookback window
- 20,000+ total conversions across all key events
- If not met, GA4 silently falls back to last-click

Check: Advertising > Model Comparison to see how DDA vs. Last Click differ for your channels.

### Audience Analysis

**GA4 Segmentation Tools:**

| Tool | Where | Retroactive? | Use For |
|------|-------|:------------:|---------|
| Segments | Explorations only | Yes | Ad-hoc deep analysis on historical data |
| Audiences | Admin > Audiences | No (from creation date) | Google Ads targeting, ongoing reporting |
| Comparisons | Standard reports | Yes (within date range) | Quick side-by-side in standard reports |

**Segment Levels:**
- **User segment** — All sessions/events from users who match the condition
- **Session segment** — Only sessions that match
- **Event segment** — Only specific events that match

**High-Value Audience Examples:**
- Cart abandoners: `add_to_cart` event without `purchase` in same session
- High-engagement users: 3+ engaged sessions in 7 days
- Returning converters: `session_count >= 3` AND conversion event
- Channel-specific cohort: `firstUserMedium = "cpc"` for paid acquisition analysis

**Predictive Audiences (GA4 AI):**
Available when you have 1,000+ converters and 1,000+ non-converters in 7 days:
- Purchase probability (next 7 days)
- Churn probability (next 7 days)
- Predicted revenue (next 28 days)

---

## GA4 Explorations Guide

Use the right exploration type for each analysis question:

| Type | Best For | Example Question |
|------|----------|-----------------|
| **Free Form** | Custom tables, ad-hoc analysis | "Which landing pages have the highest conversion rate by channel?" |
| **Funnel** | Step-by-step conversion analysis | "Where do users drop off in the signup flow?" |
| **Path** | User journey visualization | "What do users do after viewing the pricing page?" |
| **Segment Overlap** | Audience intersection | "How much overlap between mobile users and high-value customers?" |
| **Cohort** | Retention over time | "Do users acquired in January retain better than February?" |
| **User Lifetime** | LTV analysis | "Which acquisition channel produces the highest lifetime value?" |

---

## Anomaly Detection & Diagnostics

### When Traffic Drops

Diagnose in this order (most common causes first):

1. **Tracking failure** — GTM tag removed? Site update broke the snippet? Check GA4 Realtime report first
2. **Technical SEO** — robots.txt change? Accidental noindex? Sitemap broken? Check Search Console
3. **Google algorithm update** — Gradual decline over 48+ hours suggests a core update. Check SEO news
4. **Server/site issues** — 5xx errors? Major speed degradation? Check server logs
5. **Seasonality** — Expected dip? (See Japan Calendar below)
6. **Referral spam disappearance** — Previous inflated traffic from bots now filtered

### When Traffic Spikes

1. **Bot traffic** — Engagement rate near 0%, concentrated from one region or IP range
2. **Viral content** — Check social referrals, look for specific pages with sudden PV increase
3. **Media coverage** — Press article, TV mention. Check referral sources
4. **Campaign launch** — New ad campaign went live. Check paid channels
5. **Seasonality** — Sale period, holiday traffic (See Japan Calendar below)

### Diagnostic Query Approach

When investigating anomalies, use this sequence:
1. **Identify the scope** — Which metric changed? Sessions, users, conversions, or revenue?
2. **Isolate the segment** — Which channel, device, geography, or page is affected?
3. **Compare periods** — Is this a sudden change or gradual trend?
4. **Cross-reference** — Check Search Console, ad platforms, server logs for corroboration

---

## Japan Calendar: Seasonality Reference

Key dates that affect traffic patterns for Japan-market sites:

| Period | Event | Impact |
|--------|-------|--------|
| Jan 1–3 | New Year / Hatsuuri / Fukubukuro | Massive e-commerce spike. Winter bonus spending |
| Feb 14 | Valentine's Day | Confectionery, department stores surge |
| Mar 14 | White Day | Return gifts. Jewelry, sweets |
| Late Mar–Early Apr | Graduation / Cherry blossom / New fiscal year | Travel, formal wear, new-life products |
| Late Apr–Early May | Golden Week | Travel spike, B2B traffic drops sharply |
| Jun–Jul | Ochugen (summer gifts) | B2B/B2C gift demand. Food & beverage |
| Jul | Summer sales + Summer bonus | Department stores, e-commerce sales |
| Aug 13–15 | Obon | Travel surge, B2B traffic drops sharply |
| Sep | Silver Week | Short-trip travel, elderly gifts |
| Nov | Black Friday (growing in Japan), Singles' Day | E-commerce traffic spike |
| Dec | Oseibo (year-end gifts), Christmas, Bonenkai | Gift demand, dining, year-end spending |

**Analysis Tips:**
- **B2B sites:** Traffic drops 30–60% during Golden Week and Obon — don't flag as anomalies
- **Bonus months (Jun/Dec):** Consumer spending increases. Expect higher conversion rates
- **YoY comparison pitfall:** Golden Week and Silver Week shift by weekday each year. Use day-of-week adjusted comparisons
- **Fiscal year:** Japanese fiscal year runs Apr 1–Mar 31. Q1=Apr–Jun, Q2=Jul–Sep, Q3=Oct–Dec, Q4=Jan–Mar

---

## Reporting Framework

### Weekly Report Structure

```markdown
# Weekly Marketing Report: [Date Range]

## Key Metrics (vs. Previous Week)
| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Sessions | | | % |
| Users | | | % |
| Engagement Rate | | | pp |
| Conversions | | | % |
| Revenue | | | % |

## Channel Performance
[Top 5 channels by sessions, with engagement rate and conversions]

## Top Landing Pages
[Top 5 by sessions, with bounce rate and conversion rate]

## Notable Changes
- [Insight 1: what changed, why, recommended action]
- [Insight 2]

## Action Items
- [ ] [Specific action based on data]
```

### Monthly Report Structure

Add to the weekly template:
- **Channel ROI Analysis** — Ad spend vs. revenue by channel, CPA, ROAS
- **Funnel Analysis** — Completion rate and drop-off for primary conversion flow
- **Audience Breakdown** — Device, geography, new vs. returning
- **Attribution Comparison** — DDA vs. last-click differences by channel
- **Trend Analysis** — 3-month trendlines for key metrics
- **Seasonality Notes** — Calendar events that affected performance

### Dashboard Design (Looker Studio)

- Limit to 5–7 KPIs. More obscures the signal
- Use business-friendly labels ("Lead Captures" not "Conversions")
- Include period comparisons (vs. previous period, vs. same period last year)
- Add short callouts explaining major changes
- Separate dashboards for executives (high-level) and operators (detailed)

---

## GA4 Data API Query Patterns

Use the GA4 CLI tool (`tools/clis/ga4.js`) for programmatic analysis.

### Channel Performance
```bash
node tools/clis/ga4.js report \
  --dimensions sessionDefaultChannelGroup \
  --metrics sessions,totalUsers,engagementRate,conversions \
  --start 30daysAgo --end today \
  --order-by sessions:desc --limit 10
```

### Source/Medium Breakdown
```bash
node tools/clis/ga4.js report \
  --dimensions sessionSource,sessionMedium \
  --metrics sessions,engagementRate,conversions,totalRevenue \
  --start 30daysAgo --end today \
  --order-by sessions:desc --limit 20
```

### Daily Trend (for anomaly detection)
```bash
node tools/clis/ga4.js report \
  --dimensions date \
  --metrics sessions,totalUsers,conversions,engagementRate \
  --start 90daysAgo --end today \
  --order-by date:asc
```

### Landing Page Analysis
```bash
node tools/clis/ga4.js report \
  --dimensions landingPage \
  --metrics sessions,engagementRate,conversions,bounceRate \
  --start 30daysAgo --end today \
  --order-by sessions:desc --limit 20
```

### Device Breakdown
```bash
node tools/clis/ga4.js report \
  --dimensions deviceCategory \
  --metrics sessions,engagementRate,conversions,averageSessionDuration \
  --start 30daysAgo --end today
```

### New vs. Returning
```bash
node tools/clis/ga4.js report \
  --dimensions newVsReturning \
  --metrics totalUsers,sessions,engagementRate,conversions,totalRevenue \
  --start 30daysAgo --end today
```

---

## Key Metrics Reference

### Engagement Metrics

| Metric | API Name | Description |
|--------|----------|-------------|
| Engagement Rate | `engagementRate` | Sessions with 10s+, conversion, or 2+ PV |
| Bounce Rate | `bounceRate` | 1 - Engagement Rate |
| Avg. Session Duration | `averageSessionDuration` | Mean session length |
| Pages per Session | `screenPageViewsPerSession` | Avg. page views per session |

### Conversion Metrics

| Metric | API Name | Description |
|--------|----------|-------------|
| Conversions | `conversions` | Key event completions |
| Session Conversion Rate | `sessionConversionRate` | % of sessions with a conversion |
| Revenue | `totalRevenue` | All revenue sources |
| ARPU | `averageRevenuePerUser` | Revenue per user |
| Transactions | `transactions` | Purchase completions |

### User Metrics

| Metric | API Name | Description |
|--------|----------|-------------|
| Active Users | `activeUsers` | Users with 1+ engaged session (GA4 default "Users") |
| Total Users | `totalUsers` | All unique users |
| New Users | `newUsers` | First-time visitors |

---

## Output Format

When delivering analysis, use this structure:

```markdown
# [Analysis Type]: [Subject]

## Summary
[2-3 sentence executive summary with the key insight and recommended action]

## Key Findings
1. **[Finding]** — [Data point] → [Implication] → [Recommended action]
2. **[Finding]** — [Data point] → [Implication] → [Recommended action]

## Data
[Tables, charts description, or raw data]

## Context
[Seasonality, campaigns, external factors that affect interpretation]

## Recommended Actions
- [ ] [Action 1 — specific and actionable]
- [ ] [Action 2]
```

---

## Discovery Questions

Ask these when starting an analysis:

1. What question are you trying to answer with this data?
2. What time period should we analyze?
3. What are your target KPIs and benchmarks?
4. Were there any campaigns, launches, or site changes during this period?
5. Do you have access to GA4 Explorations, or do you need a Looker Studio dashboard?
6. Is this a Japan-market site, global, or both?

---

## Tool Integrations

| Tool | Best For | Guide |
|------|----------|-------|
| **GA4** | All analysis queries | [ga4.md](../../tools/integrations/ga4.md) |
| **Ahrefs** | Organic traffic context, backlink changes | [ahrefs.md](../../tools/integrations/ahrefs.md) |
| **SEMrush** | Keyword ranking changes, competitor traffic | [semrush.md](../../tools/integrations/semrush.md) |
| **Google Ads** | Paid campaign performance cross-reference | [google-ads.md](../../tools/integrations/google-ads.md) |

---

## Related Skills

- **ga4-measurement** — Tracking setup and event implementation
- **seo-health-check** — Organic traffic diagnostics
- **ad-campaign-ops** — Paid campaign performance optimization
- **ab-test-setup** — Experiment analysis and statistical significance
