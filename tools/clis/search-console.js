#!/usr/bin/env node

const ACCESS_TOKEN = process.env.GSC_ACCESS_TOKEN
const SITE_URL = process.env.GSC_SITE_URL
const WEBMASTERS_BASE = 'https://www.googleapis.com/webmasters/v3'
const INSPECTION_BASE = 'https://searchconsole.googleapis.com/v1'

if (!ACCESS_TOKEN) {
  console.error(JSON.stringify({ error: 'GSC_ACCESS_TOKEN environment variable required' }))
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
const siteUrl = args.site || SITE_URL

function encodeSiteUrl(url) {
  if (url && url.startsWith('sc-domain:')) return url
  return url ? encodeURIComponent(url) : ''
}

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

async function api(method, base, path, body) {
  const url = `${base}${path}`

  if (args['dry-run']) {
    return {
      _dry_run: true,
      method,
      url,
      headers: { Authorization: 'Bearer ***' },
      body: body || undefined
    }
  }

  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
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

async function searchAnalytics(body) {
  if (!siteUrl) return { error: '--site or GSC_SITE_URL required' }
  return api('POST', WEBMASTERS_BASE, `/sites/${encodeSiteUrl(siteUrl)}/searchAnalytics/query`, body)
}

async function main() {
  let result
  const startDate = args.start || daysAgo(30)
  const endDate = args.end || daysAgo(3)

  switch (cmd) {
    case 'performance':
      switch (sub) {
        case 'queries': {
          result = await searchAnalytics({
            startDate,
            endDate,
            dimensions: ['query'],
            rowLimit: parseInt(args.limit) || 25,
            dataState: args['data-state'] || 'final'
          })
          break
        }
        case 'pages': {
          result = await searchAnalytics({
            startDate,
            endDate,
            dimensions: ['page'],
            rowLimit: parseInt(args.limit) || 25,
            dataState: args['data-state'] || 'final'
          })
          break
        }
        case 'daily': {
          result = await searchAnalytics({
            startDate,
            endDate,
            dimensions: ['date'],
            dataState: args['data-state'] || 'final'
          })
          break
        }
        case 'countries': {
          result = await searchAnalytics({
            startDate,
            endDate,
            dimensions: ['country'],
            rowLimit: parseInt(args.limit) || 20,
            dataState: args['data-state'] || 'final'
          })
          break
        }
        case 'devices': {
          result = await searchAnalytics({
            startDate,
            endDate,
            dimensions: ['device'],
            dataState: args['data-state'] || 'final'
          })
          break
        }
        case 'query-pages': {
          const body = {
            startDate,
            endDate,
            dimensions: ['query', 'page'],
            rowLimit: parseInt(args.limit) || 25,
            dataState: args['data-state'] || 'final'
          }
          if (args.query) {
            body.dimensionFilterGroups = [{
              groupType: 'and',
              filters: [{
                dimension: 'query',
                operator: args['query-op'] || 'contains',
                expression: args.query
              }]
            }]
          }
          result = await searchAnalytics(body)
          break
        }
        default:
          result = {
            error: 'Unknown performance subcommand',
            available: ['queries', 'pages', 'daily', 'countries', 'devices', 'query-pages']
          }
      }
      break

    case 'inspect': {
      if (!args.url) { result = { error: '--url required' }; break }
      if (!siteUrl) { result = { error: '--site or GSC_SITE_URL required' }; break }
      result = await api('POST', INSPECTION_BASE, '/urlInspection/index:inspect', {
        inspectionUrl: args.url,
        siteUrl: siteUrl,
        languageCode: args.lang || 'ja'
      })
      break
    }

    case 'sitemaps':
      switch (sub) {
        case 'list': {
          if (!siteUrl) { result = { error: '--site or GSC_SITE_URL required' }; break }
          result = await api('GET', WEBMASTERS_BASE, `/sites/${encodeSiteUrl(siteUrl)}/sitemaps`)
          break
        }
        case 'submit': {
          if (!siteUrl) { result = { error: '--site or GSC_SITE_URL required' }; break }
          if (!args.url) { result = { error: '--url required (sitemap URL)' }; break }
          result = await api('PUT', WEBMASTERS_BASE, `/sites/${encodeSiteUrl(siteUrl)}/sitemaps/${encodeURIComponent(args.url)}`)
          break
        }
        default:
          result = {
            error: 'Unknown sitemaps subcommand',
            available: ['list', 'submit']
          }
      }
      break

    case 'sites':
      switch (sub) {
        case 'list': {
          result = await api('GET', WEBMASTERS_BASE, '/sites')
          break
        }
        default:
          result = {
            error: 'Unknown sites subcommand',
            available: ['list']
          }
      }
      break

    case 'query': {
      if (!args.gaql) {
        result = { error: '--gaql not applicable. Use raw JSON body with --body' }
        break
      }
      break
    }

    default:
      result = {
        error: 'Unknown command',
        usage: {
          performance: 'performance [queries|pages|daily|countries|devices|query-pages] [--start YYYY-MM-DD] [--end YYYY-MM-DD] [--limit N]',
          inspect: 'inspect --url <page-url> [--site <site-url>] [--lang ja]',
          sitemaps: 'sitemaps [list|submit] [--site <site-url>] [--url <sitemap-url>]',
          sites: 'sites list'
        },
        options: {
          '--site': 'Site URL (or set GSC_SITE_URL). Use sc-domain:example.com for domain properties',
          '--start': 'Start date YYYY-MM-DD (default: 30 days ago)',
          '--end': 'End date YYYY-MM-DD (default: 3 days ago, accounting for data delay)',
          '--limit': 'Max rows (default varies, max 25000)',
          '--data-state': 'final (default) or all (includes fresh/unfinished data)',
          '--query': 'Filter by query (for query-pages subcommand)',
          '--query-op': 'Query filter operator: contains (default), equals, includingRegex, excludingRegex',
          '--dry-run': 'Preview request without sending'
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
