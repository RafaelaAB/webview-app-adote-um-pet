/**
 * COMPONENTE: Skeleton
 *
 * Bloco de placeholder animado com efeito shimmer (brilho deslizante).
 * Usado para representar conteúdo que ainda está sendo carregado,
 * evitando a sensação de "tela em branco" durante o loading.
 *
 * Uso básico:
 *   <Skeleton height={200} />                    — bloco retangular
 *   <Skeleton width="60%" height={20} />         — linha de texto
 *   <Skeleton height={20} radius="full" />       — pílula (ex: badge)
 *
 * O componente é um Server Component — não usa hooks nem browser APIs.
 * O efeito shimmer é puramente CSS.
 */

import styles from './Skeleton.module.css'

type RadiusVariant = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface SkeletonProps {
  /** Largura do bloco. Aceita valor CSS (ex: '100%', '200px'). Padrão: '100%' */
  width?: string | number
  /** Altura do bloco. Aceita valor CSS ou número (px). Obrigatório */
  height: string | number
  /** Arredondamento das bordas. Usa os tokens do design system */
  radius?: RadiusVariant
  /** Classe CSS adicional para customizações pontuais */
  className?: string
}

/**
 * Converte o valor de width/height para string CSS.
 * Números são interpretados como pixels.
 */
function toCssValue(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value
}

/** Mapa dos tokens de border-radius do design system */
const RADIUS_MAP: Record<RadiusVariant, string> = {
  sm:   'var(--radius-sm)',
  md:   'var(--radius-md)',
  lg:   'var(--radius-lg)',
  xl:   'var(--radius-xl)',
  full: 'var(--radius-full)',
}

export default function Skeleton({
  width = '100%',
  height,
  radius = 'md',
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      aria-hidden="true" /* esconde do leitor de tela — é apenas decorativo */
      style={{
        width: toCssValue(width),
        height: toCssValue(height),
        borderRadius: RADIUS_MAP[radius],
      }}
    />
  )
}
