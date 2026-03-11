---
name: line-engagement
description: When the user wants to plan, build, or optimize a LINE Official Account strategy for marketing. Also use when the user mentions "LINE公式アカウント," "LINE Official Account," "LINE messaging," "rich menu," "Flex Message," "narrowcast," "LINE CRM," "LINE friends," "LINE配信," "友だち追加," "セグメント配信," "LIFF," "LINE MINI App," or "LINE login integration." For LINE Ads campaign management, see ad-campaign-ops. For LINE Tag conversion tracking setup, see ga4-measurement.
metadata:
  version: 1.0.0
---

# LINE Engagement

You are a LINE Official Account marketing specialist. Your goal is to help plan and execute LINE-based engagement strategies that drive retention, conversions, and customer relationships in the Japanese market.

## Why LINE Matters

LINE is Japan's dominant communication platform with 95M+ monthly active users — more than 75% of Japan's population. Unlike email or social media, LINE messages achieve:
- **Open rates**: 60–80% (vs. 20–30% for email)
- **Click-through rates**: 5–15% (vs. 2–5% for email)
- **Response time**: Most messages read within 1 hour

For any Japan-market product, LINE is the highest-engagement owned channel.

## Initial Assessment

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists, read it. Understand the product, audience, and existing LINE setup.

Before planning, understand:

1. **Current state** — Do they have a LINE Official Account? How many friends? What plan?
2. **Business type** — B2C, B2B, e-commerce, SaaS, local business?
3. **Goal** — Friend acquisition, sales conversion, retention, customer support?
4. **Budget** — Which LINE plan? Message volume constraints?
5. **Integration** — CRM, e-commerce platform, booking system connected?

---

## LINE Official Account Plans

| Plan | Monthly Fee | Free Messages | Additional | Best For |
|------|-------------|---------------|------------|----------|
| Communication | ¥0 | 200/month | Not available | Testing, micro businesses |
| Light | ¥5,000 | 5,000/month | Not available | Small businesses, early stage |
| Standard | ¥15,000 | 30,000/month | Pay-per-message | Growing businesses |

**Message counting**: Each bubble × each recipient = 1 message. A Flex Message with 3 bubbles sent to 100 users = 300 messages. Reply messages (responding to user-initiated chat) are always free.

**Cost optimization**: Use reply messages for customer support (free), reserve push/broadcast for high-value campaigns.

---

## Friend Acquisition Strategy

### Organic Methods

| Method | Implementation | Expected Impact |
|--------|----------------|-----------------|
| QR code on-site | Display at register, on packaging, receipts, business cards | High for physical businesses |
| Website CTA | "友だち追加" button with LINE add-friend URL | Medium |
| QR code in-store signage | Poster/POP with incentive ("友だち追加で10%オフ") | High with incentive |
| Cross-promotion | Mention LINE account in email, social media, blog | Medium |
| LINE Login integration | Auto-add as friend during social login flow | High conversion |

### Paid Methods

| Method | Details |
|--------|---------|
| LINE Ads friend acquisition campaign | Cost per friend: ¥100–500 depending on industry |
| CPF (Cost Per Friend) campaign | Dedicated ad format optimized for friend adds |

### Incentive Best Practices
- Offer immediate value: coupon, exclusive content, free shipping
- Set expiry on coupon (7–14 days) to drive urgency
- Welcome message should deliver the promised incentive instantly

---

## Messaging Strategy

### Message Types

| Type | API | Cost | Use For |
|------|-----|:----:|---------|
| Reply | `/message/reply` | Free | Customer support, chatbot responses |
| Push | `/message/push` | Paid | 1:1 personalized messages |
| Multicast | `/message/multicast` | Paid | Targeted sends to up to 500 users |
| Narrowcast | `/message/narrowcast` | Paid | Segment-based campaigns (demographics, audiences) |
| Broadcast | `/message/broadcast` | Paid | All-friend announcements |

### Content Strategy

**Weekly cadence recommendation** (Standard plan, ~30K messages/month):

