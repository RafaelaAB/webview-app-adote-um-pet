'use client'

/**
 * PÁGINA DE DETALHE DO PET — rota: /pets/[id]
 *
 * Exibe todas as informações de um pet específico.
 * O [id] entre colchetes é uma rota dinâmica do Next.js:
 * /pets/1 → mostra o pet com id "1"
 * /pets/3 → mostra o pet com id "3"
 *
 * O que é uma Rota Dinâmica?
 * ───────────────────────────
 * No Next.js App Router, uma pasta com nome entre colchetes (ex: [id])
 * cria uma rota dinâmica. O valor do segmento da URL fica disponível
 * via hook useParams().
 *
 * O que é o Router aqui?
 * ──────────────────────
 * Este arquivo usa DOIS recursos de navegação:
 *
 *   1. useParams() — hook do Next.js que lê os parâmetros da URL.
 *      Ex: na URL /pets/3, params.id será "3".
 *
 *   2. useRouter() — hook do Next.js que permite navegar programaticamente.
 *      router.back() volta para a página anterior no histórico do browser
 *      (equivalente ao botão "Voltar" do browser).
 *
 * Hooks usados:
 *   - useParams    → lê o id da URL
 *   - useRouter    → permite usar router.back()
 *   - usePetContext → acessa getPetById e loading do contexto global
 */

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, MapPin, Check, X, Heart } from 'lucide-react'
import { usePetContext } from '@/context/PetContext'
import Button from '@/components/Button/Button'
import styles from './pet-detail.module.css'

/**
 * PetDetailPage — componente da página de detalhe do pet.
 */
export default function PetDetailPage() {
  /**
   * useParams() lê os parâmetros dinâmicos da URL atual.
   * Como a pasta se chama [id], o parâmetro disponível é params.id.
   */
  const params = useParams()

  /**
   * useRouter() retorna o objeto router com métodos de navegação.
   * Aqui usamos apenas router.back() para voltar à página anterior.
   */
  const router = useRouter()

  // Acessa os dados globais via contexto
  const { getPetById, loading } = usePetContext()

  /**
   * Garante que petId sempre seja uma string.
   * params.id pode ser string ou string[] (em rotas catch-all) então
   * normalizamos para string simples usando typeof e optional chaining (?.).
   */
  const petId = typeof params.id === 'string' ? params.id : params.id?.[0] ?? ''

  // Busca o pet pelo id extraído da URL
  const pet = getPetById(petId)

  // Estado de carregamento: exibe um skeleton enquanto os dados chegam
  if (loading) {
    return (
      <div className={styles.page}>
        <div className={`container ${styles.skeleton}`} aria-label="Carregando..." />
      </div>
    )
  }

  // Pet não encontrado: id inválido ou pet já foi removido
  if (!pet) {
    return (
      <div className={styles.page}>
        <div className={`container ${styles.notFound}`}>
          <span className={styles.notFoundIcon}>🐾</span>
          <h2>Pet não encontrado</h2>
          <p>Esse pet pode já ter sido adotado ou não existe.</p>
          <Button as="link" href="/pets">
            Ver todos os pets
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">

        {/**
         * Botão Voltar — usa router.back() para navegar para a página anterior
         * no histórico do browser, sem precisar saber qual era a URL anterior.
         */}
        <button
          onClick={() => router.back()}
          className={styles.backBtn}
          aria-label="Voltar"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar
        </button>

        <div className={styles.detail}>

          {/* Imagem do pet com badge de status sobreposto */}
          <div className={styles.imageWrapper}>
            <Image
              src={pet.image}
              alt={`Foto de ${pet.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              priority   // priority=true carrega a imagem com alta prioridade (above the fold)
              unoptimized
            />
            {/* Badge de status (Disponível / Adotado / Pendente) */}
            <span className={styles.statusBadge}>{pet.status}</span>
          </div>

          {/* Painel de informações do pet */}
          <div className={styles.info}>

            {/* Categoria, nome, raça e botão de favoritar */}
            <div className={styles.infoTop}>
              <div>
                <span className={styles.category}>{pet.category}</span>
                <h1 className={styles.name}>{pet.name}</h1>
                <p className={styles.breed}>{pet.breed}</p>
              </div>
              {/* Botão de favoritar — sem funcionalidade implementada ainda */}
              <button className={styles.favoriteBtn} aria-label="Favoritar">
                <Heart size={22} strokeWidth={1.8} />
              </button>
            </div>

            {/* Localização com ícone */}
            <div className={styles.location}>
              <MapPin size={16} className={styles.locationIcon} aria-hidden="true" />
              {pet.location}
            </div>

            {/**
             * Atributos do pet: Idade, Sexo, Porte.
             * Usa .map() para não repetir o mesmo JSX 3 vezes.
             */}
            <div className={styles.attributes}>
              {[
                { label: 'Idade', value: pet.age },
                { label: 'Sexo', value: pet.gender },
                { label: 'Porte', value: pet.size },
              ].map((attr) => (
                <div key={attr.label} className={styles.attrCard}>
                  <span className={styles.attrLabel}>{attr.label}</span>
                  <span className={styles.attrValue}>{attr.value}</span>
                </div>
              ))}
            </div>

            {/**
             * Indicadores de saúde: vacinação e castração.
             * HealthItem é um sub-componente definido abaixo neste arquivo.
             */}
            <div className={styles.healthInfo}>
              <HealthItem label="Vacinado" ok={pet.vaccinated} />
              <HealthItem label="Castrado" ok={pet.castrated} />
            </div>

            {/* Descrição longa do pet */}
            <div className={styles.descriptionBlock}>
              <h2 className={styles.descTitle}>Sobre {pet.name}</h2>
              <p className={styles.description}>{pet.description}</p>
            </div>

            {/* Botão de adoção */}
            <Button as="link" href="/cadastrar" size="lg" fullWidth>
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
 * HealthItem — sub-componente de indicador de saúde.
 *
 * Exibe um ícone verde com check (✓) ou vermelho com X (✗)
 * dependendo se o valor "ok" é true ou false.
 *
 * É um componente local (não exportado) pois só é usado nesta página.
 *
 * @param label — texto descritivo ("Vacinado" ou "Castrado")
 * @param ok    — true = sim, false = não
 */
function HealthItem({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
      {/* Ícone circular verde (check) ou vermelho (X) */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: ok ? 'var(--color-accent)' : '#fee2e2', // verde ou vermelho claro
          color: ok ? '#ffffff' : '#ef4444',
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {/* Renderiza o ícone correto dependendo do valor ok */}
        {ok ? <Check size={13} /> : <X size={13} />}
      </span>
      <span style={{ color: 'var(--color-text-secondary)' }}>
        {label}: <strong style={{ color: 'var(--color-text-primary)' }}>{ok ? 'Sim' : 'Não'}</strong>
      </span>
    </div>
  )
}
