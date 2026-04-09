'use client'

import { ArrowRight, PawPrint } from 'lucide-react'
import { usePets } from '@/hooks/usePets'
import PetCard from '@/components/PetCard/PetCard'
import Button from '@/components/Button/Button'
import styles from './page.module.css'

export default function HomePage() {
  const { pets, loading } = usePets()
  const featuredPets = pets.slice(0, 4)

  return (
    <>

      <section data-testid="home-hero" className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroInner}`}>

          <div className={styles.heroContent}>
            <span className={styles.heroBadge} data-testid="home-hero-badge">
              <PawPrint size={14} aria-hidden="true" />
              Adoção responsável
            </span>
            <h1
              id="hero-title"
              data-testid="home-hero-title"
              className={styles.heroTitle}
            >
              Salve uma vida e
              <br />
              <span className={styles.heroHighlight}>faça a sua feliz</span>
            </h1>
            <p data-testid="home-hero-text" className={styles.heroText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              vehicula metus in erat dignissim, eget faucibus elit luctus.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Donec tristique lorem a ligula laoreet, at
              malesuada justo ornare.
            </p>

            <div className={styles.heroCtas}>
              <Button
                as="link"
                href="/pets"
                size="lg"
                data-testid="home-btn-adopt"
              >
                Adotar agora
              </Button>
              <Button
                as="link"
                href="/cadastrar"
                size="lg"
                variant="outline"
                data-testid="home-btn-register"
              >
                Cadastrar pet
              </Button>
            </div>
          </div>

          <div className={styles.heroIllustration} aria-hidden="true">
            <div className={styles.heroCard}>
              <span className={styles.heroEmoji}>🐶</span>
              <p>Mais de 50 pets</p>
              <p>esperando por você</p>
            </div>
            <div className={`${styles.heroCard} ${styles.heroCardAccent}`}>
              <span className={styles.heroEmoji}>🐱</span>
              <p>Adoção gratuita</p>
              <p>100% segura</p>
            </div>
          </div>
        </div>
      </section>

      <section data-testid="home-pets-section" className={`${styles.section} ${styles.petsSection}`} aria-labelledby="pets-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2
              id="pets-title"
              data-testid="home-pets-title"
              className={styles.sectionTitle}
            >
              Veja os pets que precisam de ajuda
            </h2>
            <p data-testid="home-pets-subtitle" className={styles.sectionSubtitle}>
              Cada um deles tem uma história e está esperando por um lar cheio
              de amor. Será que o seu próximo companheiro está aqui?
            </p>
          </div>

          {loading ? (
            <div
              data-testid="home-pets-loading"
              className={styles.loadingGrid}
              role="status"
              aria-label="Carregando pets em destaque"
              aria-live="polite"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.skeleton} aria-hidden="true" />
              ))}
            </div>
          ) : (
            <div className={styles.petsGrid} data-testid="home-pets-grid">
              {featuredPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          )}

          <div className={styles.seeAll}>
            <Button
              as="link"
              href="/pets"
              variant="outline"
              size="lg"
              data-testid="home-btn-see-all"
            >
              Veja todos
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section data-testid="home-cta-section" className={styles.ctaSection} aria-labelledby="cta-title">
        <div className={`container ${styles.ctaInner}`}>
          <div className={styles.ctaContent}>
            <span className={styles.ctaEmoji} aria-hidden="true">🐾</span>
            <h2 id="cta-title" data-testid="home-cta-title" className={styles.ctaTitle}>
              Encontrou algum pet que precisa de ajuda?
            </h2>
            <p data-testid="home-cta-text" className={styles.ctaText}>
              Ajude-nos a encontrar um lar para ele. Basta preencher um rápido
              formulário e nós cuidamos do restante.
            </p>
            <Button
              as="link"
              href="/cadastrar"
              size="lg"
              data-testid="home-btn-cta-register"
            >
              Cadastre aqui
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section data-testid="home-about-section" className={`${styles.section} ${styles.aboutSection}`} aria-labelledby="about-title">
        <div className={`container ${styles.aboutInner}`}>
          <div className={styles.aboutText}>
            <h2 id="about-title" data-testid="home-about-title" className={styles.sectionTitle}>
              Quem somos nós
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
              scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
              nec congue eget, auctor vitae massa.
            </p>
            <p>
              Fusce consectetur scelerisque neque. Aenean luctus orci non quam
              vulputate, vel lobortis est vulputate. Sed porta erat sit amet
              vehicula semper. Nam at tempus lectus. Curabitur id neque at
              libero placerat mattis nec vitae purus.
            </p>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et malesuada
              fames ac turpis egestas. In dui magna, posuere eget, vestibulum et,
              tempor auctor, justo. In ac felis quis tortor malesuada pretium.
            </p>
            <Button
              as="link"
              href="/sobre"
              variant="secondary"
              size="md"
              data-testid="home-btn-about"
            >
              Saiba mais sobre nós
            </Button>
          </div>

          <div data-testid="home-about-stats" className={styles.aboutStats}>
            {[
              { value: '500+', label: 'Pets adotados' },
              { value: '8', label: 'Anos de atuação' },
              { value: '200+', label: 'Famílias felizes' },
              { value: '15', label: 'Cidades atendidas' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={styles.statCard}
                data-testid={`home-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
