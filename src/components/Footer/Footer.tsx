import { Github, Instagram, Heart } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer data-testid="footer" className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>

        <div data-testid="footer-brand" className={styles.brand}>

          <img
            src="/logo-icon.svg"
            alt=""
            width={24}
            height={22}
            className={styles.brandLogo}
            aria-hidden="true"
          />
          <span className={styles.brandName}>Adote um Pet</span>
        </div>

        <p className={styles.credits}>
          Desenvolvido com{' '}
          <Heart size={14} className={styles.heartIcon} aria-hidden="true" />{' '}
          <span className="sr-only">amor</span>
          por{' '}
          <strong>Rafaela Andrade Batista</strong>
        </p>

        <nav aria-label="Redes sociais" className={styles.socials}>
          <a
            data-testid="footer-link-github"
            href="https://github.com/RafaelaAB"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub de Rafaela Andrade Batista (abre em nova aba)"
          >
            <Github size={20} strokeWidth={1.8} aria-hidden="true" />
            <span>GitHub</span>
          </a>

          <a
            data-testid="footer-link-instagram"
            href="https://www.instagram.com/___hadouken/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram de Rafaela Andrade Batista (abre em nova aba)"
          >
            <Instagram size={20} strokeWidth={1.8} aria-hidden="true" />
            <span>Instagram</span>
          </a>
        </nav>
      </div>
    </footer>
  )
}
