'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Building2, MapPin, Phone, Mail, Heart } from 'lucide-react'
import { ongs } from '@/data/ongs'
import { createLogger } from '@/lib/logger'
import styles from './ongs.module.css'

const log = createLogger('OngsPage')

export default function OngsPage() {
  const router = useRouter()

  log.info('página de ONGs acessada')

  return (
    <div data-testid="ongs-page" className={styles.page}>
      <div className="container">

        <button
          data-testid="ongs-btn-back"
          className={styles.backBtn}
          onClick={() => router.back()}
          type="button"
          aria-label="Voltar à página anterior"
        >
          <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
          <span>Voltar</span>
        </button>

        <header className={styles.pageHeader}>
          <span className={styles.iconWrapper} aria-hidden="true">
            <Building2 size={40} strokeWidth={1.5} />
          </span>
          <h1 data-testid="ongs-title" className={styles.pageTitle}>
            ONGs Parceiras
          </h1>
          <p className={styles.pageSubtitle}>
            Conheça as organizações que trabalham incansavelmente pelo bem-estar animal.
            Cada resgate, cada castração e cada adoção só é possível com o apoio de pessoas como você.
          </p>
        </header>

        <section
          data-testid="ongs-donation-banner"
          className={styles.donationBanner}
          aria-labelledby="donation-title"
        >
          <span className={styles.donationEmoji} aria-hidden="true">🐾</span>

          <h2 id="donation-title" className={styles.donationTitle}>
            Sua doação salva vidas
          </h2>

          <p className={styles.donationText}>
            Milhares de animais vivem nas ruas, passando fome, frio e medo todos os dias.
            As ONGs abaixo dependem{' '}
            <span className={styles.donationHighlight}>exclusivamente de doações e voluntários</span>{' '}
            para continuar resgatando, cuidando e encontrando lares para esses pets.
            Um real por dia já faz diferença — imagine o que uma comunidade unida pode fazer.
          </p>

          <div className={styles.donationStats} aria-label="Impacto das doações">
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>pets adotados</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>200+</span>
              <span className={styles.statLabel}>castrações/ano</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>6</span>
              <span className={styles.statLabel}>estados atendidos</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1.200+</span>
              <span className={styles.statLabel}>voluntários</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="ongs-list-title">
          <h2 id="ongs-list-title" className={styles.sectionTitle}>
            Organizações cadastradas
          </h2>

          <ul
            data-testid="ongs-grid"
            className={styles.grid}
            role="list"
          >
            {ongs.map((ong) => (
              <li
                key={ong.id}
                data-testid={`ong-card-${ong.id}`}
                className={styles.card}
              >

                <div className={styles.cardHeader}>
                  <div className={styles.cardAvatar} aria-hidden="true">
                    <Heart size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 data-testid={`ong-name-${ong.id}`} className={styles.cardName}>
                      {ong.name}
                    </h3>
                    <span data-testid={`ong-city-${ong.id}`} className={styles.cardCity}>
                      {ong.city}
                    </span>
                  </div>
                </div>

                <p className={styles.cardDescription}>{ong.description}</p>

                <hr className={styles.cardDivider} />

                <address className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <MapPin
                      size={15}
                      strokeWidth={2}
                      className={styles.contactIcon}
                      aria-hidden="true"
                    />
                    <span data-testid={`ong-address-${ong.id}`}>{ong.address}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <Phone
                      size={15}
                      strokeWidth={2}
                      className={styles.contactIcon}
                      aria-hidden="true"
                    />
                    <a
                      data-testid={`ong-phone-${ong.id}`}
                      href={`tel:${ong.phone.replace(/\D/g, '')}`}
                      aria-label={`Ligar para ${ong.name}: ${ong.phone}`}
                    >
                      {ong.phone}
                    </a>
                  </div>
                  <div className={styles.contactItem}>
                    <Mail
                      size={15}
                      strokeWidth={2}
                      className={styles.contactIcon}
                      aria-hidden="true"
                    />
                    <a
                      data-testid={`ong-email-${ong.id}`}
                      href={`mailto:${ong.email}`}
                      aria-label={`Enviar e-mail para ${ong.name}`}
                    >
                      {ong.email}
                    </a>
                  </div>
                </address>

                <hr className={styles.cardDivider} />

                <div>
                  <p className={styles.helpTitle} aria-label={`Como ajudar ${ong.name}`}>
                    Como ajudar
                  </p>
                  <ul className={styles.helpList} role="list">
                    {ong.howToHelp.map((item) => (
                      <li key={item} className={styles.helpItem}>
                        <span className={styles.helpDot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {ong.pixKey && (
                  <div className={styles.pixBlock} aria-label={`Chave PIX de ${ong.name}`}>
                    <span className={styles.pixLabel}>PIX</span>
                    <span
                      data-testid={`ong-pix-${ong.id}`}
                      className={styles.pixKey}
                    >
                      {ong.pixKey}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  )
}
