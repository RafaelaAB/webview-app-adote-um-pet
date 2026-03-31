'use client'

/**
 * CONTEXTO: SidebarContext
 *
 * Fornece o estado de abertura/fechamento da sidebar para toda a aplicação.
 * Isso permite que componentes separados (Header e Sidebar) compartilhem o
 * mesmo estado sem precisar de prop drilling (passar props por vários níveis).
 *
 * Padrão usado:
 * ─────────────
 * 1. SidebarProvider — envolve a aplicação no layout.tsx e mantém o estado
 * 2. useSidebarContext — hook que qualquer componente usa para acessar o contexto
 *
 * Componentes que usam este contexto:
 *   - Header: usa toggle() no botão hambúrguer
 *   - Sidebar: usa isOpen para mostrar/esconder e close() para fechar
 */

import { createContext, useContext, useState } from 'react'
import { createLogger } from '@/lib/logger'

const log = createLogger('SidebarContext')

/** Estrutura dos dados expostos pelo contexto */
interface SidebarContextData {
  /** true quando o menu está aberto */
  isOpen: boolean
  /** alterna entre aberto/fechado */
  toggle: () => void
  /** fecha o menu */
  close: () => void
}

const SidebarContext = createContext<SidebarContextData | null>(null)

/**
 * SidebarProvider — provedor de contexto.
 * Deve envolver os componentes que precisam acessar o estado da sidebar.
 *
 * @param children — componentes filhos que terão acesso ao contexto
 */
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  /** Alterna o estado da sidebar entre aberta e fechada */
  function toggle() {
    setIsOpen(prev => {
      const next = !prev
      log.info(next ? 'sidebar aberta' : 'sidebar fechada')
      return next
    })
  }

  /** Fecha a sidebar — usado ao clicar no overlay ou em um link */
  function close() {
    log.debug('sidebar fechada')
    setIsOpen(false)
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  )
}

/**
 * useSidebarContext — hook para acessar o contexto da sidebar.
 * Lança erro se usado fora de SidebarProvider.
 */
export function useSidebarContext(): SidebarContextData {
  const ctx = useContext(SidebarContext)

  if (!ctx) {
    throw new Error('useSidebarContext deve ser usado dentro de <SidebarProvider>')
  }

  return ctx
}
