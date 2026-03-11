# Japan Advertising Platforms Guide

Detailed reference for running paid advertising campaigns in the Japanese market.

## Market Overview (2025–2026)

Japan's digital ad market is the third largest globally. Key trends:
- **Video advertising** is the fastest-growing format
- **Retail media** is emerging (Amazon, Rakuten, Yahoo Shopping)
- **LINE/Yahoo (LY Corporation)** unification creates a data powerhouse
- **AI-powered bidding** adoption is accelerating

### Platform Market Share (Search)

| Platform | Share | Trend |
|----------|-------|-------|
| Google | ~82% | Dominant across all demographics |
| Yahoo Japan | ~10% | Stable, strong in 30s–60s |
| Bing | ~9% | Growing with Copilot integration |

---

## Yahoo Ads (Yahoo! JAPAN)

### Why Yahoo Ads Still Matters

- Reaches older demographics (30s–60s) underserved by Google
- Integrated with LY Corporation data (LINE, PayPay)
- Lower CPCs for many competitive keywords
- Some industries (finance, insurance, real estate) convert better on Yahoo

### Campaign Types

| Type | Description | Equivalent |
|------|-------------|------------|
| Search Ads | Keyword-targeted text ads | Google Search |
| Display Ads | Banner/video across Yahoo properties | Google Display |
| Shopping Ads | Product listing ads on Yahoo Shopping | Google Shopping |

### Unique Features

**PayPay data targeting:** Target users based on actual purchase behavior and spending patterns from PayPay (Japan's largest mobile payment platform).

**Yahoo properties placement:** Ads appear across Yahoo Japan's ecosystem — Yahoo News, Yahoo Weather, Yahoo Finance, Yahoo Real Estate, etc.

**LINE data integration:** Cross-target using LINE user data (demographics, interests, messaging behavior).

### Key Differences from Google Ads

| Aspect | Google Ads | Yahoo Ads |
|--------|-----------|-----------|
| Interface language | English/Japanese | Japanese only |
| Smart Bidding | Advanced | Available but less sophisticated |
| Audience signals | Google data | Yahoo + LINE + PayPay data |
| Display network | Google Display Network | Yahoo Japan properties |
| Reporting | Detailed, real-time | Good, but less granular |
| API | Full REST API | Available but less documented |

### Yahoo Ads Setup Checklist

- [ ] Create Yahoo JAPAN Business ID
- [ ] Set up Search Ads and/or Display Ads account
- [ ] Import Google Ads campaigns (Yahoo provides import tools)
- [ ] Configure Yahoo Tag (equivalent of Google Tag)
- [ ] Set conversion tracking
- [ ] Add negative keywords specific to Yahoo search patterns

---

## LINE Ads in Detail

### Reach and Demographics

- **95M+ monthly active users** in Japan (penetration ~75% of population)
- Covers all age groups — unlike platforms that skew young or old
- Largest messaging app in Japan by far

### Ad Placements

| Placement | Description | Best For |
|-----------|-------------|----------|
| Talk List | Top of chat list | Highest impression volume |
| Timeline | Social feed | Engagement, video |
| LINE NEWS | News feed | Content promotion |
| LINE Manga | Manga reader | Young audience |
| LINE BLOG | Blog platform | Content awareness |
| LINE Points | Reward exchange | CPI, app installs |
| Smart Channel | Mixed placements | Broad reach |

### Audience Targeting

**Demographic:**
- Age, gender, region (down to prefecture and city)
- OS (iOS/Android)

**Interest/Behavior:**
- 18 interest categories
- Purchase behavior (via PayPay data)
- App usage behavior

**Custom:**
- Website visitors (via LINE Tag)
- Customer email/phone list upload
- LINE Official Account friends
- Lookalike (1%, 3%, 5%, 10%, 15%)

### Creative Requirements

| Format | Size | Aspect Ratio | Max File |
|--------|------|-------------|----------|
| Image (standard) | 1200×628 | 1.91:1 | 10MB |
| Image (square) | 1080×1080 | 1:1 | 10MB |
| Image (vertical) | 1080×1920 | 9:16 | 10MB |
| Video | Various | 16:9, 1:1, 9:16 | 1GB, max 120s |
| Carousel | 1080×1080 per card | 1:1 | 10MB per card |

### LINE Tag Setup

```html
<!-- Base Code (all pages) -->
<script>
(function(g,d,o){
  g._ltq=g._ltq||[];g._lt=g._lt||function(){g._ltq.push(arguments)};
  var h=d.getElementsByTagName(o)[0];var s=d.createElement(o);s.async=1;
  s.src='https://d.line-scdn.net/n/line_tag/public/release/v1/lt.js';
  h.parentNode.insertBefore(s,h);
})(window,document,'script');
_lt('init',{customerType:'account',tagId:'YOUR_TAG_ID'});
_lt('send','pv',['YOUR_TAG_ID']);
</script>

<!-- Conversion Event -->
<script>
_lt('send','cv',{type:'Conversion'},['YOUR_TAG_ID']);
</script>
```

---

## LY Ads Unification (Spring 2026)

### What's Changing

LINE Ads and Yahoo Display Ads are merging into **LY Ads Display Ads**.

### Impact

- Unified campaign management interface
- Combined audience data (LINE + Yahoo + PayPay)
- Simplified ad delivery across both networks
- Single conversion tracking system

### Migration Checklist

- [ ] Audit current LINE Ads and Yahoo Display campaigns
- [ ] Identify overlapping audiences
- [ ] Plan campaign structure for unified platform
- [ ] Update conversion tracking to LY Ads format
- [ ] Reallocate budgets based on combined performance data

---

## Budget Benchmarks (Japan, 2025)

### Average CPC by Industry

| Industry | Google Search CPC | Yahoo Search CPC | LINE Ads CPC |
|----------|------------------|-------------------|--------------|
| SaaS/IT | ¥200–¥500 | ¥150–¥400 | ¥50–¥150 |
| E-commerce | ¥50–¥200 | ¥40–¥150 | ¥30–¥100 |
| Finance/Insurance | ¥500–¥2,000 | ¥400–¥1,500 | ¥80–¥200 |
| Real Estate | ¥300–¥1,000 | ¥250–¥800 | ¥60–¥180 |
| Education | ¥150–¥400 | ¥120–¥350 | ¥40–¥120 |
| HR/Recruiting | ¥300–¥800 | ¥250–¥700 | ¥50–¥150 |

*These are rough benchmarks. Actual CPCs vary significantly by keyword competition and targeting.*

### Minimum Viable Budget

| Goal | Monthly Minimum | Notes |
|------|----------------|-------|
| Test single platform | ¥100,000 | Enough for learning, not optimization |
| Meaningful test | ¥300,000 | Can gather 30+ conversions for Smart Bidding |
| Multi-platform launch | ¥500,000+ | Google + Meta or LINE |
| Scale | ¥1,000,000+ | Full funnel, multiple platforms |

---

## Cross-Platform Attribution

### Recommended Setup

1. **GA4** as the central hub — imports cost data from Meta, TikTok, Pinterest, Snap, Reddit
2. **Google Ads** conversion import from GA4 (for Smart Bidding)
3. **LINE Tag** for LINE Ads conversion tracking
4. **Yahoo Tag** for Yahoo Ads conversion tracking
5. **UTM parameters** on all non-Google traffic for GA4 tracking

### Attribution Challenges in Japan

- Users often switch between devices (mobile research → desktop purchase)
- LINE messages and in-app browsers create attribution gaps
- Cross-platform journeys are common: LINE Ad → Google Search → Purchase
- Consider using GA4's data-driven attribution model for multi-touch analysis
