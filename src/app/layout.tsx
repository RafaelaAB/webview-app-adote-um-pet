/**
 * LAYOUT RAIZ DA APLICAÇÃO (RootLayout)
 *
 * O que é o Layout no Next.js App Router?
 * ─────────────────────────────────────────
 * No Next.js 13+, o arquivo layout.tsx define a estrutura HTML que envolve
 * TODAS as páginas da aplicação. É o equivalente a um "template global".
 *
 * Tudo que está aqui aparece em todas as rotas: /home, /pets, /cadastrar, etc.
 * Por isso Header e Footer ficam aqui — eles são fixos em todas as páginas.
 *
 * O que é o Router no Next.js?
 * ──────────────────────────────
 * O Router do Next.js controla a navegação entre páginas sem recarregar o
 * browser (Single Page Application). Existem duas formas de usar:
 *
 *   1. <Link href="/pets"> — componente para links clicáveis (navegação declarativa)
 *   2. useRouter() — hook para navegar programaticamente (ex: após submit de formulário)
 *      Exemplo: router.back() volta para a página anterior
 *               router.push('/pets') redireciona para /pets
 *
 * O que é o PetProvider aqui?
 * ─────────────────────────────
 * Ao envolver tudo com <PetProvider>, garantimos que qualquer componente
 * em qualquer página pode acessar os dados dos pets via usePetContext().
 * É como uma "fonte de verdade" global que existe durante toda a sessão.
 */

import type { Metadata } from 'next'
import './globals.css'
import { PetProvider } from '@/context/PetContext'
import { SidebarProvider } from '@/context/SidebarContext'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Sidebar from '@/components/Sidebar/Sidebar'

/**
 * metadata — configura as metatags HTML da aplicação (SEO e redes sociais).
 * O Next.js usa esse objeto para gerar automaticamente as tags <title>,
 * <meta name="description">, <meta property="og:*">, etc. no <head> do HTML.
 */
export const metadata: Metadata = {
  title: 'Adote um Pet — Salve uma vida e faça a sua feliz',
  description:
    'Encontre seu novo companheiro. Adote um pet e transforme duas vidas com amor.',
  keywords: ['adoção', 'pets', 'cães', 'gatos', 'animais', 'adotar'],
  authors: [{ name: 'Rafaela Andrade Batista' }],
  openGraph: {
    title: 'Adote um Pet',
    description: 'Salve uma vida e faça a sua feliz',
    type: 'website',
  },
}

/**
 * RootLayout — componente de layout global.
 *
 * @param children — o conteúdo da página atual (injetado automaticamente
 *                   pelo Next.js conforme a rota acessada)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR"> {/* define o idioma da página para acessibilidade */}
      <body>
        {/*
         * Skip navigation link — permite que usuários de teclado/leitores de tela
         * pulem diretamente para o conteúdo principal, ignorando o menu (WCAG 2.4.1).
         */}
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>

        {/**
         * PetProvider envolve tudo: Header, conteúdo das páginas e Footer.
         * Isso significa que todos os componentes podem acessar os dados
         * dos pets via usePetContext() ou usePets().
         */}
        <PetProvider>
          {/*
           * SidebarProvider envolve Header e Sidebar para que ambos acessem
           * o mesmo estado de abertura/fechamento via useSidebarContext().
           * O Header usa toggle() e a Sidebar usa isOpen e close().
           */}
          <SidebarProvider>
            <Sidebar />
            <Header />
          </SidebarProvider>
          {/*
           * id="main-content" é o alvo do skip link acima (WCAG 2.4.1).
           * tabIndex={-1} permite que o foco seja movido programaticamente
           * para o main sem torná-lo parte do fluxo natural de tabulação.
           */}
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </PetProvider>
      </body>
    </html>
  )
}
