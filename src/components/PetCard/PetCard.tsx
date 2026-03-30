'use client'

/**
 * COMPONENTE: PetCard
 *
 * Card clicável que exibe as informações resumidas de um pet.
 * É usado nas páginas de listagem (home e /pets).
 *
 * Ao clicar no card, o usuário navega para a página de detalhe
 * daquele pet (/pets/[id]), usando o componente <Link> do Next.js.
 *
 * O que é o Router aqui?
 * ──────────────────────
 * Este componente usa <Link> do Next.js para navegação. O Link é mais
 * eficiente que um <a> comum porque faz navegação client-side (SPA),
 * sem recarregar a página inteira. O Next.js também pré-carrega a página
 * de destino automaticamente quando o Link entra na viewport.
 */

import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Pet } from '@/types'
import styles from './PetCard.module.css'

/**
 * Mapa de emojis por categoria — associa cada tipo de pet a um emoji.
 * Record<string, string> é um objeto onde chave e valor são strings.
 */
const categoryEmoji: Record<string, string> = {
  Cachorro: '🐶',
  Gato: '🐱',
  Ave: '🐦',
  Coelho: '🐰',
  Outro: '🐾',
}

/**
 * Props do PetCard — recebe apenas um objeto Pet completo.
 */
interface PetCardProps {
  pet: Pet // objeto com todas as informações do pet (veja src/types/index.ts)
}

/**
 * PetCard — card clicável com informações resumidas do pet.
 *
 * @param pet — dados do pet a ser exibido
 */
export default function PetCard({ pet }: PetCardProps) {
  return (
    /**
     * O card inteiro é envolvido em um <Link> para que qualquer clique
     * nele navegue para a página de detalhe do pet.
     * data-testid="pet-card" é usado pelos testes Cypress para encontrar o elemento.
     */
    <Link href={`/pets/${pet.id}`} className={styles.card} data-testid="pet-card">

      {/* Container da imagem */}
      <div className={styles.imageWrapper}>
        {/**
         * Image é o componente otimizado de imagens do Next.js.
         * - fill: a imagem preenche todo o container pai
         * - sizes: indica ao browser qual tamanho de imagem baixar em cada viewport
         * - unoptimized: necessário para imagens externas (picsum.photos)
         *   sem configuração de domínios no next.config.ts
         */}
        <Image
          src={pet.image}
          alt={`Foto de ${pet.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={styles.image}
          unoptimized
        />

        {/* Badge com categoria e emoji, exibido sobre a imagem */}
        <span className={styles.categoryBadge}>
          <span aria-hidden="true">{categoryEmoji[pet.category]}</span>
          {pet.category}
        </span>

        {/* Badge de status (Disponível / Adotado / Pendente) com cor diferente */}
        <span
          className={`${styles.statusBadge} ${
            pet.status === 'Disponível' ? styles.statusAvailable : styles.statusPending
          }`}
        >
          {pet.status}
        </span>
      </div>

      {/* Informações textuais do pet */}
      <div className={styles.info}>
        <h3 className={styles.name}>{pet.name}</h3>
        <p className={styles.breed}>{pet.breed}</p>

        {/* Idade e sexo separados por um ponto decorativo */}
        <div className={styles.meta}>
          <span className={styles.metaItem}>{pet.age}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.metaItem}>{pet.gender}</span>
        </div>

        {/* Localização com ícone de pin do Lucide */}
        <div className={styles.location}>
          <MapPin size={13} className={styles.locationIcon} aria-hidden="true" />
          <span>{pet.location}</span>
        </div>
      </div>
    </Link>
  )
}
