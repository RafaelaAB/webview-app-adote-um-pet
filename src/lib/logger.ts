'use client'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  context: string
  message: string
  data?: unknown
}

const IS_PROD = process.env.NODE_ENV === 'production'

const LEVEL_STYLES: Record<LogLevel, string> = {
  debug: 'color: #6b7280; font-weight: normal',
  info:  'color: #3b82f6; font-weight: bold',
  warn:  'color: #f59e0b; font-weight: bold',
  error: 'color: #ef4444; font-weight: bold',
}

function buildEntry(level: LogLevel, context: string, message: string, data?: unknown): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    context,
    message,
    ...(data !== undefined && { data }),
  }
}

function print(entry: LogEntry) {
  const prefix = `%c[${entry.level.toUpperCase()}] [${entry.context}]`
  const style = LEVEL_STYLES[entry.level]
  const text = `${entry.timestamp} — ${entry.message}`

  if (entry.data !== undefined) {
    console[entry.level === 'debug' ? 'log' : entry.level](prefix, style, text, entry.data)
  } else {
    console[entry.level === 'debug' ? 'log' : entry.level](prefix, style, text)
  }
}

export function createLogger(context: string) {
  return {

    info(message: string, data?: unknown) {
      if (IS_PROD) return
      print(buildEntry('info', context, message, data))
    },

    debug(message: string, data?: unknown) {
      if (IS_PROD) return
      print(buildEntry('debug', context, message, data))
    },

    warn(message: string, data?: unknown) {
      print(buildEntry('warn', context, message, data))
    },

    error(message: string, data?: unknown) {
      print(buildEntry('error', context, message, data))
    },
  }
}
