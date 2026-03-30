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
import styles from './Header.module.css'

export default function Header() {
  const isScrolled = useScrollEffect(10)

  return (
    <header
      data-testid="header"
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
    >
      <div className={`container ${styles.inner}`}>

        {/* Botão de menu hambúrguer */}
        <button
          data-testid="header-btn-menu"
          className={styles.iconBtn}
          aria-label="Abrir menu"
          type="button"
        >
          <Menu size={24} strokeWidth={2} />
        </button>

        {/* Logo da marca — Link navega para a home page ao clicar */}
        <Link href="/" className={styles.brand} data-testid="header-brand">
          <span className={styles.brandIcon}>🐾</span>
          <span className={styles.brandText}>Adote um Pet</span>
        </Link>

        {/* Grupo de ações à direita da barra */}
        <div className={styles.actions}>
          <button
            data-testid="header-btn-search"
            className={styles.iconBtn}
            aria-label="Buscar pets"
            type="button"
          >
            <Search size={22} strokeWidth={2} />
          </button>

          <button
            data-testid="header-btn-profile"
            className={styles.iconBtn}
            aria-label="Meu perfil"
            type="button"
          >
            <User size={22} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  )
}
