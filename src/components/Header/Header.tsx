'use client'

/**
 * COMPONENTE: Header
 *
 * Barra de navegação fixa no topo da página. Contém:
 *   - Botão de menu (hambúrguer) à esquerda
 *   - Logo/nome da marca ao centro, que leva para a home ao clicar
 *   - Botões de busca e perfil à direita
 *
 * Comportamento de scroll:
 * ─────────────────────────
 * Usa o hook useScrollEffect para detectar quando o usuário rola a página.
 * Quando rolado mais de 10px, adiciona a classe CSS "scrolled" ao header,
 * que aplica sombra e fundo mais opaco (definido no Header.module.css).
 */

import Link from 'next/link'
import { Menu, Search, User } from 'lucide-react'
import { useScrollEffect } from '@/hooks/useScrollEffect'
import { useSidebarContext } from '@/context/SidebarContext'
import styles from './Header.module.css'

export default function Header() {
  const isScrolled = useScrollEffect(10)

  /**
   * Acessa o contexto da sidebar para conectar o botão hambúrguer.
   * toggle() alterna entre abrir e fechar o menu lateral.
   * isOpen é usado no aria-expanded para refletir o estado real da sidebar.
   */
  const { toggle: toggleSidebar, isOpen: isSidebarOpen } = useSidebarContext()

  return (
    <header
      data-testid="header"
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={`container ${styles.inner}`}>

        {/* Botão de menu hambúrguer — abre/fecha a sidebar ao clicar */}
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

        {/*
         * Logo da marca — Link navega para a home page ao clicar.
         * Usa <img> diretamente (não next/image) porque next/image não suporta SVG.
         */}
        <Link
          href="/"
          className={styles.brand}
          data-testid="header-brand"
          aria-label="Adote um Pet — página inicial"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* Grupo de ações à direita da barra */}
        <div className={styles.actions} role="group" aria-label="Ações do usuário">
          <button
            data-testid="header-btn-search"
            className={styles.iconBtn}
            aria-label="Buscar pets"
            type="button"
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
  )
}
