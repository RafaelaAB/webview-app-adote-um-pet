'use client'

import Link from 'next/link'
import { Syringe, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createLogger } from '@/lib/logger'
import styles from './campanhas-vacinacao.module.css'

const log = createLogger('CampanhasVacinacaoPage')

export default function CampanhasVacinacaoPage() {
  const router = useRouter()

  log.info('página de campanhas de vacinação acessada')

  return (
    <div className={styles.page}>
      <div className={`container ${styles.inner}`}>

        <button
          className={styles.backBtn}
          onClick={() => router.back()}
          type="button"
          aria-label="Voltar à página anterior"
        >
          <ArrowLeft size={18} strokeWidth={2} />
          <span>Voltar</span>
        </button>

        <header className={styles.header}>
          <span className={styles.iconWrapper} aria-hidden="true">
            <Syringe size={40} strokeWidth={1.5} />
          </span>
          <h1 className={styles.title}>Campanhas de Vacinação</h1>
          <p className={styles.subtitle}>
            Mantenha seu pet protegido. Veja campanhas de vacinação gratuita disponíveis perto de você.
          </p>
        </header>

        <div className={styles.comingSoon}>
          <p className={styles.comingSoonText}>
            Em breve você encontrará aqui os calendários e locais de vacinação gratuita para pets na sua cidade.
          </p>
          <Link href="/pets" className={styles.ctaLink}>
            Ver pets disponíveis para adoção
          </Link>
        </div>

      </div>
    </div>
  )
}
