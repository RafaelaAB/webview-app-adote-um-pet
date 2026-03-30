/**
 * COMPONENTE: Footer
 *
 * Rodapé da aplicação. Exibe:
 *   - Logo e nome da marca
 *   - Créditos da desenvolvedora
 *   - Links para GitHub e Instagram
 *
 * Não usa hooks nem router — é um componente puramente visual (estático).
 * Não recebe props; todas as informações são fixas no código.
 *
 * Acessibilidade:
 *   - Links externos usam target="_blank" para abrir em nova aba
 *   - rel="noopener noreferrer" é uma prática de segurança obrigatória
 *     ao usar target="_blank": impede que a nova aba acesse window.opener
 *   - aria-label descreve o destino do link para leitores de tela
 */

import { Github, Instagram, Heart } from 'lucide-react'
import styles from './Footer.module.css'

/**
 * Footer — rodapé estático da aplicação.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Identidade visual da marca */}
        <div className={styles.brand}>
          <span className={styles.brandIcon}>🐾</span>
          <span className={styles.brandName}>Adote um Pet</span>
        </div>

        {/* Créditos da desenvolvedora com ícone de coração */}
        <p className={styles.credits}>
          Desenvolvido com{' '}
          {/* aria-hidden="true" oculta o ícone de leitores de tela (decorativo) */}
          <Heart size={14} className={styles.heartIcon} aria-hidden="true" />{' '}
          por{' '}
          <strong>Rafaela Andrade Batista</strong>
        </p>

        {/* Links para redes sociais */}
        <div className={styles.socials}>
          <a
            href="https://github.com/rafaela-andrade"
            target="_blank"           // abre em nova aba
            rel="noopener noreferrer" // segurança: evita acesso ao window.opener
            className={styles.socialLink}
            aria-label="GitHub de Rafaela Andrade Batista"
          >
            <Github size={20} strokeWidth={1.8} />
            <span>GitHub</span>
          </a>

          <a
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
