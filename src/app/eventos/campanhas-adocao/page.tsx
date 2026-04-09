'use client'

import Link from 'next/link'
import { MapPin, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createLogger } from '@/lib/logger'
import styles from './campanhas-adocao.module.css'

const log = createLogger('CampanhasAdocaoPage')

export default function CampanhasAdocaoPage() {
  const router = useRouter()

  log.info('página de campanhas de adoção acessada')

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
            <MapPin size={40} strokeWidth={1.5} />
          </span>
          <h1 className={styles.title}>Campanhas de Adoção</h1>
          <p className={styles.subtitle}>
            Encontre campanhas de adoção de pets disponíveis na sua cidade e dê um lar cheio de amor para quem precisa.
          </p>
        </header>

        <div className={styles.comingSoon}>
          <p className={styles.comingSoonText}>
            Em breve você encontrará aqui os eventos e campanhas de adoção perto de você.
          </p>
          <Link href="/pets" className={styles.ctaLink}>
            Ver pets disponíveis para adoção agora
          </Link>
        </div>

      </div>
    </div>
  )
}
