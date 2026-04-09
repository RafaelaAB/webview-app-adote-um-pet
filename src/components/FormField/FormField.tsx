import styles from './FormField.module.css'

interface FieldProps {

  label: string

  name: string

  type: string

  value: string

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

  error?: string

  placeholder?: string

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

      <label className={styles.label} htmlFor={name}>
        {label}{' '}

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

interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
  required?: boolean

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

        className={`${styles.input} ${styles.select}${error ? ` ${styles.inputError}` : ''}`}
        required={required}
        aria-describedby={error ? `${name}-error` : undefined}
      >

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

interface TextareaFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  placeholder?: string
  required?: boolean

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
