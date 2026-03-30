/**
 * COMPONENTE: Footer
 *
 * Rodapé da aplicação. Exibe:
 *   - Logo e nome da marca
 *   - Créditos da desenvolvedora
 *   - Links para GitHub e Instagram
 */

import { Github, Instagram, Heart } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer data-testid="footer" className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Identidade visual da marca */}
        <div data-testid="footer-brand" className={styles.brand}>
          <span className={styles.brandIcon}>🐾</span>
          <span className={styles.brandName}>Adote um Pet</span>
        </div>

        {/* Créditos da desenvolvedora */}
        <p className={styles.credits}>
          Desenvolvido com{' '}
          <Heart size={14} className={styles.heartIcon} aria-hidden="true" />{' '}
          por{' '}
          <strong>Rafaela Andrade Batista</strong>
        </p>

        {/* Links para redes sociais */}
        <div className={styles.socials}>
          <a
            data-testid="footer-link-github"
            href="https://github.com/rafaela-andrade"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub de Rafaela Andrade Batista"
          >
            <Github size={20} strokeWidth={1.8} />
            <span>GitHub</span>
          </a>

          <a
            data-testid="footer-link-instagram"
            href="https://instagram.com/rafaela.andrade"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram de Rafaela Andrade Batista"
          >
            <Instagram size={20} strokeWidth={1.8} />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
