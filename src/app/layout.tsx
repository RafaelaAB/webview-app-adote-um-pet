import type { Metadata } from 'next'
import './globals.css'
import AppShell from '@/components/AppShell/AppShell'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="pt-BR">
      <body>

        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
