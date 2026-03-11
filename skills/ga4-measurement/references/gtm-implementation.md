# GTM Implementation Guide

How to implement analytics tracking through Google Tag Manager. Covers container setup, data layer patterns, common tag configurations, and debugging workflow.

## When to Use GTM vs gtag.js

| Scenario | Recommendation |
|----------|----------------|
| Solo developer, simple site | gtag.js is fine |
| Marketing team needs to add/change tags | GTM — no code deploys needed |
| Multiple ad pixels (Meta, LINE, TikTok) | GTM — manage all in one place |
| Need consent-based tag firing | GTM — built-in consent integration |
| Complex trigger logic | GTM — visual trigger builder |

---

## Container Setup

### Install GTM

```html
<!-- Place as high in <head> as possible -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>

<!-- Place immediately after opening <body> -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### Container Components

| Component | What It Does |
|-----------|-------------|
| **Tags** | Code that runs when triggered (GA4 events, ad pixels, custom HTML) |
| **Triggers** | Conditions that cause tags to fire (page view, click, form submit, custom event) |
| **Variables** | Dynamic values used in tags and triggers (data layer values, click text, URL path) |

---

## Naming Conventions

Consistent naming prevents confusion as containers grow. Use this format:

```
[Type] - [Platform] - [Description]

Tags:
  Tag - GA4 - Config
  Tag - GA4 - Event - Signup Completed
  Tag - GA4 - Event - Purchase
  Tag - Meta - Pixel Base
  Tag - LINE - Tag Base

Triggers:
  Trigger - Click - CTA Button
  Trigger - Submit - Contact Form
  Trigger - Custom - signup_completed
  Trigger - PageView - Pricing Page

Variables:
  Var - DL - form_name
  Var - DL - user_id
  Var - JS - Current URL Path
  Var - Const - GA4 Measurement ID
```

---

## Data Layer

The data layer is the bridge between your site's code and GTM.

### Initialize

```javascript
// Place in <head> BEFORE the GTM snippet
window.dataLayer = window.dataLayer || [];
```

### Page-Level Data

```javascript
// Set on page load, before GTM container loads
dataLayer.push({
  pageType: 'product',
  contentGroup: 'plans',
  user: {
    loggedIn: true,
    userId: 'usr_12345',
    userType: 'paid',
    plan: 'pro'
  }
});
```

### Custom Events

```javascript
// Form submission
dataLayer.push({
  event: 'form_submitted',
  form_name: 'contact',
  form_location: 'footer'
});

// CTA click
dataLayer.push({
  event: 'cta_clicked',
  cta_text: 'Start Free Trial',
  cta_location: 'hero'
});

// Purchase (JPY)
dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T-20260311-001',
    value: 4980,
    currency: 'JPY',
    items: [{
      item_id: 'PLAN-PRO',
      item_name: 'Pro Monthly',
      price: 4980,
      quantity: 1
    }]
  }
});
```

**Always clear ecommerce object** before pushing a new ecommerce event to prevent stale data.

---

## Common Tag Configurations

### GA4 Configuration Tag

| Setting | Value |
|---------|-------|
| Tag Type | Google Analytics: GA4 Configuration |
| Measurement ID | G-XXXXXXXXXX (use a Constant variable) |
| Send page view | Yes |
| User Properties | Add user-scoped dimensions here |
| Trigger | All Pages |

### GA4 Event Tag

| Setting | Value |
|---------|-------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | Select your GA4 config tag |
| Event Name | Use data layer variable or hardcode |
| Event Parameters | Map data layer variables to parameter names |
| Trigger | Custom Event matching your `event` name |

### Meta Pixel — Base

| Setting | Value |
|---------|-------|
| Tag Type | Custom HTML |
| Trigger | All Pages |

```html
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### LINE Tag — Base

| Setting | Value |
|---------|-------|
| Tag Type | Custom HTML |
| Trigger | All Pages |

```html
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
```

---

## Preview and Debug

### Using Preview Mode

1. Click **Preview** in GTM workspace
2. Enter your site URL
3. Debug panel opens at bottom of your site

### What to Verify

| Check | Where |
|-------|-------|
| Which tags fired | "Tags Fired" section for each event |
| Why a tag didn't fire | "Tags Not Fired" — shows unmet trigger conditions |
| Variable values | "Variables" tab — verify data layer values |
| Data layer state | "Data Layer" tab — see full object at each event |

### Common Debug Issues

| Problem | Solution |
|---------|----------|
| Tag not firing | Check trigger conditions. Is the data layer event name an exact match? |
| Variable returns `undefined` | Check data layer path. Nested objects need dot notation: `user.userId` |
| Tag fires multiple times | Check trigger — is it set to "All Custom Events" instead of a specific one? |
| Preview not connecting | Clear browser cache. Disable ad blockers. Try incognito mode |

---

## Version Management

### Before Publishing

1. Use **Preview** to test all changes on your live site
2. Review the "Changes" summary in your workspace
3. Give the version a descriptive name and notes

### Version Naming

```
v12: Add signup and purchase conversion tracking
- New: Tag - GA4 - Event - Signup Completed
- New: Tag - GA4 - Event - Purchase
- New: Trigger - Custom - signup_completed
- New: Trigger - Custom - purchase
- Tested on: Chrome, Safari, iOS Safari, Android Chrome
```

### Workspace Strategy

- **Default Workspace** — production changes, one person at a time
- **Feature Workspaces** — for large changes (new pixel integration, consent implementation)
- Merge feature workspace when tested and approved

---

## Consent Integration

### Consent Mode Setup

```javascript
// Set BEFORE GTM loads
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Default: deny until user consents
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
```

### Update on User Consent

```javascript
// Call when user accepts cookies
function acceptAllCookies() {
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'
  });
}

// Call when user accepts only analytics
function acceptAnalyticsOnly() {
  gtag('consent', 'update', {
    analytics_storage: 'granted'
  });
}
```

### GTM Consent Overview

1. Enable **Consent Overview** in GTM Admin
2. For each tag, set which consent types are required
3. Tags automatically respect the consent state — no trigger changes needed

### Japan-Specific Notes

- Cookie consent banners are **not legally required** for basic GA4 analytics in Japan
- **Required** if you use Google Ads remarketing audiences built from GA4 data
- **Required** if you operate under the Telecommunications Business Act and use ad tracking pixels
- Even when not required, Consent Mode helps GA4 model conversions from users who deny cookies
