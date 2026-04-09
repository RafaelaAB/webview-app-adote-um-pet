import Link from 'next/link'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children: React.ReactNode
  'data-testid'?: string
}

interface ButtonProps extends BaseProps {
  as?: 'button'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

interface LinkProps extends BaseProps {
  as: 'link'
  href: string
}

type Props = ButtonProps | LinkProps

export default function Button(props: Props) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    'data-testid': testId,
  } = props

  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (props.as === 'link') {
    return (
      <Link href={props.href} className={classes} data-testid={testId}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
      data-testid={testId}
    >
      {children}
    </button>
  )
}
