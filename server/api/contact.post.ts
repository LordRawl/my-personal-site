import { defineEventHandler, readBody, getHeader, createError } from 'h3'

const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT = 3
const RATE_WINDOW = 10 * 60 * 1000

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  console.log('DEBUG runtimeConfig:', {
    tokenLen: config.telegramBotToken?.length ?? -1,
    chatIdLen: config.telegramChatId?.length ?? -1,
    envTokenLen: process.env.NUXT_TELEGRAM_BOT_TOKEN?.length ?? -1,
    envChatIdLen: process.env.NUXT_TELEGRAM_CHAT_ID?.length ?? -1,
  })

  if (body.website) {
    throw createError({ statusCode: 400, message: 'Bad request' })
  }

  const loadTime = Number(body.loadTime)
  if (!loadTime || Date.now() - loadTime < 3000) {
    throw createError({ statusCode: 400, message: 'Too fast' })
  }

  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ||
    getHeader(event, 'x-real-ip') ||
    'unknown'
  const now = Date.now()
  const timestamps = (rateLimitMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW)
  if (timestamps.length >= RATE_LIMIT) {
    throw createError({ statusCode: 429, message: 'Too many requests' })
  }
  timestamps.push(now)
  rateLimitMap.set(ip, timestamps)

  const name = String(body.name ?? '').trim()
  const contact = String(body.contact ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (name.length < 2 || name.length > 100) {
    throw createError({ statusCode: 400, message: 'Invalid name' })
  }
  if (contact.length < 3 || contact.length > 200) {
    throw createError({ statusCode: 400, message: 'Invalid contact' })
  }
  if (message.length < 10 || message.length > 2000) {
    throw createError({ statusCode: 400, message: 'Invalid message' })
  }

  const text = [
    '*Новая заявка с сайта*',
    '',
    `*Имя:* ${name}`,
    `*Контакт:* ${contact}`,
    '',
    message,
  ].join('\n')

  const res = await fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: config.telegramChatId,
      text,
      parse_mode: 'Markdown',
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw createError({ statusCode: 502, message: `Telegram API error: ${err}` })
  }

  return { ok: true }
})
