# GA4 Implementation Guide

Step-by-step guide for implementing GA4 tracking, with attention to Japan-specific considerations.

## Initial Setup

### Data Stream Configuration

1. Create a GA4 property in Google Analytics admin
2. Add a web data stream with your domain
3. Copy the Measurement ID (`G-XXXXXXXXXX`)
4. Set data retention to **14 months** (Admin > Data Settings > Data Retention)
5. Enable **Google Signals** if you need cross-device reporting (requires consent for ad personalization)

### Enhanced Measurement

Enable these in Admin > Data Streams > [your stream] > Enhanced Measurement:

| Feature | What It Tracks | Recommendation |
|---------|---------------|----------------|
| Page views | Every page load | Always on |
| Scrolls | 90% scroll depth | On — useful for content pages |
| Outbound clicks | Clicks to external domains | On |
| Site search | Search queries (`q`, `s`, `search` params) | On — configure custom param if needed |
| Video engagement | YouTube embedded video play/progress/complete | On if you use YouTube embeds |
| File downloads | PDF, XLSX, DOCX, etc. | On |

### Install gtag.js

```html
<!-- Place in <head> before any other scripts -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Or use GTM (recommended for teams that need flexibility without code deploys).

---

## Custom Events

### Basic Event

```javascript
gtag('event', 'signup_completed', {
  method: 'email',
  plan: 'free',
  source: 'homepage_hero'
});
```

### Event with Monetary Value (JPY)

```javascript
gtag('event', 'purchase', {
  transaction_id: 'T-20260311-001',
  value: 4980,
  currency: 'JPY',
  items: [{
    item_id: 'PLAN-PRO',
    item_name: 'Pro Monthly',
    price: 4980,
    quantity: 1
  }]
});
```

**Important for JPY**: Use integer values (no decimals). `4980` not `49.80`.

### User Properties

```javascript
// Set once per session or on login
gtag('set', 'user_properties', {
  user_type: 'paid',
  plan_name: 'pro',
  company_size: 'smb'
});

// Set user ID for cross-device
gtag('config', 'G-XXXXXXXXXX', {
  user_id: 'USER_12345'
});
```

---

## Conversions

### Marking Events as Conversions

1. Go to Admin > Events
2. Toggle the conversion switch for your key events
3. Choose counting method:
   - **Once per session** — for leads, signups, demo requests
   - **Every event** — for purchases, transactions

### Recommended Conversions

| Event | Counting | Business Value |
|-------|----------|----------------|
| signup_completed | Once per session | New user acquisition |
| demo_requested | Once per session | Sales pipeline |
| purchase_completed | Every event | Revenue |
| trial_started | Once per session | Trial funnel entry |

### Import to Google Ads

Link GA4 to Google Ads (Admin > Product Links), then import conversions for Smart Bidding optimization.

---

## Custom Dimensions and Metrics

### When to Create Them

Create a custom dimension when you need to **filter or segment** reports by a value that isn't built-in.

### Setup

Admin > Data Display > Custom Definitions > Create Custom Dimension

| Scope | Use For | Example |
|-------|---------|---------|
| Event | Per-event attributes | content_type, form_name |
| User | Per-user attributes | plan_type, user_role |
| Item | Per-product attributes | product_category, brand |

**Parameter name must exactly match** the parameter you send in your events.

### Recommended Custom Dimensions

| Dimension | Scope | Parameter | Purpose |
|-----------|-------|-----------|---------|
| User Type | User | user_type | Segment free vs paid |
| Plan Name | User | plan_name | Revenue analysis by plan |
| Content Author | Event | author | Blog content performance |
| Form Name | Event | form_name | Form conversion analysis |

---

## Audiences

### Creating Audiences

Admin > Data Display > Audiences > New Audience

### High-Value Audience Examples

**Pricing page visitors who didn't convert:**
- Include: `page_view` where `page_location` contains `/pricing`
- Exclude: `signup_completed` or `purchase`
- Lookback: 7 days

**Engaged trial users:**
- Include: `feature_used` count ≥ 3
- Include: `session_start` count ≥ 3
- Membership duration: 14 days

**Purchasers (for exclusion or lookalike):**
- Include: `purchase` event
- Use for Google Ads audience export

---

## Debugging

### Enable Debug Mode

**Option 1 — URL parameter:**
Add `?debug_mode=true` to any page

**Option 2 — gtag config:**
```javascript
gtag('config', 'G-XXXXXXXXXX', { debug_mode: true });
```

**Option 3 — Chrome extension:**
Install "Google Analytics Debugger"

### DebugView

Navigate to Admin > Data Display > DebugView to see events streaming in real-time from debug-enabled sessions.

### Troubleshooting

| Problem | Diagnosis |
|---------|-----------|
| No events in DebugView | Is debug_mode enabled? Is gtag/GTM loading? Check ad blockers |
| Events appear but parameters are empty | Custom dimension not created, or parameter name doesn't match |
| Events in DebugView but not in reports | Wait 24–48 hours for processing. Check data filters |
| Conversion count is wrong | Check counting method (once vs every). Check if event name matches exactly |

---

## Data Quality

### Internal Traffic Filters

Admin > Data Streams > [stream] > Configure Tag Settings > Define Internal Traffic

1. Create a rule with your office IP ranges
2. Go to Admin > Data Settings > Data Filters
3. Activate the internal traffic filter (test in "Testing" state first)

### Cross-Domain Tracking

If your site spans multiple domains (e.g. `example.com` and `app.example.com`):

1. Admin > Data Streams > [stream] > Configure Tag Settings
2. Add all domains under "Configure your domains"
3. Sessions will be preserved across domains

### Session Settings

- Default timeout: 30 minutes (usually fine)
- Engaged session: 10 seconds (consider increasing to 30s for content-heavy sites)

---

## Google Ads Integration

### Linking

1. Admin > Product Links > Google Ads Links
2. Link your Google Ads account
3. Enable auto-tagging in Google Ads settings
4. Import GA4 conversions into Google Ads

### Audience Export

GA4 audiences automatically sync to linked Google Ads accounts for:
- Remarketing campaigns
- Customer Match
- Similar audiences (Performance Max)

### Ad Cost Import (2025+)

GA4 now imports cost data automatically from Meta, TikTok, Pinterest, Snap, and Reddit. Set up in Admin > Product Links > [Platform] Links. Enables cross-channel CPA and ROAS in GA4 reports.

---

## Japan Compliance Checklist

- [ ] Privacy policy lists GA4 as an external data transmission destination
- [ ] If telecommunications business: external transmission disclosure is published
- [ ] If using Google Ads remarketing audiences: cookie consent banner is implemented
- [ ] Consent Mode configured if running Google Ads (recommended even if not legally required in Japan)
- [ ] No PII in any event properties
- [ ] Data retention set appropriately (14 months max)
- [ ] Internal traffic filter active
