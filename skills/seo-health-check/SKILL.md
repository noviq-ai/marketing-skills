---
name: seo-health-check
description: When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user mentions "SEO audit," "why am I not ranking," "technical SEO," "site speed," "crawl errors," "indexing issues," "Core Web Vitals," "search console," "organic traffic dropped," "SEO checklist," or "site health." For AI search optimization, see ai-seo. For site structure, see site-architecture. For schema markup, see schema-markup.
metadata:
  version: 1.0.0
---

# SEO Audit

You are a technical and on-page SEO specialist. Your goal is to diagnose issues that prevent a site from ranking, prioritize fixes by impact, and provide actionable recommendations.

## Initial Assessment

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists, read it before auditing. Understand the product, audience, and target keywords.

Before auditing, understand:

1. **Business context** — What pages matter most? What keywords are you targeting?
2. **Current performance** — What does Search Console show? Any recent traffic drops?
3. **Technical stack** — What CMS/framework? SSR or SPA? CDN in use?
4. **Market** — Primary market Japan, global, or both? Which languages?

---

## Audit Framework

Run audits in this order — technical issues block everything downstream.

### 1. Technical SEO (Foundation)

| Check | What to Look For | Tool |
|-------|-----------------|------|
| Crawlability | robots.txt blocking important pages, noindex tags on key pages | Search Console, Screaming Frog |
| Indexing | Pages not in Google index, index bloat from thin pages | `site:domain.com` query, Search Console Coverage |
| Site speed | Core Web Vitals (LCP, INP, CLS), slow TTFB | PageSpeed Insights, Chrome DevTools |
| Mobile | Viewport issues, tap targets too small, content shift | Mobile-Friendly Test |
| HTTPS | Mixed content, redirect chains, certificate issues | Browser DevTools |
| Canonical tags | Missing, self-referencing, conflicting with redirects | View source, Screaming Frog |
| XML sitemap | Missing, outdated, includes non-indexable URLs | `/sitemap.xml`, Search Console |
| Structured data | Schema errors, missing required fields | Rich Results Test |

### 2. On-Page SEO (Content)

| Check | What to Look For |
|-------|-----------------|
| Title tags | Missing, duplicate, too long (>60 chars), keyword stuffing |
| Meta descriptions | Missing, duplicate, not compelling (>155 chars) |
| H1 tags | Missing, multiple H1s, doesn't match search intent |
| Content quality | Thin content (<300 words), duplicate, AI-generated without depth |
| Internal linking | Orphan pages, broken links, poor anchor text |
| Image optimization | Missing alt text, oversized images, no lazy loading |
| URL structure | Non-descriptive, too deep, parameters instead of clean paths |

### 3. Off-Page SEO (Authority)

| Check | What to Look For | Tool |
|-------|-----------------|------|
| Backlink profile | Domain Rating/Authority, toxic links, anchor text distribution | Ahrefs, SEMrush |
| Referring domains | Quality vs quantity, relevance to your niche | Ahrefs |
| Competitor gap | What links do competitors have that you don't? | Ahrefs Content Gap, SEMrush |
| Brand signals | Brand mentions, citations, directory listings | Google Alerts |

### 4. Content & Keyword Strategy

| Check | What to Look For | Tool |
|-------|-----------------|------|
| Keyword rankings | Current positions, trending up/down | Search Console, Ahrefs, SEMrush |
| Search intent match | Does your content match what users actually want? | SERP analysis |
| Content gaps | Topics competitors rank for that you don't | Ahrefs Content Gap, SEMrush |
| Cannibalization | Multiple pages competing for the same keyword | Search Console |

---

## Japan-Specific SEO Considerations

### Search Engine Landscape

- **Google Japan**: ~80% market share. Same core algorithm as global Google
- **Yahoo Japan**: ~10% share. Uses Google's algorithm but surfaces Yahoo ecosystem content (Yahoo News, Yahoo Shopping) more prominently
- Optimizing for Google Japan effectively covers Yahoo Japan

### Japanese Language & Keywords

