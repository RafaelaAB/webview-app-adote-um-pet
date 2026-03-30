'use client'

/**
 * PÁGINA DE DETALHE DO PET — rota: /pets/[id]
 *
 * Exibe todas as informações de um pet específico.
 * O [id] entre colchetes é uma rota dinâmica do Next.js.
 */

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, MapPin, Check, X, Heart } from 'lucide-react'
import { usePetContext } from '@/context/PetContext'
import Button from '@/components/Button/Button'
import styles from './pet-detail.module.css'

export default function PetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getPetById, loading } = usePetContext()

  const petId = typeof params.id === 'string' ? params.id : params.id?.[0] ?? ''
  const pet = getPetById(petId)

  if (loading) {
    return (
      <div className={styles.page}>
        <div
          data-testid="pet-detail-loading"
          className={`container ${styles.skeleton}`}
          aria-label="Carregando..."
        />
      </div>
    )
  }

  if (!pet) {
    return (
      <div className={styles.page}>
        <div data-testid="pet-detail-not-found" className={`container ${styles.notFound}`}>
          <span className={styles.notFoundIcon}>🐾</span>
          <h2>Pet não encontrado</h2>
          <p>Esse pet pode já ter sido adotado ou não existe.</p>
          <Button as="link" href="/pets" data-testid="pet-detail-btn-back-to-list">
            Ver todos os pets
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="pet-detail-page" className={styles.page}>
      <div className="container">

        {/* Botão Voltar */}
        <button
          data-testid="pet-detail-btn-back"
          onClick={() => router.back()}
          className={styles.backBtn}
          aria-label="Voltar"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar
        </button>

        <div className={styles.detail}>

          {/* Imagem com badge de status */}
          <div className={styles.imageWrapper}>
            <Image
              src={pet.image}
              alt={`Foto de ${pet.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              priority
              unoptimized
            />
            <span
              data-testid="pet-detail-status"
              className={styles.statusBadge}
            >
              {pet.status}
            </span>
          </div>

          {/* Painel de informações */}
          <div className={styles.info}>

            <div className={styles.infoTop}>
              <div>
                <span
                  data-testid="pet-detail-category"
                  className={styles.category}
                >
                  {pet.category}
                </span>
                <h1
                  data-testid="pet-detail-name"
                  className={styles.name}
                >
                  {pet.name}
                </h1>
                <p
                  data-testid="pet-detail-breed"
                  className={styles.breed}
                >
                  {pet.breed}
                </p>
              </div>
              <button
                data-testid="pet-detail-btn-favorite"
                className={styles.favoriteBtn}
                aria-label="Favoritar"
              >
                <Heart size={22} strokeWidth={1.8} />
              </button>
            </div>

            {/* Localização */}
            <div
              data-testid="pet-detail-location"
              className={styles.location}
            >
              <MapPin size={16} className={styles.locationIcon} aria-hidden="true" />
              {pet.location}
            </div>

            {/* Atributos: Idade, Sexo, Porte */}
            <div data-testid="pet-detail-attributes" className={styles.attributes}>
              {[
                { label: 'Idade', value: pet.age },
                { label: 'Sexo', value: pet.gender },
                { label: 'Porte', value: pet.size },
              ].map((attr) => (
                <div
                  key={attr.label}
                  className={styles.attrCard}
                  data-testid={`pet-detail-attr-${attr.label.toLowerCase()}`}
                >
                  <span className={styles.attrLabel}>{attr.label}</span>
                  <span className={styles.attrValue}>{attr.value}</span>
                </div>
              ))}
            </div>

            {/* Indicadores de saúde */}
            <div data-testid="pet-detail-health" className={styles.healthInfo}>
              <HealthItem label="Vacinado" ok={pet.vaccinated} testId="pet-detail-health-vaccinated" />
              <HealthItem label="Castrado" ok={pet.castrated} testId="pet-detail-health-castrated" />
            </div>

            {/* Descrição */}
            <div data-testid="pet-detail-description-block" className={styles.descriptionBlock}>
              <h2
                data-testid="pet-detail-description-title"
                className={styles.descTitle}
              >
                Sobre {pet.name}
              </h2>
              <p
                data-testid="pet-detail-description"
                className={styles.description}
              >
                {pet.description}
              </p>
            </div>

            {/* Botão de adoção */}
            <Button
              as="link"
              href="/cadastrar"
              size="lg"
              fullWidth
              data-testid="pet-detail-btn-adopt"
            >
              <Heart size={18} aria-hidden="true" />
              Quero adotar {pet.name}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * HealthItem — indicador de vacinação/castração com ícone.
 */
function HealthItem({ label, ok, testId }: { label: string; ok: boolean; testId: string }) {
  return (
    <div
      data-testid={testId}
      style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: ok ? 'var(--color-accent)' : '#fee2e2',
          color: ok ? '#ffffff' : '#ef4444',
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {ok ? <Check size={13} /> : <X size={13} />}
      </span>
      <span style={{ color: 'var(--color-text-secondary)' }}>
        {label}: <strong style={{ color: 'var(--color-text-primary)' }}>{ok ? 'Sim' : 'Não'}</strong>
      </span>
    </div>
  )
}
