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
 *
 * O que é o Router aqui?
 * ──────────────────────
 * Este componente usa <Link> do Next.js (não o useRouter). O Link é
 * usado para navegação entre páginas sem recarregar o browser.
 * Ao clicar no logo, o usuário vai para "/" (home page).
 */

import Link from 'next/link'
import { Menu, Search, User } from 'lucide-react'
import { useScrollEffect } from '@/hooks/useScrollEffect'
import styles from './Header.module.css'

/**
 * Header — componente de navegação principal.
 *
 * Não recebe props — usa apenas estado interno via hook.
 */
export default function Header() {
  /**
   * useScrollEffect(10) retorna true quando a página foi rolada mais de 10px.
   * isScrolled é usado para alternar a classe CSS do header.
   */
  const isScrolled = useScrollEffect(10)

  return (
    // Quando isScrolled é true, adiciona styles.scrolled (sombra + fundo sólido)
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* Botão de menu hambúrguer — sem funcionalidade implementada ainda */}
        <button
          className={styles.iconBtn}
          aria-label="Abrir menu"
          type="button"
        >
          <Menu size={24} strokeWidth={2} />
        </button>

        {/* Logo da marca — Link navega para a home page ao clicar */}
        <Link href="/" className={styles.brand}>
          <span className={styles.brandIcon}>🐾</span>
          <span className={styles.brandText}>Adote um Pet</span>
        </Link>

        {/* Grupo de ações à direita da barra */}
        <div className={styles.actions}>
          {/* Botão de busca — sem funcionalidade implementada ainda */}
          <button
            className={styles.iconBtn}
            aria-label="Buscar pets"
            type="button"
          >
            <Search size={22} strokeWidth={2} />
          </button>

          {/* Botão de perfil — sem funcionalidade implementada ainda */}
          <button
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
