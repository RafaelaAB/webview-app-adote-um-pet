'use client'

/**
 * LOGGER — utilitário de logs estruturados
 *
 * Fornece logs com:
 *   - Nível (info, warn, error, debug)
 *   - Contexto (qual módulo/componente gerou o log)
 *   - Timestamp ISO
 *   - Silenciado automaticamente em produção para info/debug
 *
 * Uso:
 *   const log = createLogger('PetContext')
 *   log.info('pets carregados', { total: 28 })
 *   log.error('pet não encontrado', { id: '999' })
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  context: string
  message: string
  data?: unknown
}

const IS_PROD = process.env.NODE_ENV === 'production'

// Cores para cada nível no console do browser
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

/**
 * createLogger — cria um logger com o contexto fixo (nome do módulo).
 *
 * @param context — nome do módulo/componente (ex: 'PetContext', 'PetsPage')
 */
export function createLogger(context: string) {
  return {
    /** Informações gerais de fluxo — silenciado em produção */
    info(message: string, data?: unknown) {
      if (IS_PROD) return
      print(buildEntry('info', context, message, data))
    },

    /** Detalhes de depuração — silenciado em produção */
    debug(message: string, data?: unknown) {
      if (IS_PROD) return
      print(buildEntry('debug', context, message, data))
    },

    /** Situações inesperadas que não bloqueiam o fluxo — sempre exibido */
    warn(message: string, data?: unknown) {
      print(buildEntry('warn', context, message, data))
    },

    /** Falhas e erros críticos — sempre exibido */
    error(message: string, data?: unknown) {
      print(buildEntry('error', context, message, data))
    },
  }
}
