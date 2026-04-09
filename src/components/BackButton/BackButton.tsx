'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import styles from './BackButton.module.css'

interface BackButtonProps {

  href?: string

  label?: string

  'data-testid'?: string

  className?: string
}

export default function BackButton({
  href,
  label = 'Voltar',
  'data-testid': testId,
  className,
}: BackButtonProps) {
  const router = useRouter()

  function handleClick() {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${styles.backBtn}${className ? ` ${className}` : ''}`}
      aria-label={label}
      data-testid={testId}
    >

      <ArrowLeft size={18} aria-hidden="true" />
      {label}
    </button>
  )
}
