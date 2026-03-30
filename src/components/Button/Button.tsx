/**
 * COMPONENTE: Button
 *
 * Um botão polimórfico — pode se comportar como um <button> HTML comum
 * ou como um link de navegação (<Link> do Next.js), dependendo da prop "as".
 *
 * Por que fazer isso?
 * ────────────────────
 * Visualmente, um botão e um link podem parecer idênticos no design.
 * Mas semanticamente são diferentes:
 *   - <button> executa uma ação (submeter formulário, abrir modal)
 *   - <Link> navega para outra página
 *
 * Com esse componente, você usa a mesma aparência para os dois casos,
 * apenas trocando a prop "as":
 *   <Button as="link" href="/pets">Ver pets</Button>   → vira um <Link>
 *   <Button onClick={handleClick}>Salvar</Button>      → vira um <button>
 *
 * Variantes de estilo disponíveis (mudam a aparência):
 *   - primary  → laranja (padrão)
 *   - secondary → azul marinho
 *   - outline  → borda, fundo transparente
 *   - ghost    → sem borda e sem fundo
 *
 * Tamanhos disponíveis:
 *   - sm → pequeno
 *   - md → médio (padrão)
 *   - lg → grande
 */

import Link from 'next/link'
import styles from './Button.module.css'

// Tipos que definem as opções aceitas pelas props
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Props base compartilhadas entre as duas versões do botão (button e link).
 */
interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children: React.ReactNode
  'data-testid'?: string // identificador para testes Cypress
}

/**
 * Props exclusivas da versão <button>.
 */
interface ButtonProps extends BaseProps {
  as?: 'button'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

/**
 * Props exclusivas da versão <Link>.
 */
interface LinkProps extends BaseProps {
  as: 'link'
  href: string
}

// União dos dois tipos: o componente aceita qualquer um dos dois formatos
type Props = ButtonProps | LinkProps

/**
 * Button — componente principal.
 *
 * Monta a string de classes CSS com base nas props recebidas,
 * depois decide qual elemento HTML renderizar (button ou Link).
 */
export default function Button(props: Props) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    'data-testid': testId,
  } = props

  /**
   * Constrói a lista de classes CSS.
   * filter(Boolean) remove strings vazias do array antes de juntar.
   */
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Se "as" for 'link', renderiza um <Link> do Next.js para navegação
  if (props.as === 'link') {
    return (
      <Link href={props.href} className={classes} data-testid={testId}>
        {children}
      </Link>
    )
  }

  // Caso padrão: renderiza um <button> HTML comum
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
