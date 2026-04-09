/**
 * APP SHELL — equivalente ao AppComponent do Angular
 * ────────────────────────────────────────────────────────────────────────────
 *
 * O que é o AppComponent no Angular?
 * ────────────────────────────────────
 * No Angular, o AppComponent é o componente RAIZ da aplicação. Ele define
 * o "esqueleto" visual que existe em todas as telas:
 *
 *   <app-root>
 *     <app-header />
 *     <router-outlet />   ← aqui o Angular injeta a página atual
 *     <app-footer />
 *   </app-root>
 *
 * Qual é o equivalente no Next.js?
 * ──────────────────────────────────
 * No Next.js com App Router (pasta /app), o arquivo layout.tsx faz o papel
 * do AppComponent. Mas, para separar responsabilidades, extraímos a parte
 * visual + providers para este AppShell:
 *
 *   layout.tsx        → define o documento HTML (<html>, <head>, metadados SEO)
 *   AppShell.tsx      → define o "esqueleto" visual e injeta os Providers
 *
 * O que são Providers?
 * ─────────────────────
 * Providers são componentes que disponibilizam dados/funcionalidades para
 * todos os seus descendentes via React Context (similar ao "provide" do Angular).
 *
 *   PetProvider     → disponibiliza a lista de pets globalmente
 *   SidebarProvider → disponibiliza o estado aberto/fechado da Sidebar
 *
 * Por que usar Context em vez de passar props?
 * ─────────────────────────────────────────────
 * Sem Context, teríamos que passar os dados por "prop drilling":
 *
 *   AppShell → Header → SearchModal → usePets() ← isso funcionaria
 *   AppShell → Sidebar → precisaria de isOpen, toggle ← precisaria passar via props
 *
 * Com Context, qualquer componente em qualquer nível pode chamar
 * usePetContext() ou useSidebarContext() diretamente, sem receber props.
 */

'use client'

/*
 * Por que 'use client' aqui?
 * ──────────────────────────
 * No Next.js 13+, por padrão todos os componentes são Server Components
 * (renderizados no servidor). Mas React Context, useState e useEffect
 * só funcionam no cliente (browser). Por isso precisamos do 'use client'.
 *
 * AppShell é um Client Component porque usa PetProvider e SidebarProvider,
 * que internamente usam useState para gerenciar estado.
 */

import { PetProvider } from '@/context/PetContext'
import { SidebarProvider } from '@/context/SidebarContext'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Sidebar from '@/components/Sidebar/Sidebar'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'

interface AppShellProps {
  /** O conteúdo da página atual, injetado pelo Next.js conforme a rota */
  children: React.ReactNode
}

/**
 * AppShell — componente raiz visual da aplicação.
 *
 * Responsabilidades:
 *   1. Registrar os Providers (PetProvider, SidebarProvider)
 *   2. Renderizar o Header e a Sidebar (persistem em todas as rotas)
 *   3. Renderizar o Footer (persiste em todas as rotas)
 *   4. Renderizar o botão ScrollToTop
 *   5. Expor o skip link de acessibilidade
 *   6. Envolver o conteúdo da página atual em <main>
 *
 * Hierarquia de Providers:
 * ┌─ PetProvider ──────────────────────────────────────────────┐
 * │  Disponibiliza: pets[], loading, getPetById, filterPets    │
 * │  ┌─ SidebarProvider ────────────────────────────────────┐  │
 * │  │  Disponibiliza: isOpen, toggle(), close()            │  │
 * │  │  <Sidebar />   ← usa isOpen + close()               │  │
 * │  │  <Header />    ← usa toggle() + isOpen              │  │
 * │  └──────────────────────────────────────────────────────┘  │
 * │  <main>{children}</main>  ← página atual da rota           │
 * │  <Footer />                                                 │
 * └────────────────────────────────────────────────────────────┘
 */
export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      {/*
       * Skip link — link invisível que aparece apenas quando o usuário
       * navega com teclado (Tab). Permite pular o menu e ir direto ao conteúdo.
       * Obrigatório pelo critério WCAG 2.4.1 (Bypass Blocks).
       * O alvo é <main id="main-content"> definido abaixo.
       */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {/*
       * ScrollToTop — botão flutuante que aparece ao rolar para baixo.
       * Fica fora dos providers porque não precisa de nenhum contexto.
       */}
      <ScrollToTop />

      {/*
       * PetProvider — carrega e disponibiliza todos os pets da aplicação.
       *
       * Por que envolver tudo aqui?
       * Para que tanto o Header (SearchModal usa pets) quanto as páginas
       * internas (PetsPage, AdotarPage, etc.) tenham acesso à mesma lista.
       *
       * Equivalente Angular: providedIn: 'root' de um PetService
       */}
      <PetProvider>

        {/*
         * SidebarProvider — controla o estado de abertura da Sidebar.
         *
         * Por que envolver apenas Header e Sidebar?
         * Apenas esses dois componentes precisam desse contexto, então
         * o Provider tem escopo menor — boa prática de React.
         *
         * Equivalente Angular: providedIn: 'root' de um SidebarService
         */}
        <SidebarProvider>
          {/*
           * Sidebar — menu lateral deslizante.
           * Usa: isOpen (para exibir) e close() (para fechar).
           * Renderizada antes do Header para que fique atrás dele no z-index.
           */}
          <Sidebar />

          {/*
           * Header — barra de navegação superior fixa.
           * Usa: toggle() para abrir a Sidebar, isOpen para ajustar aria-expanded.
           * Também contém o SearchModal, que usa usePetContext() internamente.
           */}
          <Header />
        </SidebarProvider>

        {/*
         * <main> — elemento semântico HTML5 que delimita o conteúdo principal.
         *
         * id="main-content" — alvo do skip link acima (WCAG 2.4.1)
         * tabIndex={-1}     — permite receber foco programaticamente sem
         *                     aparecer no fluxo natural de tabulação (Tab).
         *                     Usado quando o skip link é ativado.
         *
         * {children}        — aqui o Next.js injeta o componente da página atual
         *                     (equivalente ao <router-outlet> do Angular).
         */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        {/* Footer — rodapé fixo em todas as páginas */}
        <Footer />

      </PetProvider>
    </>
  )
}
