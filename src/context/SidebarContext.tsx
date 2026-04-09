'use client'

import { createContext, useContext, useState } from 'react'
import { createLogger } from '@/lib/logger'

const log = createLogger('SidebarContext')

interface SidebarContextData {

  isOpen: boolean

  toggle: () => void

  close: () => void
}

const SidebarContext = createContext<SidebarContextData | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  function toggle() {
    setIsOpen(prev => {
      const next = !prev
      log.info(next ? 'sidebar aberta' : 'sidebar fechada')
      return next
    })
  }

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

export function useSidebarContext(): SidebarContextData {
  const ctx = useContext(SidebarContext)

  if (!ctx) {
    throw new Error('useSidebarContext deve ser usado dentro de <SidebarProvider>')
  }

  return ctx
}
