'use client'

/**
 * COMPONENTE: Sidebar
 *
 * Menu lateral deslizante que se expande para a direita ao ser aberto.
 * Controlado pelo SidebarContext — aberto via botão hambúrguer no Header.
 *
 * Acessibilidade (WCAG):
 * ────────────────────────
 *   - 2.4.3 Focus Order: ao abrir, foco move para o botão fechar;
 *     ao fechar, foco retorna ao elemento que disparou a abertura.
 *   - 4.1.2 Name, Role, Value: aria-expanded e aria-hidden sincronizados.
 *   - 2.1.1 Keyboard: Escape fecha o menu.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, House, PawPrint, Plus, Calendar, MapPin, Syringe, ChevronDown, Building2 } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSidebarContext } from '@/context/SidebarContext'
import { createLogger } from '@/lib/logger'
import { ROUTES } from '@/lib/routes'
import styles from './Sidebar.module.css'

const log = createLogger('Sidebar')

/** Define a estrutura de um item simples de navegação */
interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

/** Define a estrutura de um grupo de itens (com sub-menu expansível) */
interface NavGroup {
  label: string
  icon: React.ReactNode
  children: NavItem[]
}

/** União dos dois tipos possíveis de item */
type MenuItem = NavItem | NavGroup

/** Verifica se um MenuItem é um grupo (tem filhos) */
function isNavGroup(item: MenuItem): item is NavGroup {
  return 'children' in item
}

/** Itens do menu — separados da lógica para facilitar manutenção */
const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Home',
    href: ROUTES.HOME,
    icon: <House size={20} strokeWidth={2} />,
  },
  {
    label: 'Adote um Pet',
    href: ROUTES.PETS,
    icon: <PawPrint size={20} strokeWidth={2} />,
  },
  {
    label: 'Cadastre um Pet',
    href: ROUTES.REGISTER,
    icon: <Plus size={20} strokeWidth={2} />,
  },
  {
    label: 'ONGs',
    href: ROUTES.ONGS,
    icon: <Building2 size={20} strokeWidth={2} />,
  },
  {
    label: 'Eventos',
    icon: <Calendar size={20} strokeWidth={2} />,
    children: [
      {
        label: 'Campanhas de adoção em sua cidade',
        href: ROUTES.EVENTOS.CAMPANHAS_ADOCAO,
        icon: <MapPin size={16} strokeWidth={2} />,
      },
      {
        label: 'Campanhas de vacinação',
        href: ROUTES.EVENTOS.CAMPANHAS_VACINACAO,
        icon: <Syringe size={16} strokeWidth={2} />,
      },
    ],
  },
]

export default function Sidebar() {
  const { isOpen, close } = useSidebarContext()
  const pathname = usePathname()

  /**
   * Refs para gerenciamento de foco (WCAG 2.4.3):
   * - closeButtonRef: botão fechar — recebe foco quando a sidebar abre
   * - previousFocusRef: elemento que estava focado antes de abrir — restaurado ao fechar
   */
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  /**
   * Controla qual grupo está com sub-menu expandido.
   * Armazena o label do grupo aberto ou null se nenhum estiver aberto.
   */
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)

  /** Fecha a sidebar ao pressionar Escape (WCAG 2.1.1) */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close()
      }
    },
    [isOpen, close]
  )

  /**
   * Gerenciamento de foco ao abrir/fechar (WCAG 2.4.3):
   * - Abre: salva o elemento com foco atual e move foco para o botão fechar
   * - Fecha: restaura o foco para o elemento original
   */
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      closeButtonRef.current?.focus()
    } else {
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
    }
  }, [isOpen])

  /** Registra e remove o listener de Escape */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  /** Alterna a expansão de um grupo de sub-itens */
  function toggleGroup(label: string) {
    const next = expandedGroup === label ? null : label
    log.debug('grupo do menu alternado', { grupo: label, expandido: next !== null })
    setExpandedGroup(next)
  }

  /** Fecha a sidebar ao clicar em um link de navegação */
  function handleLinkClick(label: string, href: string) {
    log.info('navegação via sidebar', { item: label, destino: href })
    close()
  }

  return (
    <>
      {/*
       * Overlay — fundo escuro semitransparente que aparece atrás do menu.
       * Clicar nele fecha a sidebar sem precisar usar o botão X.
       * aria-hidden="true": elemento decorativo, não deve ser anunciado.
       */}
      <div
        data-testid="sidebar-overlay"
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/*
       * nav — elemento semântico de navegação.
       * Desliza da esquerda para a direita via CSS transform.
       * aria-hidden sincroniza o estado de visibilidade para leitores de tela.
       * aria-modal="true" indica que é um diálogo modal quando aberto.
       */}
      <nav
        data-testid="sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
        aria-label="Menu de navegação principal"
        aria-hidden={!isOpen}
        aria-modal={isOpen ? 'true' : undefined}
      >
        {/* Cabeçalho da sidebar com título e botão fechar */}
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle} aria-hidden="true">Menu</span>

          <button
            ref={closeButtonRef}
            data-testid="sidebar-close"
            className={styles.closeBtn}
            onClick={close}
            aria-label="Fechar menu de navegação"
            type="button"
          >
            <X size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {/* Lista principal de itens de navegação */}
        <ul className={styles.navList} role="list">
          {MENU_ITEMS.map((item) => (
            <li key={item.label} className={styles.navItem}>

              {isNavGroup(item) ? (
                /*
                 * GRUPO COM SUB-MENU (ex: Eventos)
                 * Botão que expande/colapsa os itens filhos ao ser clicado.
                 * aria-expanded informa leitores de tela sobre o estado.
                 */
                <>
                  <button
                    data-testid={`sidebar-group-${item.label.toLowerCase()}`}
                    className={`${styles.navLink} ${styles.navLinkGroup}`}
                    onClick={() => toggleGroup(item.label)}
                    aria-expanded={expandedGroup === item.label}
                    aria-controls={`sidebar-submenu-${item.label.toLowerCase()}`}
                    type="button"
                  >
                    <span className={styles.navIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className={styles.navLabel}>{item.label}</span>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className={`${styles.chevron} ${expandedGroup === item.label ? styles.chevronOpen : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Sub-lista: animada com max-height via CSS */}
                  <ul
                    id={`sidebar-submenu-${item.label.toLowerCase()}`}
                    className={`${styles.subList} ${expandedGroup === item.label ? styles.subListOpen : ''}`}
                    role="list"
                  >
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          data-testid={`sidebar-link-${child.href}`}
                          className={`${styles.subLink} ${pathname === child.href ? styles.active : ''}`}
                          onClick={() => handleLinkClick(child.label, child.href)}
                          aria-current={pathname === child.href ? 'page' : undefined}
                        >
                          <span className={styles.subIcon} aria-hidden="true">
                            {child.icon}
                          </span>
                          <span>{child.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                /*
                 * ITEM SIMPLES (ex: Adote um Pet, Cadastre um Pet)
                 * Link direto para a rota. Recebe classe "active" quando
                 * a rota atual bate com o href do item.
                 * aria-current="page" indica a página atual para leitores de tela.
                 */
                <Link
                  href={item.href}
                  data-testid={`sidebar-link-${item.href}`}
                  className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                  onClick={() => handleLinkClick(item.label, item.href)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  <span className={styles.navIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              )}

            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
