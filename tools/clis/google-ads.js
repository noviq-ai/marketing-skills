#!/usr/bin/env node

const ACCESS_TOKEN = process.env.GOOGLE_ADS_TOKEN
const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID
const BASE_URL = 'https://googleads.googleapis.com'
const API_VERSION = 'v19'

if (!ACCESS_TOKEN || !DEVELOPER_TOKEN || !CUSTOMER_ID) {
  console.error(JSON.stringify({
    error: 'Required environment variables: GOOGLE_ADS_TOKEN, GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CUSTOMER_ID'
  }))
  process.exit(1)
}

function parseArgs(argv) {
  const result = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const next = argv[i + 1]
      if (next && !next.startsWith('--')) {
        result[key] = next
        i++
      } else {
        result[key] = true
      }
    } else {
      result._.push(arg)
    }
  }
  return result
}

const args = parseArgs(process.argv.slice(2))
const [cmd, sub, ...rest] = args._
const customerId = (args.customer || CUSTOMER_ID).replace(/-/g, '')

async function api(method, path, body) {
  const url = `${BASE_URL}/${API_VERSION}/customers/${customerId}${path}`

  if (args['dry-run']) {
    return {
      _dry_run: true,
      method,
      url,
      headers: {
        Authorization: 'Bearer ***',
        'developer-token': '***'
      },
      body: body || undefined
    }
  }

  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'developer-token': DEVELOPER_TOKEN,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { status: res.status, body: text }
  }
}

async function search(query) {
  return api('POST', '/googleAds:search', {
    query,
    pageSize: parseInt(args.limit) || 100
  })
}

async function main() {
  let result

  switch (cmd) {
    case 'query': {
      if (!args.gaql) { result = { error: '--gaql required. Provide a GAQL query string.' }; break }
      result = await search(args.gaql)
      break
    }

    case 'campaigns':
      switch (sub) {
        case 'list': {
          result = await search(
            'SELECT campaign.id, campaign.name, campaign.status, campaign.bidding_strategy_type, ' +
            'campaign_budget.amount_micros, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions ' +
            'FROM campaign ' +
            `WHERE segments.date DURING ${args.period || 'LAST_30_DAYS'} ` +
            'ORDER BY metrics.cost_micros DESC ' +
            `LIMIT ${args.limit || 20}`
          )
          break
        }
        case 'performance': {
          result = await search(
            'SELECT campaign.name, segments.date, metrics.impressions, metrics.clicks, ' +
            'metrics.cost_micros, metrics.conversions, metrics.conversions_value ' +
            'FROM campaign ' +
            `WHERE segments.date DURING ${args.period || 'LAST_30_DAYS'} ` +
            `AND campaign.status = 'ENABLED' ` +
            'ORDER BY segments.date DESC'
          )
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand', available: ['list', 'performance'] }
      }
      break

    case 'keywords':
      switch (sub) {
        case 'list': {
          result = await search(
            'SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ' +
            'ad_group_criterion.status, ad_group.name, ' +
            'metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros ' +
            'FROM keyword_view ' +
            `WHERE segments.date DURING ${args.period || 'LAST_30_DAYS'} ` +
            'ORDER BY metrics.conversions DESC ' +
            `LIMIT ${args.limit || 50}`
          )
          break
        }
        case 'search-terms': {
          result = await search(
            'SELECT search_term_view.search_term, search_term_view.status, ' +
            'metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros ' +
            'FROM search_term_view ' +
            `WHERE segments.date DURING ${args.period || 'LAST_30_DAYS'} ` +
            'ORDER BY metrics.impressions DESC ' +
            `LIMIT ${args.limit || 100}`
          )
          break
        }
        default:
          result = { error: 'Unknown keywords subcommand', available: ['list', 'search-terms'] }
      }
      break

    case 'ads':
      switch (sub) {
        case 'list': {
          result = await search(
            'SELECT ad_group_ad.ad.id, ad_group_ad.ad.type, ad_group_ad.status, ad_group.name, ' +
            'metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros ' +
            'FROM ad_group_ad ' +
            `WHERE segments.date DURING ${args.period || 'LAST_30_DAYS'} ` +
            `AND ad_group_ad.status = 'ENABLED' ` +
            'ORDER BY metrics.impressions DESC ' +
            `LIMIT ${args.limit || 20}`
          )
          break
        }
        default:
          result = { error: 'Unknown ads subcommand', available: ['list'] }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          query: 'query --gaql "<GAQL query string>"',
          campaigns: 'campaigns [list|performance] [--period LAST_30_DAYS] [--limit 20]',
          keywords: 'keywords [list|search-terms] [--period LAST_30_DAYS] [--limit 50]',
          ads: 'ads list [--period LAST_30_DAYS] [--limit 20]'
        },
        periods: 'LAST_7_DAYS, LAST_14_DAYS, LAST_30_DAYS, LAST_90_DAYS, THIS_MONTH, LAST_MONTH',
        flags: '--dry-run to preview, --customer <id> to override customer ID'
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
