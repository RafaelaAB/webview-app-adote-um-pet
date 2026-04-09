'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, User } from 'lucide-react'
import { useScrollEffect } from '@/hooks/useScrollEffect'
import { useSidebarContext } from '@/context/SidebarContext'
import SearchModal from '@/components/SearchModal/SearchModal'
import styles from './Header.module.css'

export default function Header() {
  const isScrolled = useScrollEffect(10)
  const { toggle: toggleSidebar, isOpen: isSidebarOpen } = useSidebarContext()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <header
        data-testid="header"
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>

          <button
            data-testid="header-btn-menu"
            className={styles.iconBtn}
            aria-label="Abrir menu de navegação"
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar"
            type="button"
            onClick={toggleSidebar}
          >
            <Menu size={24} strokeWidth={2} aria-hidden="true" />
          </button>

          <Link
            href="/"
            className={styles.brand}
            data-testid="header-brand"
            aria-label="Adote um Pet — página inicial"
          >

            <img
              src="/logo-icon.svg"
              alt=""
              width={32}
              height={30}
              className={styles.brandLogo}
              aria-hidden="true"
            />
            <span className={styles.brandText}>Adote um Pet</span>
          </Link>

          <div className={styles.actions} role="group" aria-label="Ações do usuário">
            <button
              data-testid="header-btn-search"
              className={styles.iconBtn}
              aria-label="Abrir busca"
              aria-haspopup="dialog"
              aria-expanded={isSearchOpen}
              type="button"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={22} strokeWidth={2} aria-hidden="true" />
            </button>

            <button
              data-testid="header-btn-profile"
              className={styles.iconBtn}
              aria-label="Meu perfil"
              type="button"
            >
              <User size={22} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <SearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  )
}
