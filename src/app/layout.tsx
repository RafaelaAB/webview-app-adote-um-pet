/**
 * ROOT LAYOUT — documento HTML raiz da aplicação
 * ────────────────────────────────────────────────────────────────────────────
 *
 * O que é este arquivo?
 * ──────────────────────
 * No Next.js com App Router (pasta /app), o layout.tsx na raiz define
 * o documento HTML que envolve ABSOLUTAMENTE TODAS as páginas.
 * Qualquer coisa colocada aqui aparecerá em /, /pets, /cadastrar, etc.
 *
 * Analogia com Angular
 * ─────────────────────
 * Angular usa index.html como documento raiz e o AppComponent como
 * componente raiz. No Next.js, layout.tsx assume esses dois papéis:
 *
 *   index.html   (Angular) → <html> / <body> / metatags  (Next.js layout.tsx)
 *   AppComponent (Angular) → <AppShell>                  (Next.js AppShell)
 *
 * Por que separamos layout.tsx e AppShell?
 * ─────────────────────────────────────────
 * layout.tsx é um Server Component (renderizado no servidor) — ideal para
 * metadados SEO e a estrutura estática do documento HTML.
 *
 * AppShell é um Client Component (usa 'use client') — necessário porque
 * os Providers (PetProvider, SidebarProvider) usam useState internamente,
 * que só funciona no navegador.
 *
 * Regra: nunca coloque 'use client' em layout.tsx.
 * Delegue a parte interativa para componentes filhos como o AppShell.
 *
 * O que é metadata?
 * ──────────────────
 * O Next.js exporta o objeto `metadata` e usa seus valores para gerar
 * automaticamente as metatags HTML no <head>:
 *
 *   title       → <title>…</title>
 *   description → <meta name="description" content="…">
 *   keywords    → <meta name="keywords" content="…">
 *   openGraph   → <meta property="og:title" content="…"> etc.
 *
 * Essas tags são lidas pelo Google (SEO) e pelo WhatsApp/Twitter ao
 * compartilhar links (Open Graph).
 */

import type { Metadata } from 'next'
import './globals.css'
import AppShell from '@/components/AppShell/AppShell'

/**
 * metadata — configurações de SEO e Open Graph da aplicação.
 *
 * Exportar este objeto de um layout.tsx ou page.tsx é a forma que
 * o Next.js 13+ usa para gerar as metatags sem precisar de <Head>.
 * O conteúdo é estático (não muda por rota) porque está no layout raiz.
 * Cada page.tsx pode exportar seu próprio metadata para sobrescrever.
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
 * RootLayout — componente de layout raiz (Server Component).
 *
 * @param children — conteúdo da página atual, injetado automaticamente
 *                   pelo Next.js de acordo com a rota acessada.
 *                   Equivale ao <router-outlet> do Angular.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /*
     * <html lang="pt-BR">
     * Informa ao navegador e aos leitores de tela que o idioma da página
     * é Português do Brasil. Obrigatório pelo critério WCAG 3.1.1.
     */
    <html lang="pt-BR">
      <body>
        {/*
         * AppShell — componente raiz visual (equivalente ao AppComponent Angular).
         * Responsável por:
         *   - Registrar os Providers (PetProvider, SidebarProvider)
         *   - Renderizar Header, Sidebar, Footer e ScrollToTop
         *   - Expor o skip link de acessibilidade
         *   - Envolver as páginas em <main id="main-content">
         *
         * Separar AppShell de RootLayout mantém este arquivo como
         * Server Component puro, sem nenhuma dependência de cliente.
         */}
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
