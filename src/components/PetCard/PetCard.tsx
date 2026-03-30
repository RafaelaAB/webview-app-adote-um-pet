'use client'

/**
 * COMPONENTE: PetCard
 *
 * Card clicável que exibe as informações resumidas de um pet.
 * É usado nas páginas de listagem (home e /pets).
 *
 * Ao clicar no card, o usuário navega para a página de detalhe
 * daquele pet (/pets/[id]), usando o componente <Link> do Next.js.
 */

import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Pet } from '@/types'
import styles from './PetCard.module.css'

const categoryEmoji: Record<string, string> = {
  Cachorro: '🐶',
  Gato: '🐱',
  Ave: '🐦',
  Coelho: '🐰',
  Outro: '🐾',
}

interface PetCardProps {
  pet: Pet
}

export default function PetCard({ pet }: PetCardProps) {
  return (
    <Link
      href={`/pets/${pet.id}`}
      className={styles.card}
      data-testid="pet-card"
    >
      {/* Imagem do pet */}
      <div className={styles.imageWrapper}>
        <Image
          src={pet.image}
          alt={`Foto de ${pet.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={styles.image}
          unoptimized
        />
        <span className={styles.categoryBadge} data-testid={`pet-card-category-${pet.id}`}>
          <span aria-hidden="true">{categoryEmoji[pet.category]}</span>
          {pet.category}
        </span>
        <span
          data-testid={`pet-card-status-${pet.id}`}
          className={`${styles.statusBadge} ${
            pet.status === 'Disponível' ? styles.statusAvailable : styles.statusPending
          }`}
        >
          {pet.status}
        </span>
      </div>

      {/* Informações textuais do pet */}
      <div className={styles.info}>
        <h3 className={styles.name} data-testid={`pet-card-name-${pet.id}`}>{pet.name}</h3>
        <p className={styles.breed} data-testid={`pet-card-breed-${pet.id}`}>{pet.breed}</p>
        <div className={styles.meta}>
          <span className={styles.metaItem} data-testid={`pet-card-age-${pet.id}`}>{pet.age}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.metaItem} data-testid={`pet-card-gender-${pet.id}`}>{pet.gender}</span>
        </div>
        <div className={styles.location} data-testid={`pet-card-location-${pet.id}`}>
          <MapPin size={13} className={styles.locationIcon} aria-hidden="true" />
          <span>{pet.location}</span>
        </div>
      </div>
    </Link>
  )
}
