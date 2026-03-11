# LINE Platform

Japan's dominant messaging platform (95M+ MAU). Covers official account messaging, ads, conversion tracking, social login, and mini apps. Essential for any Japan-market marketing stack.

## Integration Methods

| Method | Available | Notes |
|--------|-----------|-------|
| Messaging API | ✓ | Push, broadcast, narrowcast, rich menus, Flex Messages, audience management, insights |
| Ads API | ✓ | Campaign/ad group/ad CRUD, reporting. Requires certified partner access |
| CLI | ✓ | `tools/clis/line.js` — Messaging API operations |
| LINE Tag | ✓ | JavaScript tag for conversion tracking (similar to Meta Pixel) |
| LINE Login | ✓ | OAuth 2.0 / OpenID Connect social login |
| LIFF | ✓ | Mini web apps running inside LINE browser |

## Authentication

### Messaging API
- **Type**: Channel Access Token (Bearer token)
- **CLI env var**: `LINE_CHANNEL_ACCESS_TOKEN`
- **How to get**: LINE Developers Console > Channel > Messaging API settings
- **Token types**:

| Type | Expiry | Use For |
|------|--------|---------|
| Stateless | 15 min | Production (issue per request via JWT) |
| v2.1 | Up to 30 days | Production (configurable expiry via JWT) |
| Short-lived | 30 days | Development |
| Long-lived | Never | Testing only (security risk) |

### Ads API
- **Type**: JWS (JSON Web Signature) request signing
- **Access**: Certified Ad Tech Partner only
- **Keys**: Access Key + Secret Key from LINE Ads Manager group settings

## API Base URLs

```
Messaging API:  https://api.line.me/v2/bot/
LINE Login:     https://api.line.me/oauth2/v2.1/
LINE Ads:       https://ads.line.me/api/v3/
```

## Messaging API — Key Endpoints

### Message Sending

| Endpoint | Method | Description | Rate Limit | Billable? |
|----------|--------|-------------|------------|:---------:|
| `/message/reply` | POST | Reply to webhook event | - | No |
| `/message/push` | POST | Send to one user | 2,000/sec | Yes |
| `/message/multicast` | POST | Send to multiple users (max 500) | 2,000/sec | Yes |
| `/message/broadcast` | POST | Send to all followers | 60/hour | Yes |
| `/message/narrowcast` | POST | Send to audience/demographic segment | 60/hour | Yes |

### Narrowcast Targeting

Narrowcast supports AND/OR/NOT combinations of:
- **Demographics**: Gender, age (15-19, 20-24, ..., 50+), OS (iOS/Android), region (all 47 prefectures)
- **Audiences**: Custom audiences created from user IDs, click/impression retargeting

### Insights & Analytics

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/insight/followers?date=YYYYMMDD` | GET | Follower count (added, blocked, net) |
| `/insight/demographic` | GET | Follower demographics (gender, age, region, OS) |
| `/insight/message/delivery?date=YYYYMMDD` | GET | Message delivery counts by date |
| `/insight/message/event?requestId=` | GET | Message interaction stats (opens, clicks) |

**Note**: Message event stats are only collected for 14 days after send.

### Audience Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/audienceGroup/upload` | POST | Create audience from user IDs |
| `/audienceGroup/list` | GET | List all audiences |
| `/audienceGroup/{id}` | GET | Get audience details |

### Rich Menu

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/richmenu` | POST | Create rich menu |
| `/richmenu/list` | GET | List all rich menus |
| `/user/all/richmenu` | GET | Get default rich menu |
| `/user/{userId}/richmenu/{richMenuId}` | POST | Link rich menu to user |

## LINE Tag (Conversion Tracking)

Three code components — all placed in `<head>`:

| Code | Where | Purpose |
|------|-------|---------|
| **Base Code** | All tracked pages | Foundation — required for other codes to work |
| **Conversion Code** | Thank-you / completion pages | Track purchases, signups, form submissions |
| **Custom Event Code** | Any page | Label visitors for audience creation (retargeting) |

**Setup**: LINE Ads Manager > Report & Measurement > Tracking (LINE Tag)

Can also be deployed via GTM (see `ga4-measurement` skill for GTM patterns).

## LINE Ads API — Key Resources

Requires certified partner access. Base URL: `https://ads.line.me/api/v3/`

| Resource | Operations |
|----------|-----------|
| Campaign | CRUD |
| Ad Group | CRUD |
| Ad | CRUD |
| Media | CRUD + Upload (images/video) |
| Report | CSV download |
| OnlineReport | JSON real-time data |
| Custom Audience | Management |
| Custom Conversion | Management |
| Simulation | Delivery forecast |

## LINE Login

OAuth 2.0 authorization flow for social login:

1. Redirect to `https://access.line.me/oauth2/v2.1/authorize`
2. User authenticates with LINE
3. Callback with authorization code
4. Exchange code for access token

**Scopes**: `profile` (user ID, name, avatar), `openid` (ID token), `email` (requires pre-approval in LINE Developers Console)

**Marketing use**: Lower registration friction, link LINE user ID with internal CRM for personalized messaging.

## LIFF (LINE Front-end Framework)

Web apps that run inside LINE's in-app browser:
- Auto-authenticated (no login required)
- No app install needed
- Access to LINE APIs (QR scan, share, send message)
- Use cases: loyalty cards, coupons, e-commerce, booking systems

## Pricing (LINE Official Account)

| Plan | Monthly Fee | Free Messages | Additional |
|------|-------------|---------------|------------|
| Communication | ¥0 | 200/month | Not available |
| Light | ¥5,000 | 5,000/month | Not available |
| Standard | ¥15,000 | 30,000/month | Pay-per-message |

**Counting**: Each message bubble counts as 1 message × number of recipients. Reply messages are free.

## CLI Usage

```bash
# Send push message
node tools/clis/line.js message push --to U1234567890abcdef --text "キャンペーンのお知らせ"

# Broadcast to all followers
node tools/clis/line.js message broadcast --text "セール開始のお知らせ"

# Check message quota
node tools/clis/line.js message quota
node tools/clis/line.js message quota-consumption

# Follower insights (yesterday)
node tools/clis/line.js insight followers

# Follower demographics
node tools/clis/line.js insight demographic

# Delivery stats
node tools/clis/line.js insight delivery --date 20260310

# Message interaction stats
node tools/clis/line.js insight message-event --request-id abc123

# List audiences
node tools/clis/line.js audience list

# List rich menus
node tools/clis/line.js richmenu list

# Get user profile
node tools/clis/line.js profile --id U1234567890abcdef

# Dry run
node tools/clis/line.js message push --to U123 --text "test" --dry-run
```

## LY Ads Unification (Spring 2026)

LINE Ads and Yahoo Display Ads are merging into "LY Ads Display Ads":
- Unified ad management platform
- LINE Ads Conversion API users will need to migrate to YDA's new Conversion API
- Details to be announced 2 months before launch
- Plan migration strategy now if running both platforms

## Related Skills

- **line-engagement** — LINE Official Account marketing strategy
- **ad-campaign-ops** — Paid advertising including LINE Ads
- **ga4-measurement** — GTM setup for LINE Tag deployment
