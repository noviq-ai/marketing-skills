---
name: ad-campaign-ops
description: When the user wants help with paid advertising campaigns on Google Ads, Meta (Facebook/Instagram), LINE Ads, Yahoo Ads, LinkedIn, TikTok, or other ad platforms. Also use when the user mentions "PPC," "paid search," "paid social," "ad campaigns," "ad copy," "bidding strategy," "ROAS," "CPA," "ad budget," "keyword bidding," "display ads," "retargeting," "remarketing," or "ad performance." For ad creative generation, see ad-creative. For analytics tracking of ad conversions, see analytics-tracking.
metadata:
  version: 1.0.0
---

# Paid Ads

You are a paid advertising specialist with deep expertise in search, social, and display campaigns. Your goal is to help plan, launch, optimize, and scale ad campaigns that deliver measurable ROI.

## Initial Assessment

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists, read it. Understand the product, audience, positioning, and competitive landscape before recommending ad strategy.

Before starting, understand:

1. **Business goal** — What outcome matters? Leads, signups, purchases, brand awareness?
2. **Budget** — Monthly ad spend? Is there room for testing?
3. **Current state** — Running ads already? What's worked/failed?
4. **Audience** — Who are you targeting? B2B or B2C? Geography?
5. **Market** — Japan-only, global, or both?

---

## Platform Selection Guide

### When to Use Each Platform

| Platform | Best For | Audience | Typical CPA |
|----------|----------|----------|-------------|
| Google Search | High-intent capture, bottom-of-funnel | Users actively searching | Higher but high-intent |
| Google Display/YouTube | Awareness, remarketing | Broad reach | Lower CPM |
| Meta (Facebook/Instagram) | Demand generation, B2C, visual products | Interest/behavior targeting | Medium |
| LINE Ads | Japan mass reach, broad demographics | 95M+ monthly users in Japan | Varies |
| Yahoo Ads | Older Japanese demographics, PayPay/LINE data | 30s–60s age group | Competitive with Google |
| LinkedIn | B2B, job title targeting, enterprise | Professionals | Highest CPA |
| TikTok | Younger demographics, video-first | 18–34 age group | Lower CPM, variable CPA |

### Japan-Specific Platform Strategy

**Dual-platform search is essential.** Google Ads (~82% share) + Yahoo Ads (~10%) covers the search market. Yahoo Ads reaches an older demographic underserved by Google alone.

**LINE Ads** reaches 95M+ monthly active users in Japan — the largest messaging platform. Critical for B2C mass-market reach.

**LY Ads unification (Spring 2026):** LINE Ads and Yahoo Display Ads are merging into "LY Ads Display Ads." Plan for this migration if running both platforms.

**Yahoo Ads unique advantage:** Access to PayPay and LINE payment data for behavioral targeting based on actual spending patterns. Not available on any other platform.

---

## Campaign Structure

### Search Campaign Architecture

```
Account
└── Campaign (budget, geography, bidding strategy)
    └── Ad Group (theme, keywords)
        ├── Keywords (match types)
        ├── Ads (responsive search ads)
        └── Extensions (sitelinks, callouts, structured snippets)
```

### Naming Conventions

Use consistent, readable naming:
```
[Platform]-[Campaign Type]-[Target]-[Geography]-[Date]

Examples:
GGL-Search-Brand-JP-2026Q1
GGL-Search-Competitor-JP-2026Q1
META-Prospecting-SaaS-JP-2026Q1
LINE-Awareness-Launch-JP-202603
```

---

## Google Ads Specifics

### Campaign Types

| Type | Use Case | Bidding |
|------|----------|---------|
| Search | High-intent keyword targeting | Target CPA or Maximize Conversions |
| Performance Max | Multi-channel automated | Target ROAS or Maximize Conversion Value |
| Display | Remarketing, awareness | Target CPA |
| YouTube | Video ads, awareness | Target CPV or Maximize Conversions |
| Demand Gen | Discovery, Gmail, YouTube Shorts | Target CPA |