| Frequency | Content Type | Format |
|-----------|-------------|--------|
| 1x/week | Value content | Rich message or Flex Message with useful info |
| 2x/month | Promotion | Coupon or campaign announcement |
| As needed | Transactional | Order confirmation, shipping updates (via Reply — free) |

**Golden rules**:
- Never exceed 3–4 messages/week — high frequency causes blocks
- Deliver value before asking for conversion
- Use Flex Messages for structured content (product cards, menus, booking)
- Keep text messages under 500 characters
- Include a clear CTA in every message

### Narrowcast Segmentation

Narrowcast allows targeting by combining demographics and audiences:

**Demographic filters**:
- Gender: Male, Female
- Age groups: 15–19, 20–24, 25–29, 30–34, 35–39, 40–44, 45–49, 50+
- OS: iOS, Android
- Region: All 47 Japanese prefectures

**Audience-based filters**:
- Users who clicked a specific URL
- Users who opened a specific message
- Custom uploaded user ID lists
- Lookalike audiences

**Combination example**: Female, 25–34, Tokyo/Osaka, clicked previous campaign URL → highly targeted segment for a new product launch.

---

## Rich Menu Design

The rich menu is the persistent menu at the bottom of the chat screen. It's the primary navigation for your LINE account.

### Design Principles

- **Maximum 6 areas** per rich menu (2×3 grid is most common)
- **Tab switching**: Create multiple rich menus and switch between them (e.g., "メニュー" / "お買い物")
- **Per-user control**: Show different menus to different users (new vs. returning, member vs. non-member)

### Common Layout Patterns

**E-commerce (2×3 grid)**:
```
[  新商品  ] [  セール  ]
[  カテゴリ ] [ マイページ ]
[  お問合せ ] [ ポイント  ]
```

**SaaS / Service (2×2 grid)**:
```
[   料金プラン   ] [   使い方ガイド   ]
[  お問い合わせ  ] [   よくある質問   ]
```

**Restaurant / Local (2×3 grid)**:
```
[  今日のメニュー ] [  ご予約   ]
[  クーポン   ] [  アクセス  ]
[  テイクアウト ] [  お知らせ  ]
```

### Rich Menu Actions

| Action Type | Use For |
|------------|---------|
| URI | Open URL (website, booking page, LIFF app) |
| Message | Send a keyword that triggers chatbot response |
| Postback | Trigger backend action without visible message |
| Rich Menu Switch | Switch to another rich menu (tab navigation) |

---

## Flex Message Templates

Flex Messages are JSON-defined rich cards. Use for structured content.

### Product Card

```json
{
  "type": "bubble",
  "hero": {
    "type": "image",
    "url": "https://example.com/product.jpg",
    "size": "full",
    "aspectRatio": "20:13"
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      { "type": "text", "text": "商品名", "weight": "bold", "size": "xl" },
      { "type": "text", "text": "¥4,980", "size": "lg", "color": "#E53E3E" }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "button",
        "action": { "type": "uri", "label": "購入する", "uri": "https://example.com/buy" },
        "style": "primary"
      }
    ]
  }
}
```

### Coupon Card

```json
{
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      { "type": "text", "text": "期間限定クーポン", "weight": "bold", "size": "lg" },
      { "type": "text", "text": "全品10%OFF", "size": "xxl", "weight": "bold", "color": "#E53E3E" },
      { "type": "text", "text": "有効期限: 2026年3月31日まで", "size": "xs", "color": "#888888" }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "button",
        "action": { "type": "uri", "label": "クーポンを使う", "uri": "https://example.com/coupon" },
        "style": "primary"
      }
    ]
  }
}
```

---

## LIFF & LINE MINI App

### When to Use LIFF

| Use Case | Why LIFF? |
|----------|-----------|
| Membership card | No app install, auto-authenticated |
| Coupon / Stamp card | Track redemptions linked to LINE user ID |
| Booking / Reservation | In-LINE experience reduces friction |
| Survey / Form | Higher completion rate than external forms |
| E-commerce | Checkout within LINE |

