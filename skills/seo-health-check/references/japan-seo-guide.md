# Japan SEO Guide

Detailed reference for SEO considerations specific to the Japanese market.

## Search Engine Market Share (2025)

| Engine | Share | Algorithm | Notes |
|--------|-------|-----------|-------|
| Google Japan | ~80% | Google core | Dominant across all demographics |
| Yahoo Japan | ~10% | Google-powered | Surfaces Yahoo ecosystem (News, Shopping) more prominently |
| Bing Japan | ~5% | Microsoft | Growing with Copilot integration |
| Others | ~5% | Various | DuckDuckGo, Baidu (Chinese users in Japan) |

**Key insight**: Optimizing for Google Japan covers Yahoo Japan. Focus resources on Google.

---

## Japanese Writing Systems and Keywords

### The Three Scripts

| Script | Name | Usage | Example |
|--------|------|-------|---------|
| 漢字 | Kanji | Chinese characters, meaning-dense | 検索 (search) |
| ひらがな | Hiragana | Native Japanese phonetic | けんさく (search) |
| カタカナ | Katakana | Foreign words, technical terms | マーケティング (marketing) |

### Keyword Variation Challenge

A single concept can be searched in multiple ways:

| Concept | Variations |
|---------|------------|
| Moving/relocation | 引越し, 引っ越し, ひっこし, 引越 |
| Beauty salon | 美容院, 美容室, ビューティーサロン, ヘアサロン |
| Marketing | マーケティング, まーけてぃんぐ |
| SEO | SEO, エスイーオー, 検索エンジン最適化 |

**Best practice**: Research all script variations using Google Keyword Planner (location: Japan). Target the highest-volume variation in your title tag, and include other variations naturally in body content.

### Long-Tail Keywords

Japanese long-tail keywords tend to be:
- Longer in character count but semantically compact
- Often include location: "渋谷 美容院 おすすめ" (Shibuya beauty salon recommended)
- Question format: "〜とは" (what is ~), "〜 方法" (how to ~), "〜 比較" (~ comparison)

---

## Domain Strategy

### Domain Types

| Domain | Trust Signal | Best For |
|--------|-------------|----------|
| .co.jp | Highest (requires Japan corporation registration) | Established businesses |
| .jp | High (requires Japan address) | Startups, smaller businesses |
| .com with hreflang | Medium | Global companies with Japan presence |
| Subdomain (ja.example.com) | Medium | Quick localization |
| Subdirectory (example.com/ja/) | Medium | Consolidated domain authority |

### Hreflang Implementation

```html
<!-- On Japanese pages -->
<link rel="alternate" hreflang="ja" href="https://example.co.jp/page" />
<link rel="alternate" hreflang="en" href="https://example.com/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/page" />
```

Common mistakes:
- Using `ja-JP` when `ja` is sufficient (unless targeting Japan specifically vs other Japanese-speaking audiences)
- Missing `x-default` fallback
- Non-reciprocal hreflang (page A points to page B, but B doesn't point back to A)

---

## Content Quality Standards (2025)

### What Google Japan Rewards

- **Original research and data** — surveys, case studies, proprietary data
- **Author expertise** — visible author bios with credentials
- **Depth over length** — comprehensive coverage, not word-count padding
- **Japanese-native writing** — content written by native speakers, not translated
- **E-E-A-T signals** — Experience, Expertise, Authoritativeness, Trustworthiness

### What Google Japan Demotes

- **AI-generated content without editorial oversight** — thin, generic, no unique insight
- **Direct translations** — English content run through translation tools
- **Keyword-stuffed pages** — unnatural keyword density
- **Thin affiliate pages** — no original value beyond linking to products

### Content Performance Benchmark

Localized content (written with Japanese writers/editors) generates approximately **3.2x more organic traffic** than translated content, according to multiple Japan SEO agencies.

---

## Yahoo Japan Specifics

Although Yahoo Japan uses Google's algorithm, there are practical differences:

| Factor | Google Japan | Yahoo Japan |
|--------|-------------|-------------|
| Algorithm | Google core | Google core (same) |
| SERP features | Standard Google features | Yahoo News, Yahoo Shopping integration |
| Local results | Google Maps integration | Yahoo! Loco, Yahoo! Maps |
| User demographic | Younger, tech-savvy | Older, mainstream |
| Mobile app | Google app, Chrome | Yahoo! JAPAN app (very popular) |

**Actionable items for Yahoo Japan:**
- Ensure your site is listed in Yahoo! JAPAN directory (if available for your category)
- For e-commerce, consider Yahoo Shopping integration
- For news/media, Yahoo News syndication can drive significant traffic

---

## Mobile Optimization (Japan Priority)

~90% of Japanese internet users are mobile. Key checks:

- [ ] Viewport meta tag present and correct
- [ ] Tap targets minimum 48x48px with 8px spacing
- [ ] No horizontal scroll on any page
- [ ] Font size minimum 16px for body text
- [ ] Forms work well on Japanese IME keyboards
- [ ] Page loads under 3 seconds on 4G connection
- [ ] AMP not required but recommended for news content

---

## Local SEO (Japan)

### Google Business Profile
- Claim and verify your business listing
- Use Japanese for business name and description
- Add photos (Japanese users heavily rely on photos)
- Respond to reviews in Japanese
- Keep hours accurate (including Japanese holidays)

### Local Citations
- Key directories: Hot Pepper, Tabelog (restaurants), Suumo (real estate), Recruit services
- NAP (Name, Address, Phone) consistency across all listings
- Use Japanese address format: 〒postal code, prefecture, city, ward, block, building

---

## Technical SEO Checklist (Japan-Specific)

- [ ] Character encoding is UTF-8
- [ ] Japanese text renders correctly across browsers
- [ ] URL structure handles Japanese characters or uses romanized slugs
- [ ] hreflang tags implemented correctly (if multilingual)
- [ ] XML sitemap includes Japanese pages
- [ ] robots.txt doesn't block important Japanese content
- [ ] Search Console property set up for Japan-specific domain
- [ ] Core Web Vitals passing on mobile (test from Japan-based connection)
