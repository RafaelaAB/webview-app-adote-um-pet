'use client'

/**
 * PÁGINA DE CADASTRO DE PET — rota: /cadastrar
 *
 * Formulário para registrar um novo pet para adoção.
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Button from '@/components/Button/Button'
import { createLogger } from '@/lib/logger'
import styles from './cadastrar.module.css'

const log = createLogger('CadastrarPage')

interface FormData {
  name: string
  category: string
  breed: string
  age: string
  gender: string
  size: string
  location: string
  description: string
  contactName: string
  contactPhone: string
}

const INITIAL_FORM: FormData = {
  name: '',
  category: '',
  breed: '',
  age: '',
  gender: '',
  size: '',
  location: '',
  description: '',
  contactName: '',
  contactPhone: '',
}

export default function CadastrarPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!form.category) newErrors.category = 'Categoria é obrigatória'
    if (!form.breed.trim()) newErrors.breed = 'Raça é obrigatória'
    if (!form.age.trim()) newErrors.age = 'Idade é obrigatória'
    if (!form.gender) newErrors.gender = 'Sexo é obrigatório'
    if (!form.size) newErrors.size = 'Porte é obrigatório'
    if (!form.location.trim()) newErrors.location = 'Localização é obrigatória'
    if (!form.description.trim()) newErrors.description = 'Descrição é obrigatória'
    if (!form.contactName.trim()) newErrors.contactName = 'Nome do responsável é obrigatório'
    if (!form.contactPhone.trim()) newErrors.contactPhone = 'Telefone é obrigatório'
    const hasErrors = Object.keys(newErrors).length > 0
    if (hasErrors) {
      log.warn('formulário inválido', { campos: Object.keys(newErrors) })
    }
    setErrors(newErrors)
    return !hasErrors
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    log.info('tentativa de envio do formulário', { pet: form.name, categoria: form.category })
    if (validate()) {
      log.info('pet cadastrado com sucesso', { nome: form.name, categoria: form.category, contato: form.contactName })
      setSubmitted(true)
    }
  }

  // Tela de sucesso após envio
  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={`container ${styles.successWrapper}`}>
          <div data-testid="register-success" className={styles.success}>
            <CheckCircle size={56} className={styles.successIcon} aria-hidden="true" />
            <h2 data-testid="register-success-title">Pet cadastrado com sucesso!</h2>
            <p data-testid="register-success-text">
              Obrigado por ajudar! Nossa equipe irá analisar as informações e em
              breve entrará em contato com você.
            </p>
            <div className={styles.successActions}>
              <Button as="link" href="/" data-testid="register-btn-back-home">
                Voltar ao início
              </Button>
              <Button
                variant="outline"
                data-testid="register-btn-new"
                onClick={() => { setSubmitted(false); setForm(INITIAL_FORM) }}
              >
                Cadastrar outro pet
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="register-page" className={styles.page}>
      <div className="container">

        {/* Botão Voltar */}
        <button
          data-testid="register-btn-back"
          onClick={() => router.back()}
          className={styles.backBtn}
          aria-label="Voltar"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar
        </button>

        <div className={styles.header}>
          <h1 data-testid="register-title" className={styles.title}>
            Cadastrar um pet
          </h1>
          <p data-testid="register-subtitle" className={styles.subtitle}>
            Preencha as informações abaixo para ajudar esse pet a encontrar um lar.
          </p>
        </div>

        <form
          data-testid="register-form"
          onSubmit={handleSubmit}
          className={styles.form}
          noValidate
        >
          {/* ── Seção 1: Informações do pet ── */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Informações do pet</legend>

            <div className={styles.row}>
              <Field
                label="Nome do pet"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Ex: Rex"
                required
              />
              <SelectField
                label="Categoria"
                name="category"
                value={form.category}
                onChange={handleChange}
                error={errors.category}
                required
                options={[
                  { value: 'Cachorro', label: 'Cachorro' },
                  { value: 'Gato', label: 'Gato' },
                  { value: 'Ave', label: 'Ave' },
                  { value: 'Coelho', label: 'Coelho' },
                  { value: 'Outro', label: 'Outro' },
                ]}
              />
            </div>

            <div className={styles.row}>
              <Field
                label="Raça"
                name="breed"
                type="text"
                value={form.breed}
                onChange={handleChange}
                error={errors.breed}
                placeholder="Ex: Labrador, Persa, SRD"
                required
              />
              <Field
                label="Idade"
                name="age"
                type="text"
                value={form.age}
                onChange={handleChange}
                error={errors.age}
                placeholder="Ex: 2 anos, 6 meses"
                required
              />
            </div>

            <div className={styles.row}>
              <SelectField
                label="Sexo"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                error={errors.gender}
                required
                options={[
                  { value: 'Macho', label: 'Macho' },
                  { value: 'Fêmea', label: 'Fêmea' },
                ]}
              />
              <SelectField
                label="Porte"
                name="size"
                value={form.size}
                onChange={handleChange}
                error={errors.size}
                required
                options={[
                  { value: 'Pequeno', label: 'Pequeno' },
                  { value: 'Médio', label: 'Médio' },
                  { value: 'Grande', label: 'Grande' },
                ]}
              />
            </div>

            <Field
              label="Localização"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              error={errors.location}
              placeholder="Ex: São Paulo, SP"
              required
            />

            {/* Textarea de descrição */}
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="description">
                Descrição <span className={styles.required}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                data-testid="register-input-description"
                value={form.description}
                onChange={handleChange}
                placeholder="Conte um pouco sobre o pet: temperamento, hábitos, necessidades especiais..."
                className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                rows={4}
                required
                aria-describedby={errors.description ? 'description-error' : undefined}
              />
              {errors.description && (
                <span
                  data-testid="register-error-description"
                  className={styles.errorMsg}
                  id="description-error"
                  role="alert"
                >
                  {errors.description}
                </span>
              )}
            </div>
          </fieldset>

          {/* ── Seção 2: Informações de contato ── */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Informações de contato</legend>

            <div className={styles.row}>
              <Field
                label="Seu nome"
                name="contactName"
                type="text"
                value={form.contactName}
                onChange={handleChange}
                error={errors.contactName}
                placeholder="Seu nome completo"
                required
              />
              <Field
                label="Telefone / WhatsApp"
                name="contactPhone"
                type="tel"
                value={form.contactPhone}
                onChange={handleChange}
                error={errors.contactPhone}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
          </fieldset>

          {/* Ações do formulário */}
          <div className={styles.formActions}>
            <Button type="submit" size="lg" data-testid="register-btn-submit">
              Cadastrar pet
            </Button>
            <Button
              variant="ghost"
              size="lg"
              data-testid="register-btn-cancel"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Sub-componentes ── */

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

function Field({ label, name, type, value, onChange, error, placeholder, required }: FieldProps) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={name}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={`register-input-${name}`}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
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

function SelectField({ label, name, value, onChange, error, required, options }: SelectFieldProps) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={name}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        data-testid={`register-select-${name}`}
        className={`${styles.input} ${styles.select} ${error ? styles.inputError : ''}`}
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
