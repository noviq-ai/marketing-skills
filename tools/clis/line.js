#!/usr/bin/env node

const ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN
const BASE_URL = 'https://api.line.me/v2/bot'

if (!ACCESS_TOKEN) {
  console.error(JSON.stringify({ error: 'LINE_CHANNEL_ACCESS_TOKEN environment variable required' }))
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

async function api(method, path, body) {
  const url = `${BASE_URL}${path}`

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

  if (res.status === 200 || res.status === 201) {
    const text = await res.text()
    if (!text) return { status: res.status, ok: true }
    try {
      return JSON.parse(text)
    } catch {
      return { status: res.status, body: text }
    }
  }
  const text = await res.text()
  try {
    return { status: res.status, ...JSON.parse(text) }
  } catch {
    return { status: res.status, body: text }
  }
}

function formatDate(daysAgo) {
  const d = new Date()
  d.setDate(d.getDate() - (daysAgo || 0))
  return d.toISOString().slice(0, 10).replace(/-/g, '')
}

async function main() {
  let result

  switch (cmd) {
    case 'message':
      switch (sub) {
        case 'push': {
          if (!args.to) { result = { error: '--to required (user ID)' }; break }
          if (!args.text) { result = { error: '--text required' }; break }
          result = await api('POST', '/message/push', {
            to: args.to,
            messages: [{ type: 'text', text: args.text }]
          })
          break
        }
        case 'broadcast': {
          if (!args.text) { result = { error: '--text required' }; break }
          result = await api('POST', '/message/broadcast', {
            messages: [{ type: 'text', text: args.text }]
          })
          break
        }
        case 'multicast': {
          if (!args.to) { result = { error: '--to required (comma-separated user IDs)' }; break }
          if (!args.text) { result = { error: '--text required' }; break }
          result = await api('POST', '/message/multicast', {
            to: args.to.split(','),
            messages: [{ type: 'text', text: args.text }]
          })
          break
        }
        case 'quota': {
          result = await api('GET', '/message/quota')
          break
        }
        case 'quota-consumption': {
          result = await api('GET', '/message/quota/consumption')
          break
        }
        default:
          result = {
            error: 'Unknown message subcommand',
            available: ['push', 'broadcast', 'multicast', 'quota', 'quota-consumption']
          }
      }
      break

    case 'insight':
      switch (sub) {
        case 'followers': {
          const date = args.date || formatDate(1)
          result = await api('GET', `/insight/followers?date=${date}`)
          break
        }
        case 'demographic': {
          result = await api('GET', '/insight/demographic')
          break
        }
        case 'delivery': {
          const date = args.date || formatDate(1)
          result = await api('GET', `/insight/message/delivery?date=${date}`)
          break
        }
        case 'message-event': {
          if (!args['request-id']) { result = { error: '--request-id required (from send response)' }; break }
          result = await api('GET', `/insight/message/event?requestId=${args['request-id']}`)
          break
        }
        default:
          result = {
            error: 'Unknown insight subcommand',
            available: ['followers', 'demographic', 'delivery', 'message-event']
          }
      }
      break

    case 'audience':
      switch (sub) {
        case 'list': {
          const page = args.page || 1
          result = await api('GET', `/audienceGroup/list?page=${page}&size=${args.limit || 20}`)
          break
        }
        case 'create': {
          if (!args.description) { result = { error: '--description required' }; break }
          result = await api('POST', '/audienceGroup/upload', {
            description: args.description,
            isIfaAudience: false,
            audiences: []
          })
          break
        }
        case 'get': {
          if (!args.id) { result = { error: '--id required (audience group ID)' }; break }
          result = await api('GET', `/audienceGroup/${args.id}`)
          break
        }
        default:
          result = {
            error: 'Unknown audience subcommand',
            available: ['list', 'create', 'get']
          }
      }
      break

    case 'richmenu':
      switch (sub) {
        case 'list': {
          result = await api('GET', '/richmenu/list')
          break
        }
        case 'get-default': {
          result = await api('GET', '/user/all/richmenu')
          break
        }
        default:
          result = {
            error: 'Unknown richmenu subcommand',
            available: ['list', 'get-default']
          }
      }
      break

    case 'profile': {
      if (!args.id) { result = { error: '--id required (user ID)' }; break }
      result = await api('GET', `/profile/${args.id}`)
      break
    }

    case 'followers': {
      result = await api('GET', `/followers/ids?limit=${args.limit || 1000}${args.start ? '&start=' + args.start : ''}`)
      break
    }

    default:
      result = {
        error: 'Unknown command',
        usage: {
          message: 'message [push|broadcast|multicast|quota|quota-consumption] [--to <userId>] [--text <message>]',
          insight: 'insight [followers|demographic|delivery|message-event] [--date YYYYMMDD]',
          audience: 'audience [list|create|get] [--description <name>] [--id <groupId>]',
          richmenu: 'richmenu [list|get-default]',
          profile: 'profile --id <userId>',
          followers: 'followers [--limit N] [--start <continuationToken>]'
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