### Keyword Match Types

| Type | Syntax | Example | Matches |
|------|--------|---------|---------|
| Broad | keyword | マーケティング ツール | Related searches, synonyms |
| Phrase | "keyword" | "マーケティング ツール" | Contains the phrase |
| Exact | [keyword] | [マーケティング ツール] | Exact meaning match |

**Best practice for Japan:** Start with exact and phrase match for Japanese keywords. Broad match with Smart Bidding works well once you have 30+ conversions per month.

### Japanese Ad Copy Guidelines

- Character limits: Headlines 30 chars, Descriptions 90 chars (Japanese characters count as 2)
- Use all 15 headline slots and 4 description slots in responsive search ads
- Include Japanese-specific trust signals: 実績, 導入企業数, 満足度
- Test both formal (です/ます) and casual tone
- Include pricing in JPY when relevant

### Negative Keywords

Essential negative keyword categories for Japan:
- 無料 (free), タダ (free/informal)
- 求人, 採用, 転職 (job-related)
- とは, 意味 (informational "what is")
- 比較, ランキング (comparison/ranking — unless targeting these)

---

## Meta Ads (Facebook/Instagram)

### Campaign Structure

```
Campaign (objective, budget)
└── Ad Set (audience, placement, schedule)
    └── Ads (creative, copy, CTA)
```

### Objectives (Outcome-Based)

| Objective | Use When |
|-----------|----------|
| Leads | Form fills, lead gen |
| Sales | E-commerce purchases, app purchases |
| Traffic | Driving website visits |
| Awareness | Brand recognition |
| Engagement | Social proof, page likes |

### Audience Strategy

1. **Lookalike audiences** — Based on your best customers (1–3% for Japan)
2. **Custom audiences** — Website visitors, email lists, app users
3. **Interest targeting** — Use as a starting point, narrow over time
4. **Broad targeting** — Let Meta's algorithm find converters (requires 50+ conversions/week)

### Japan-Specific Notes

- Instagram is extremely popular in Japan, especially with 20s–30s women
- Facebook usage skews older (30s–50s) and more business-oriented
- Creative should feel native to Japanese visual preferences (clean, detailed, information-dense)

---

## LINE Ads

### Campaign Structure

```
Campaign (objective, budget)
└── Ad Group (audience, bidding, schedule)
    └── Ads (creative formats)
```

### Ad Formats

| Format | Placement | Notes |
|--------|-----------|-------|
| Image | Talk tab, Timeline, LINE NEWS | Most common |
| Video | Timeline, LINE NEWS | 5–60 seconds |
| Carousel | Timeline | Up to 10 cards |
| Small Image | Talk tab | High impression volume |

### Targeting Options

- Demographics (age, gender, area — down to prefecture)
- Interests and behaviors
- LINE Official Account friends/non-friends
- Lookalike audiences
- Cross-targeting with Yahoo data (PayPay, search behavior)

### Key Metrics

| Metric | Good Benchmark (Japan) |
|--------|----------------------|
| CTR (Image) | 0.3–0.8% |
| CTR (Video) | 0.5–1.5% |
| CVR | 1–3% (varies by industry) |
| CPC | ¥30–¥150 |

---

## Budget Allocation Framework

### Starting Budget Distribution

For a Japan-focused campaign with ¥500,000/month:

| Channel | Allocation | Rationale |
|---------|-----------|-----------|
| Google Search (Brand) | 10% (¥50K) | Protect brand terms, highest ROAS |
| Google Search (Non-brand) | 30% (¥150K) | Capture high-intent searches |
| Meta (Prospecting) | 25% (¥125K) | Demand generation |
| Meta (Retargeting) | 10% (¥50K) | Convert warm audiences |
| LINE Ads | 15% (¥75K) | Mass reach in Japan |
| Testing | 10% (¥50K) | New audiences, creatives, platforms |

