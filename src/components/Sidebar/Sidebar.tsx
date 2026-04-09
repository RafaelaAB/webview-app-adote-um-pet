'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, House, PawPrint, Plus, Calendar, MapPin, Syringe, ChevronDown, Building2 } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSidebarContext } from '@/context/SidebarContext'
import { createLogger } from '@/lib/logger'
import { ROUTES } from '@/lib/routes'
import styles from './Sidebar.module.css'

const log = createLogger('Sidebar')

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface NavGroup {
  label: string
  icon: React.ReactNode
  children: NavItem[]
}

type MenuItem = NavItem | NavGroup

function isNavGroup(item: MenuItem): item is NavGroup {
  return 'children' in item
}

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

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close()
      }
    },
    [isOpen, close]
  )

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      closeButtonRef.current?.focus()
    } else {
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
    }
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  function toggleGroup(label: string) {
    const next = expandedGroup === label ? null : label
    log.debug('grupo do menu alternado', { grupo: label, expandido: next !== null })
    setExpandedGroup(next)
  }

  function handleLinkClick(label: string, href: string) {
    log.info('navegação via sidebar', { item: label, destino: href })
    close()
  }

  return (
    <>

      <div
        data-testid="sidebar-overlay"
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <nav
        data-testid="sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
        aria-label="Menu de navegação principal"
        aria-hidden={!isOpen}
        aria-modal={isOpen ? 'true' : undefined}
      >

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

        <ul className={styles.navList} role="list">
          {MENU_ITEMS.map((item) => (
            <li key={item.label} className={styles.navItem}>

              {isNavGroup(item) ? (

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
