'use client'

import { PetProvider } from '@/context/PetContext'
import { SidebarProvider } from '@/context/SidebarContext'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Sidebar from '@/components/Sidebar/Sidebar'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'

interface AppShellProps {

  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <>

      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <ScrollToTop />

      <PetProvider>

        <SidebarProvider>

          <Sidebar />

          <Header />
        </SidebarProvider>

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />

      </PetProvider>
    </>
  )
}
