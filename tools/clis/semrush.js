#!/usr/bin/env node

const API_KEY = process.env.SEMRUSH_API_KEY
const BASE_URL = 'https://api.semrush.com'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'SEMRUSH_API_KEY environment variable required' }))
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

function parseSemrushResponse(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return { raw: text }
  const headers = lines[0].split(';')
  const rows = lines.slice(1).map(line => {
    const values = line.split(';')
    const obj = {}
    headers.forEach((h, i) => { obj[h] = values[i] })
    return obj
  })
  return rows
}

async function api(params) {
  const url = new URL(BASE_URL)
  url.searchParams.set('key', args['dry-run'] ? '***' : API_KEY)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, v)
  })

  if (args['dry-run']) {
    return {
      _dry_run: true,
      method: 'GET',
      url: url.toString()
    }
  }

  const res = await fetch(url.toString())
  const text = await res.text()

  if (text.startsWith('ERROR')) {
    return { error: text }
  }

  return parseSemrushResponse(text)
}

async function main() {
  let result

  switch (cmd) {
    case 'keywords':
      switch (sub) {
        case 'overview': {
          if (!args.phrase) { result = { error: '--phrase required' }; break }
          result = await api({
            type: 'phrase_this',
            phrase: args.phrase,
            database: args.database || 'jp',
            export_columns: 'Ph,Nq,Cp,Co,Nr,Td'
          })
          break
        }
        case 'related': {
          if (!args.phrase) { result = { error: '--phrase required' }; break }
          result = await api({
            type: 'phrase_related',
            phrase: args.phrase,
            database: args.database || 'jp',
            display_limit: args.limit || '20',
            export_columns: 'Ph,Nq,Cp,Co,Nr,Td'
          })
          break
        }
        case 'difficulty': {
          if (!args.phrase) { result = { error: '--phrase required' }; break }
          result = await api({
            type: 'phrase_kdi',
            phrase: args.phrase,
            database: args.database || 'jp',
            export_columns: 'Ph,Kd'
          })
          break
        }
        case 'match': {
          if (!args.phrase) { result = { error: '--phrase required' }; break }
          result = await api({
            type: 'phrase_fullsearch',
            phrase: args.phrase,
            database: args.database || 'jp',
            display_limit: args.limit || '20',
            export_columns: 'Ph,Nq,Cp,Co,Nr,Td'
          })
          break
        }
        default:
          result = {
            error: 'Unknown keywords subcommand',
            available: ['overview', 'related', 'difficulty', 'match']
          }
      }
      break

    case 'domain':
      switch (sub) {
        case 'overview': {
          if (!args.domain) { result = { error: '--domain required' }; break }
          result = await api({
            type: 'domain_ranks',
            domain: args.domain,
            database: args.database || 'jp',
            export_columns: 'Db,Dn,Dt,Or,Ot,Oc,Ad,At,Ac'
          })
          break
        }
        case 'organic': {
          if (!args.domain) { result = { error: '--domain required' }; break }
          result = await api({
            type: 'domain_organic',
            domain: args.domain,
            database: args.database || 'jp',
            display_limit: args.limit || '20',
            export_columns: 'Ph,Po,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td'
          })
          break
        }
        case 'versus': {
          if (!args.domains) { result = { error: '--domains required (comma-separated, e.g. a.com,b.com)' }; break }
          const domains = args.domains.split(',')
          if (domains.length < 2) { result = { error: 'Need at least 2 domains' }; break }
          result = await api({
            type: 'domain_domains',
            domains: domains.join('|'),
            database: args.database || 'jp',
            display_limit: args.limit || '20',
            export_columns: 'Ph,Nq,Co,Nr,Td'
          })
          break
        }
        default:
          result = {
            error: 'Unknown domain subcommand',
            available: ['overview', 'organic', 'versus']
          }
      }
      break

    case 'url':
      switch (sub) {
        case 'organic': {
          if (!args.url) { result = { error: '--url required' }; break }
          result = await api({
            type: 'url_organic',
            url: args.url,
            database: args.database || 'jp',
            display_limit: args.limit || '20',
            export_columns: 'Ph,Po,Nq,Cp,Tr,Tc,Co,Nr,Td'
          })
          break
        }
        default:
          result = {
            error: 'Unknown url subcommand',
            available: ['organic']
          }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          keywords: 'keywords [overview|related|difficulty|match] --phrase <term> [--database <db>] [--limit <n>]',
          domain: 'domain [overview|organic|versus] --domain <domain> [--database <db>] [--limit <n>]',
          url: 'url organic --url <url> [--database <db>] [--limit <n>]'
        },
        databases: 'Default: jp. Others: us, uk, de, fr, etc.',
        flags: '--dry-run to preview request without sending'
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
