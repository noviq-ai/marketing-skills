# Event Library

Comprehensive event catalog organized by business type. Use this as a starting point — select only the events that tie to real business decisions.

## Marketing Site Events

### Engagement

| Event | Properties | Notes |
|-------|------------|-------|
| page_view | page_title, page_location, content_group | Automatic via enhanced measurement |
| scroll_depth | depth (25, 50, 75, 100) | Enhanced measurement handles 90% threshold |
| outbound_link_clicked | link_url, link_text | Automatic via enhanced measurement |
| video_played | video_id, video_title, duration | YouTube only via enhanced measurement |
| video_completed | video_id, video_title | YouTube only via enhanced measurement |
| file_downloaded | file_name, file_extension | Automatic via enhanced measurement |

### CTA and Form Interactions

| Event | Properties | Notes |
|-------|------------|-------|
| cta_clicked | button_text, cta_location, page | Track location to compare placement effectiveness |
| form_started | form_name, form_location | Identifies form abandonment |
| form_field_completed | form_name, field_name | Pinpoints friction fields |
| form_submitted | form_name, form_location | Key conversion event |
| form_error | form_name, error_type, field_name | Diagnose UX issues |

### Conversion Events

| Event | Properties | Notes |
|-------|------------|-------|
| signup_started | source, page | Top of signup funnel |
| signup_completed | method, plan, source | Mark as conversion |
| demo_requested | company_size, source | High-intent B2B signal |
| contact_submitted | inquiry_type | General lead capture |
| newsletter_subscribed | source, list_name | Email list growth |
| trial_started | plan, source | SaaS trial funnel |
| resource_downloaded | resource_name, resource_type | Content marketing lead gen |

---

## SaaS Product Events

### Onboarding

| Event | Properties | Notes |
|-------|------------|-------|
| onboarding_started | — | Measures onboarding entry rate |
| onboarding_step_completed | step_number, step_name | Find drop-off points |
| onboarding_completed | steps_completed, time_to_complete | Completion rate baseline |
| onboarding_skipped | step_skipped_at | Identifies low-value steps |
| first_key_action_completed | action_type | Aha moment — critical activation metric |

### Core Usage

| Event | Properties | Notes |
|-------|------------|-------|
| feature_used | feature_name, feature_category | Feature adoption tracking |
| action_completed | action_type, count | Core value delivery |
| content_created | content_type | User-generated content |
| search_performed | query, results_count | In-app search quality |
| settings_changed | setting_name | Configuration engagement |
| invite_sent | invite_type, count | Viral loop trigger |

### Errors and Support

| Event | Properties | Notes |
|-------|------------|-------|
| error_occurred | error_type, error_message, page | Track UX friction |
| help_opened | help_type, page | Identifies confusing areas |
| support_contacted | contact_method, issue_type | Support volume driver |

---

## Monetization Events

### Pricing and Checkout

| Event | Properties | Notes |
|-------|------------|-------|
| pricing_viewed | source | Pricing page interest signal |
| plan_selected | plan_name, billing_cycle | Pre-checkout intent |
| checkout_started | plan, value, currency | Checkout funnel entry |
| payment_info_entered | payment_method | Payment friction point |
| purchase_completed | plan, value, currency, transaction_id | Mark as conversion. Use `JPY` and integer values |
| purchase_failed | error_reason, plan | Revenue loss diagnosis |

### Subscription Lifecycle

| Event | Properties | Notes |
|-------|------------|-------|
| trial_started | plan, trial_length | Trial funnel entry |
| trial_ended | plan, converted | Trial-to-paid conversion |
| subscription_upgraded | from_plan, to_plan, value | Expansion revenue |
| subscription_downgraded | from_plan, to_plan | Contraction signal |
| subscription_cancelled | plan, reason, tenure | Churn analysis |
| subscription_renewed | plan, value | Retention confirmation |

---

## E-commerce Events

Use Google's recommended event names to unlock built-in reports and AI modeling.

### Browsing

| Event | Properties | Notes |
|-------|------------|-------|
| view_item | item_id, item_name, category, price, currency | Google recommended event |
| view_item_list | list_name, items[] | Category/collection views |
| select_item | item_id, item_name, item_list_name | Click from a list |

### Cart

| Event | Properties | Notes |
|-------|------------|-------|
| add_to_cart | item_id, item_name, price, quantity, currency | Google recommended event |
| remove_from_cart | item_id, item_name, price, quantity | Cart modification |
| view_cart | value, currency, items[] | Cart review step |

### Checkout

| Event | Properties | Notes |
|-------|------------|-------|
| begin_checkout | value, currency, items[] | Google recommended event |
| add_shipping_info | shipping_tier, value, currency | Shipping step |
| add_payment_info | payment_type, value, currency | Payment step |
| purchase | transaction_id, value, currency, tax, shipping, items[] | Google recommended event. Use `JPY`, integer values |

### Post-Purchase

| Event | Properties | Notes |
|-------|------------|-------|
| refund | transaction_id, value, currency | Partial or full refund |
| review_submitted | item_id, rating | Social proof generation |

---

## B2B / SaaS-Specific Events

### Team and Collaboration

| Event | Properties | Notes |
|-------|------------|-------|
| team_created | team_size, plan | Account expansion |
| team_member_invited | role | Viral growth signal |
| team_member_joined | role | Invitation conversion |
| role_changed | old_role, new_role | Org adoption depth |

### Integrations

| Event | Properties | Notes |
|-------|------------|-------|
| integration_connected | integration_name | Stickiness driver |
| integration_disconnected | integration_name, reason | Churn risk signal |

### Account Events

| Event | Properties | Notes |
|-------|------------|-------|
| account_created | source, plan | New account acquisition |
| account_upgraded | from_plan, to_plan | Expansion revenue |
| account_churned | reason, tenure, mrr_lost | Churn for revenue analysis |
| account_reactivated | previous_tenure, new_plan | Win-back success |

---

## Funnel Sequences

### Signup Funnel
1. signup_started → 2. signup_step_completed (×N) → 3. signup_completed → 4. onboarding_started

### Purchase Funnel (SaaS)
1. pricing_viewed → 2. plan_selected → 3. checkout_started → 4. payment_info_entered → 5. purchase_completed

### E-commerce Funnel
1. view_item → 2. add_to_cart → 3. view_cart → 4. begin_checkout → 5. add_shipping_info → 6. add_payment_info → 7. purchase

---

## Event Budget Guidelines

GA4 allows 500 distinct event names per property. Recommended allocation:

| Category | Budget | Rationale |
|----------|--------|-----------|
| Enhanced measurement (auto) | ~8 | Built-in, no cost |
| Marketing site conversions | 5–10 | Core business metrics |
| Product usage | 10–15 | Retention and activation |
| Monetization | 5–8 | Revenue tracking |
| Debugging/temporary | 2–5 | Remove after validation |
| **Total** | **30–46** | Stay well under 500 |
