/**
 * BackButton — botão "Voltar" reutilizável
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Por que este componente existe?
 * ────────────────────────────────
 * O botão de voltar aparecia em 4 páginas diferentes (pets, cadastrar,
 * adotar, busca) com código idêntico:
 *
 *   <button onClick={() => router.back()} className={styles.backBtn} aria-label="Voltar">
 *     <ArrowLeft size={18} aria-hidden="true" />
 *     Voltar
 *   </button>
 *
 * Além disso, cada página tinha uma cópia do CSS `.backBtn` no seu módulo.
 * Ao centralizar em um componente, qualquer mudança visual (cor, ícone,
 * espaçamento) é feita uma única vez e reflete em toda a aplicação.
 *
 * Como funciona a navegação?
 * ───────────────────────────
 * Por padrão, chama router.back() — equivalente ao botão "←" do browser.
 * Isso funciona porque o Next.js mantém um histórico de navegação no cliente.
 *
 * O prop `href` permite forçar um destino específico quando não há histórico
 * confiável (ex: o usuário chegou à página por link direto externo).
 *
 *   <BackButton />                    → router.back()
 *   <BackButton href={ROUTES.HOME} /> → router.push('/')
 *
 * Por que 'use client'?
 * ──────────────────────
 * useRouter() é um hook do Next.js que só funciona no lado do cliente
 * (browser), pois precisa acessar o histórico de navegação do browser.
 * Componentes que usam hooks de rota precisam ser Client Components.
 *
 * Acessibilidade:
 * ────────────────
 * - `aria-label` descreve a ação para leitores de tela
 * - `type="button"` evita que o botão dispare submit em formulários
 * - O ícone tem `aria-hidden="true"` porque o texto "Voltar" já é suficiente
 */

'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import styles from './BackButton.module.css'

interface BackButtonProps {
  /**
   * Rota de destino explícita.
   * Se não fornecido, chama router.back() (volta no histórico do browser).
   * Use quando o usuário pode ter chegado à página sem histórico anterior.
   */
  href?: string

  /** Texto exibido no botão e usado como aria-label. Padrão: "Voltar" */
  label?: string

  /** Identificador para testes automatizados */
  'data-testid'?: string

  /** Classe CSS adicional para ajuste de posicionamento na página pai */
  className?: string
}

/**
 * BackButton — botão de navegação para a página anterior.
 */
export default function BackButton({
  href,
  label = 'Voltar',
  'data-testid': testId,
  className,
}: BackButtonProps) {
  const router = useRouter()

  function handleClick() {
    if (href) {
      // Navegação explícita: vai para a rota informada
      router.push(href)
    } else {
      // Navegação histórica: volta para a página anterior (como o botão ← do browser)
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
      {/* aria-hidden="true": o ícone é decorativo — o texto "Voltar" já descreve a ação */}
      <ArrowLeft size={18} aria-hidden="true" />
      {label}
    </button>
  )
}
