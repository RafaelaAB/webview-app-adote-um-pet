/**
 * COMPONENTES DE CAMPO DE FORMULÁRIO
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Por que este arquivo existe?
 * ─────────────────────────────
 * Os componentes Field e SelectField viviam como funções privadas dentro de
 * cadastrar/page.tsx. Isso impedia seu reuso em outros formulários futuros.
 *
 * Ao extraí-los para um arquivo próprio:
 *   - Qualquer nova página com formulário pode importar esses campos
 *   - O visual e comportamento de acessibilidade ficam consistentes
 *   - O CSS é compartilhado via FormField.module.css
 *
 * Padrão de acessibilidade aplicado em todos os campos:
 * ────────────────────────────────────────────────────────
 *   <label htmlFor="name">Nome *</label>      ← associa rótulo ao input (WCAG 1.3.1)
 *   <input id="name" aria-describedby="..." → aponta para a mensagem de erro
 *   <span id="name-error" role="alert">      ← anunciado imediatamente por leitores de tela
 *
 *   - htmlFor + id: garante que clicar no label foca o input
 *   - aria-describedby: conecta o input à mensagem de erro para leitores de tela
 *   - role="alert": a mensagem de erro é anunciada automaticamente quando aparece
 *
 * Componentes exportados:
 * ─────────────────────────
 *   Field         → <input> de qualquer type (text, email, tel, etc.)
 *   SelectField   → <select> com lista de opções
 *   TextareaField → <textarea> com resize vertical
 *
 * Uso:
 * ─────
 *   import { Field, SelectField, TextareaField } from '@/components/FormField/FormField'
 *
 *   <Field
 *     label="Nome do pet"
 *     name="name"
 *     type="text"
 *     value={form.name}
 *     onChange={handleChange}
 *     error={errors.name}
 *     required
 *   />
 */

import styles from './FormField.module.css'

/* ── Field ──────────────────────────────────────────────────────────────────
 * Input genérico de texto. Suporta qualquer type HTML:
 * text, email, tel, password, number, url, date, etc.
 */

interface FieldProps {
  /** Texto do rótulo exibido acima do input */
  label: string
  /** name e id do input — devem ser únicos na página */
  name: string
  /** Tipo HTML do input (text, email, tel, etc.) */
  type: string
  /** Valor controlado — sempre vem do estado do componente pai */
  value: string
  /** Handler de mudança — atualiza o estado no componente pai */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** Mensagem de erro para exibir abaixo do campo (undefined = sem erro) */
  error?: string
  /** Texto de exemplo exibido quando o campo está vazio */
  placeholder?: string
  /** Se true, exibe asterisco (*) e marca o input como required */
  required?: boolean
}

export function Field({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  required,
}: FieldProps) {
  return (
    <div className={styles.fieldGroup}>
      {/* htmlFor={name} vincula o label ao input com id={name} */}
      <label className={styles.label} htmlFor={name}>
        {label}{' '}
        {/* Asterisco visual para campos obrigatórios (acompanhe com texto sr-only se necessário) */}
        {required && <span className={styles.required}>*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={`register-input-${name}`}
        className={`${styles.input}${error ? ` ${styles.inputError}` : ''}`}
        required={required}
        /* aria-describedby aponta para o id da mensagem de erro abaixo,
           para que leitores de tela anunciem o erro junto com o campo */
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {error && (
        /* role="alert": o browser anuncia este texto imediatamente ao aparecer,
           sem necessidade de o usuário navegar até ele */
        <span
          data-testid={`register-error-${name}`}
          className={styles.errorMsg}
          id={`${name}-error`}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  )
}

/* ── SelectField ────────────────────────────────────────────────────────────
 * Select (dropdown) com lista de opções fixa.
 * Sempre inclui uma opção vazia inicial ("Selecione...") para forçar
 * escolha explícita do usuário.
 */

interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
  required?: boolean
  /** Lista de opções: { value: string enviado, label: string exibido } */
  options: { value: string; label: string }[]
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  required,
  options,
}: SelectFieldProps) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={name}>
        {label}{' '}
        {required && <span className={styles.required}>*</span>}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        data-testid={`register-select-${name}`}
        /* styles.select adiciona seta customizada via background-image SVG
           para substituir a seta padrão do browser (que varia por plataforma) */
        className={`${styles.input} ${styles.select}${error ? ` ${styles.inputError}` : ''}`}
        required={required}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {/* Opção vazia obriga o usuário a escolher explicitamente */}
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <span
          data-testid={`register-error-${name}`}
          className={styles.errorMsg}
          id={`${name}-error`}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  )
}

/* ── TextareaField ──────────────────────────────────────────────────────────
 * Área de texto multilinha com resize vertical.
 * Ideal para campos de descrição ou observações longas.
 */

interface TextareaFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  placeholder?: string
  required?: boolean
  /** Número de linhas visíveis inicialmente. Padrão: 4 */
  rows?: number
}

export function TextareaField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  rows = 4,
}: TextareaFieldProps) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={name}>
        {label}{' '}
        {required && <span className={styles.required}>*</span>}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={`register-input-${name}`}
        /* styles.textarea inclui resize: vertical — o usuário pode aumentar
           a altura arrastando o canto inferior direito */
        className={`${styles.textarea}${error ? ` ${styles.inputError}` : ''}`}
        rows={rows}
        required={required}
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {error && (
        <span
          data-testid={`register-error-${name}`}
          className={styles.errorMsg}
          id={`${name}-error`}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  )
}