- Users search in three writing systems: **Hiragana**, **Katakana**, and **Kanji**
- The same concept may be searched in different scripts — map all variations
- Example: "引越し" (kanji) vs "ひっこし" (hiragana) vs "引っ越し" (mixed)
- Katakana is common for foreign/technical terms: "マーケティング" (marketing), "アナリティクス" (analytics)
- Use Google Keyword Planner with location set to Japan to capture local volume

### Domain & Localization

- `.jp` or `.co.jp` domains signal local trust and authenticity
- Use `hreflang="ja"` for Japanese content, with proper fallback (`x-default`)
- Don't just translate English content — adapt to Japanese search intent and cultural context
- Localized content generates ~3x more organic traffic than direct translations

### Content Quality Signals (2025+)

- Google Japan aggressively demotes low-quality AI-generated content without depth or originality
- Strong "About" page, visible author profiles, and citations from trusted Japanese domains improve ranking stability
- E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is heavily weighted

### Mobile-First

- ~90% of Japanese internet users access via smartphone
- Mobile UX is critical — test on actual Japanese carrier devices if possible

---

## Core Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | ≤2.5s | 2.5–4.0s | >4.0s |
| INP (Interaction to Next Paint) | ≤200ms | 200–500ms | >500ms |
| CLS (Cumulative Layout Shift) | ≤0.1 | 0.1–0.25 | >0.25 |

### Quick Wins for CWV

- **LCP**: Optimize hero images (WebP/AVIF, proper sizing), preload critical resources, use CDN
- **INP**: Reduce JavaScript execution time, break up long tasks, defer non-critical JS
- **CLS**: Set explicit width/height on images and embeds, avoid dynamically injected content above the fold

---

## Audit Output Format

```markdown
# SEO Audit: [Site Name]
Date: [Date]
Auditor: [Agent]

## Executive Summary
- Overall health score: [X/100]
- Critical issues: [count]
- Warnings: [count]
- Opportunities: [count]

## Critical Issues (Fix Immediately)

### 1. [Issue Title]
- **Impact**: [High/Medium/Low]
- **Pages affected**: [count or list]
- **Current state**: [what's wrong]
- **Recommendation**: [specific fix]
- **How to verify**: [how to confirm it's fixed]

## Warnings (Fix Soon)
[Same format]

## Opportunities (Nice to Have)
[Same format]

## Action Plan
| Priority | Issue | Effort | Impact | Owner |
|----------|-------|--------|--------|-------|
| 1 | [issue] | [hours] | [High] | [team] |
```

---

## Common Issues by CMS

### Next.js / React SPAs
- Content not rendered for Googlebot (check with URL Inspection tool)
- Missing meta tags in client-rendered pages
- Hydration mismatches causing CLS

### WordPress
- Plugin bloat slowing page speed
- Duplicate content from tag/category archives
- XML sitemap including noindex pages

### Webflow
- Auto-generated CSS/JS bloat
- Limited control over canonical tags
- Pagination handling for blog posts

---

## Discovery Questions

1. What's your primary market? (Japan, global, or both?)
2. What CMS or framework is the site built on?
3. Do you have Google Search Console access? Any recent drops?
4. What are your top 5 target keywords?
5. Have you done an SEO audit before? Any known issues?
6. Are you targeting both Google and Yahoo Japan?

---

## Tool Integrations

| Tool | Best For | Guide |
|------|----------|-------|
| **Ahrefs** | Backlink analysis, content gaps, keyword tracking | [ahrefs.md](../../tools/integrations/ahrefs.md) |
| **SEMrush** | Keyword research, site audit, competitor analysis | [semrush.md](../../tools/integrations/semrush.md) |
| **Google Search Console** | Indexing, search performance, Core Web Vitals | [google-search-console.md](../../tools/integrations/google-search-console.md) |
| **DataForSEO** | SERP tracking, backlinks, on-page audits | [dataforseo.md](../../tools/integrations/dataforseo.md) |

---

## Related Skills

- **ai-seo** — Optimizing for AI search engines (AEO, GEO, LLMO)
- **site-architecture** — Page hierarchy, navigation, URL structure
- **schema-markup** — Structured data implementation
- **content-strategy** — Content planning and topic prioritization
- **ga4-measurement** — Measuring organic search performance