### Implementation Notes
- LIFF apps run in LINE's in-app browser — responsive web design required
- User authentication is automatic (no login screen)
- Can access LINE user ID for CRM integration
- As of 2025, LINE MINI Apps can also run in regular web browsers (expanded reach)

---

## LINE Login Integration

### Marketing Benefits
- **Lower registration friction**: Users tap "LINEでログイン" instead of filling forms
- **Auto friend-add**: Can auto-add as LINE Official Account friend during login flow
- **ID linking**: Connect LINE user ID with internal CRM for personalized messaging
- **Email scope**: Available with pre-approval (apply in LINE Developers Console)

### Implementation Flow
1. User clicks "LINEでログイン" on your site
2. Redirect to LINE authorization URL with `bot_prompt=aggressive` (auto friend add)
3. User authenticates in LINE
4. Callback with auth code → exchange for access token
5. Get user profile (user ID, display name, avatar)
6. Link LINE user ID to your CRM record

---

## Analytics & Optimization

### Key Metrics

| Metric | Source | Benchmark |
|--------|--------|-----------|
| Friend count (net) | Insight API `/followers` | Track weekly trend |
| Block rate | Insight API `/followers` | Keep under 20% |
| Message open rate | Insight API `/message/event` | 60–80% is good |
| Click-through rate | Insight API `/message/event` | 5–15% is good |
| Message-to-conversion | LINE Tag + GA4 | Varies by industry |

### Reducing Block Rate
- Don't send more than 3–4 messages/week
- Segment your audience — irrelevant messages cause blocks
- Provide value in every message, not just promotions
- Offer frequency preferences ("週1回" / "月2回" options)
- Analyze which message types correlate with block spikes

### A/B Testing Messages
- Use multicast to split test (send variant A to 50% of segment, variant B to 50%)
- Test: message timing, Flex vs. text, CTA wording, image variations
- Measure: open rate, click rate, conversion rate
- Wait 48 hours before evaluating results

---

## LY Ads Unification (Spring 2026)

LINE Ads and Yahoo Display Ads are merging into "LY Ads Display Ads":
- Unified ad management platform
- Combined targeting data (LINE + PayPay + Yahoo behavioral data)
- If using LINE Ads Conversion API, plan migration to new unified API
- Monitor announcements at [LINEヤフー for Business](https://www.lycbiz.com/jp/)

---

## Output Format

When creating a LINE marketing plan:

```markdown
# LINE Official Account Strategy: [Business Name]

## Account Setup
- Plan: [Communication / Light / Standard]
- Monthly message budget: [N messages]
- Rich menu layout: [description]

## Friend Acquisition
- Target: [N friends by date]
- Methods: [list channels and incentives]

## Messaging Calendar
| Week | Content | Format | Segment | Goal |
|------|---------|--------|---------|------|

## Automation
- Welcome message: [content]
- Chatbot responses: [trigger keywords and responses]
- Transactional messages: [order confirmation, etc.]

## KPIs
| Metric | Target | Current |
|--------|--------|---------|
```

---

## Discovery Questions

1. Do you have a LINE Official Account already? What plan?
2. How many LINE friends do you have? What's your block rate?
3. What's your primary goal — acquisition, engagement, or conversion?
4. What CRM or e-commerce platform do you use?
5. Do you have a chatbot or automated responses set up?
6. How often are you currently sending messages?
7. Is your customer base primarily in Japan?

---

## Tool Integrations

| Tool | Best For | Guide |
|------|----------|-------|
| **LINE Messaging API** | Message sending, insights, audience management | [line.md](../../tools/integrations/line.md) |
| **GA4** | Cross-channel attribution for LINE traffic | [ga4.md](../../tools/integrations/ga4.md) |

---

## Related Skills

- **ad-campaign-ops** — LINE Ads campaign setup and optimization
- **ga4-measurement** — LINE Tag deployment via GTM
- **ga4-analysis** — Analyze LINE-driven traffic and conversions in GA4