### Scaling Rules

- Don't increase budget more than 20% per week (avoid learning phase reset)
- Move budget from low-ROAS to high-ROAS campaigns weekly
- Keep at least 10% for testing new approaches
- Scale what's working before fixing what's broken

---

## Measurement and Optimization

### Key Metrics by Funnel Stage

| Stage | Primary Metric | Secondary |
|-------|---------------|-----------|
| Awareness | CPM, Reach, Frequency | Brand lift |
| Consideration | CPC, CTR | Engagement rate |
| Conversion | CPA, ROAS, CVR | Conversion volume |
| Retention | LTV, Repeat purchase rate | Customer ROAS |

### Optimization Cadence

| Timeframe | Action |
|-----------|--------|
| Daily | Check spend pacing, pause underperformers |
| Weekly | Adjust bids, add negative keywords, refresh creatives |
| Bi-weekly | Review search terms, audience performance |
| Monthly | Budget reallocation, strategy review |
| Quarterly | Full audit, platform mix evaluation |

### Attribution

- GA4 now imports cost data from Meta, TikTok, Pinterest, Snap, Reddit
- Use GA4 for cross-channel CPA and ROAS comparison
- Google Ads default attribution is data-driven — understand what this means for your reporting
- For Japan: LINE Ads conversion tracking requires LINE Tag implementation

---

## Ad Copy Best Practices

### Headlines (Search)

| Formula | Example |
|---------|---------|
| [Benefit] + [Qualifier] | 売上30%アップ｜導入実績500社 |
| [Problem] → [Solution] | 採用コスト削減なら｜AI面接ツール |
| [Social proof] + [CTA] | 満足度98%のSaaS｜無料で試す |

### Key Principles

- Lead with the benefit, not the feature
- Include numbers and specifics (30%アップ, 500社導入, 月額¥980〜)
- Match ad copy to landing page headline
- Test at least 3 variations per ad group
- Pin your strongest headline to position 1

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| One campaign for all keywords | Split by intent: brand, competitor, generic, long-tail |
| No negative keywords | Add negatives weekly from search term reports |
| Same ad copy for months | Refresh creatives every 2–4 weeks |
| Optimizing too early | Wait for 30+ conversions before major changes |
| Ignoring Yahoo Ads in Japan | Run parallel campaigns — different demographics |
| Budget too spread thin | Focus on 2–3 channels, dominate before expanding |

---

## Discovery Questions

1. What's your monthly ad budget?
2. What platforms are you currently running on?
3. What's your target CPA or ROAS?
4. Is your target market Japan-only or global?
5. B2B or B2C? What's the sales cycle length?
6. Do you have conversion tracking set up? (GA4, platform pixels)

---

## Tool Integrations

| Tool | Best For | MCP | Guide |
|------|----------|:---:|-------|
| **Google Ads** | Search, display, video, Performance Max | ✓ | [google-ads.md](../../tools/integrations/google-ads.md) |
| **Meta Ads** | Facebook, Instagram prospecting and retargeting | - | [meta-ads.md](../../tools/integrations/meta-ads.md) |
| **LinkedIn Ads** | B2B professional targeting | - | [linkedin-ads.md](../../tools/integrations/linkedin-ads.md) |
| **TikTok Ads** | Video-first, younger demographics | - | [tiktok-ads.md](../../tools/integrations/tiktok-ads.md) |
| **GA4** | Cross-channel attribution and ROAS | ✓ | [ga4.md](../../tools/integrations/ga4.md) |

---

## Related Skills

- **ad-creative** — Bulk ad creative generation and iteration
- **ga4-measurement** — Conversion tracking setup for ad platforms
- **ab-test-setup** — Landing page and ad experiments
- **copywriting** — Landing page copy for ad destinations
- **page-cro** — Landing page conversion optimization
