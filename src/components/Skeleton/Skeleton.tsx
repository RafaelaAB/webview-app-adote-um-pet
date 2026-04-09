import styles from './Skeleton.module.css'

type RadiusVariant = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface SkeletonProps {

  width?: string | number

  height: string | number

  radius?: RadiusVariant

  className?: string
}

function toCssValue(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value
}

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
      aria-hidden="true"
      style={{
        width: toCssValue(width),
        height: toCssValue(height),
        borderRadius: RADIUS_MAP[radius],
      }}
    />
  )
}
