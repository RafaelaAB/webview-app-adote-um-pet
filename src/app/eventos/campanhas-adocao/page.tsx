'use client'

/**
 * PÁGINA: Campanhas de Adoção
 * Rota: /eventos/campanhas-adocao
 *
 * Exibe campanhas de adoção de pets disponíveis na cidade do usuário.
 * Página em construção — estrutura preparada para integração futura com API.
 */

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

        {/* Navegação de volta */}
        <button
          className={styles.backBtn}
          onClick={() => router.back()}
          type="button"
          aria-label="Voltar à página anterior"
        >
          <ArrowLeft size={18} strokeWidth={2} />
          <span>Voltar</span>
        </button>

        {/* Cabeçalho da página */}
        <header className={styles.header}>
          <span className={styles.iconWrapper} aria-hidden="true">
            <MapPin size={40} strokeWidth={1.5} />
          </span>
          <h1 className={styles.title}>Campanhas de Adoção</h1>
          <p className={styles.subtitle}>
            Encontre campanhas de adoção de pets disponíveis na sua cidade e dê um lar cheio de amor para quem precisa.
          </p>
        </header>

        {/* Conteúdo em construção */}
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
