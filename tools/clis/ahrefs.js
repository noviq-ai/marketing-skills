#!/usr/bin/env node

const API_KEY = process.env.AHREFS_API_KEY
const BASE_URL = 'https://api.ahrefs.com/v3'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'AHREFS_API_KEY environment variable required' }))
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

async function api(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, v)
  })

  if (args['dry-run']) {
    return {
      _dry_run: true,
      method: 'GET',
      url: url.toString().replace(API_KEY, '***'),
      headers: { Authorization: 'Bearer ***' }
    }
  }

  const res = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  })
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { status: res.status, body: text }
  }
}

async function main() {
  let result

  switch (cmd) {
    case 'site-explorer':
      switch (sub) {
        case 'overview': {
          if (!args.target) { result = { error: '--target required' }; break }
          result = await api('/site-explorer/overview', {
            target: args.target,
            country: args.country,
            mode: args.mode || 'domain'
          })
          break
        }
        case 'backlinks': {
          if (!args.target) { result = { error: '--target required' }; break }
          result = await api('/site-explorer/backlinks', {
            target: args.target,
            limit: args.limit || 20,
            mode: args.mode || 'domain',
            order_by: args['order-by'] || 'domain_rating:desc'
          })
          break
        }
        case 'broken-backlinks': {
          if (!args.target) { result = { error: '--target required' }; break }
          result = await api('/site-explorer/broken-backlinks', {
            target: args.target,
            limit: args.limit || 20,
            mode: args.mode || 'domain'
          })
          break
        }
        case 'referring-domains': {
          if (!args.target) { result = { error: '--target required' }; break }
          result = await api('/site-explorer/referring-domains', {
            target: args.target,
            limit: args.limit || 20,
            mode: args.mode || 'domain',
            order_by: args['order-by'] || 'domain_rating:desc'
          })
          break
        }
        case 'anchors': {
          if (!args.target) { result = { error: '--target required' }; break }
          result = await api('/site-explorer/anchors', {
            target: args.target,
            limit: args.limit || 20,
            mode: args.mode || 'domain'
          })
          break
        }
        case 'organic-keywords': {
          if (!args.target) { result = { error: '--target required' }; break }
          result = await api('/site-explorer/organic-keywords', {
            target: args.target,
            country: args.country || 'jp',
            limit: args.limit || 20,
            mode: args.mode || 'domain'
          })
          break
        }
        case 'top-pages': {
          if (!args.target) { result = { error: '--target required' }; break }
          result = await api('/site-explorer/top-pages', {
            target: args.target,
            country: args.country || 'jp',
            limit: args.limit || 20,
            mode: args.mode || 'domain'
          })
          break
        }
        default:
          result = {
            error: 'Unknown site-explorer subcommand',
            available: ['overview', 'backlinks', 'broken-backlinks', 'referring-domains', 'anchors', 'organic-keywords', 'top-pages']
          }
      }
      break

    case 'keywords':
      switch (sub) {
        case 'overview': {
          if (!args.keyword) { result = { error: '--keyword required' }; break }
          result = await api('/keywords-explorer/overview', {
            keyword: args.keyword,
            country: args.country || 'jp'
          })
          break
        }
        case 'volume-history': {
          if (!args.keyword) { result = { error: '--keyword required' }; break }
          result = await api('/keywords-explorer/volume-history', {
            keyword: args.keyword,
            country: args.country || 'jp'
          })
          break
        }
        case 'metrics-by-country': {
          if (!args.keyword) { result = { error: '--keyword required' }; break }
          result = await api('/keywords-explorer/metrics-by-country', {
            keyword: args.keyword
          })
          break
        }
        default:
          result = {
            error: 'Unknown keywords subcommand',
            available: ['overview', 'volume-history', 'metrics-by-country']
          }
      }
      break

    case 'serp':
      switch (sub) {
        case 'overview': {
          if (!args.keyword) { result = { error: '--keyword required' }; break }
          result = await api('/serp-overview/serp', {
            keyword: args.keyword,
            country: args.country || 'jp'
          })
          break
        }
        default:
          result = {
            error: 'Unknown serp subcommand',
            available: ['overview']
          }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          'site-explorer': 'site-explorer [overview|backlinks|broken-backlinks|referring-domains|anchors|organic-keywords|top-pages] --target <domain> [--country <code>] [--limit <n>]',
          'keywords': 'keywords [overview|volume-history|metrics-by-country] --keyword <term> [--country <code>]',
          'serp': 'serp overview --keyword <term> [--country <code>]'
        },
        flags: '--dry-run to preview request without sending'
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
