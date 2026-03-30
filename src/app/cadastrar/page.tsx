'use client'

/**
 * PÁGINA DE CADASTRO DE PET — rota: /cadastrar
 *
 * Formulário para registrar um novo pet para adoção.
 * Divide-se em duas seções:
 *   1. Informações do pet (nome, categoria, raça, idade, sexo, porte, localização, descrição)
 *   2. Informações de contato (nome do responsável, telefone/WhatsApp)
 *
 * Funcionalidades:
 *   - Validação de todos os campos antes de enviar
 *   - Exibição de mensagens de erro inline por campo
 *   - Estado de sucesso após envio (sem backend — apenas simulação visual)
 *   - Botão "Cadastrar outro pet" que limpa o formulário
 *
 * O que é o Router aqui?
 * ──────────────────────
 * Usa useRouter() do Next.js para duas navegações programáticas:
 *   - router.back() no botão "Voltar" → volta à página anterior
 *   - router.back() no botão "Cancelar" → mesmo comportamento
 *
 * Hooks usados:
 *   - useState (3x) → form (dados do formulário), submitted (estado de envio),
 *                     errors (erros de validação)
 *   - useRouter     → navegação programática
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Button from '@/components/Button/Button'
import styles from './cadastrar.module.css'

/**
 * FormData — interface que define a estrutura dos dados do formulário.
 * Cada campo do formulário tem uma propriedade correspondente aqui.
 */
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

/**
 * INITIAL_FORM — valores iniciais (vazios) do formulário.
 * Usado para inicializar o estado e para resetar após envio.
 */
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

/**
 * CadastrarPage — componente da página de cadastro de pet.
 */
export default function CadastrarPage() {
  /**
   * useRouter() fornece o objeto router para navegação programática.
   * Diferente do <Link>, o router permite navegar em resposta a eventos
   * (ex: clique em botão, após submit de formulário).
   */
  const router = useRouter()

  /**
   * useState para os dados do formulário.
   * form armazena os valores atuais de cada campo.
   * setForm atualiza esses valores.
   */
  const [form, setForm] = useState<FormData>(INITIAL_FORM)

  /**
   * submitted controla se o formulário já foi enviado com sucesso.
   * Quando true, a tela de sucesso é exibida no lugar do formulário.
   */
  const [submitted, setSubmitted] = useState(false)

  /**
   * errors armazena as mensagens de erro por campo.
   * Partial<FormData> significa que nem todos os campos precisam ter erro —
   * apenas os que falharam na validação.
   */
  const [errors, setErrors] = useState<Partial<FormData>>({})

  /**
   * validate — valida todos os campos do formulário.
   *
   * Percorre cada campo obrigatório e adiciona uma mensagem de erro
   * se o valor estiver vazio. Salva os erros no estado e retorna:
   *   - true  → formulário válido (pode enviar)
   *   - false → há erros (não deve enviar)
   *
   * @returns boolean indicando se o formulário é válido
   */
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
    setErrors(newErrors) // salva os erros no estado para exibir na tela
    return Object.keys(newErrors).length === 0 // true = nenhum erro encontrado
  }

  /**
   * handleChange — atualiza o campo correspondente no estado do formulário.
   *
   * É chamado no evento onChange de qualquer input, select ou textarea.
   * Usa spread (...prev) para preservar os outros campos e atualizar
   * apenas o campo que foi alterado (identificado por e.target.name).
   *
   * Também limpa o erro do campo que está sendo editado, para dar
   * feedback visual imediato ao usuário de que ele está corrigindo.
   *
   * @param e — evento de mudança do input/select/textarea
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    // Atualiza apenas o campo que mudou, preservando os demais
    setForm((prev) => ({ ...prev, [name]: value }))
    // Se havia erro nesse campo, remove ao começar a digitar
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  /**
   * handleSubmit — função executada ao enviar o formulário.
   *
   * e.preventDefault() impede o comportamento padrão do HTML de
   * recarregar a página ao submeter um formulário.
   *
   * Se a validação passar, marca o formulário como enviado (submitted=true),
   * o que faz o componente exibir a tela de sucesso.
   *
   * Em um app real, aqui teria um fetch() ou axios.post() para a API.
   *
   * @param e — evento de submit do formulário
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // evita recarregar a página
    if (validate()) {
      setSubmitted(true) // exibe tela de sucesso
    }
  }

  // Se o formulário foi enviado com sucesso, exibe a tela de confirmação
  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={`container ${styles.successWrapper}`}>
          <div className={styles.success}>
            <CheckCircle size={56} className={styles.successIcon} aria-hidden="true" />
            <h2>Pet cadastrado com sucesso!</h2>
            <p>
              Obrigado por ajudar! Nossa equipe irá analisar as informações e em
              breve entrará em contato com você.
            </p>
            <div className={styles.successActions}>
              {/* Navega para a home page */}
              <Button as="link" href="/">
                Voltar ao início
              </Button>
              {/* Reseta o formulário para cadastrar outro pet */}
              <Button variant="outline" onClick={() => { setSubmitted(false); setForm(INITIAL_FORM) }}>
                Cadastrar outro pet
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">

        {/* Botão voltar — usa router.back() para ir à página anterior */}
        <button
          onClick={() => router.back()}
          className={styles.backBtn}
          aria-label="Voltar"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar
        </button>

        <div className={styles.header}>
          <h1 className={styles.title}>Cadastrar um pet</h1>
          <p className={styles.subtitle}>
            Preencha as informações abaixo para ajudar esse pet a encontrar um lar.
          </p>
        </div>

        {/**
         * noValidate desativa a validação nativa do HTML para que
         * possamos usar nossa própria validação customizada (em validate()).
         */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>

          {/* ── Seção 1: Informações do pet ── */}
          <fieldset className={styles.fieldset}>
            {/* legend descreve semanticamente o grupo de campos para acessibilidade */}
            <legend className={styles.legend}>Informações do pet</legend>

            <div className={styles.row}>
              {/**
               * Field e SelectField são sub-componentes definidos abaixo.
               * Eles encapsulam label + input + mensagem de erro para reutilização.
               */}
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

            {/* Campo de descrição usa textarea (múltiplas linhas) em vez de input */}
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="description">
                Descrição <span className={styles.required}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Conte um pouco sobre o pet: temperamento, hábitos, necessidades especiais..."
                className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                rows={4}
                required
                aria-describedby={errors.description ? 'description-error' : undefined}
              />
              {errors.description && (
                <span className={styles.errorMsg} id="description-error" role="alert">
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
                type="tel"  // type="tel" abre teclado numérico em celulares
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
            <Button type="submit" size="lg">
              Cadastrar pet
            </Button>
            {/* Cancelar usa router.back() para voltar sem salvar */}
            <Button variant="ghost" size="lg" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Sub-componentes do formulário ── */

/**
 * Props do componente Field (campo de texto).
 */
interface FieldProps {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string        // mensagem de erro (undefined = sem erro)
  placeholder?: string
  required?: boolean
}

/**
 * Field — campo de texto reutilizável com label e mensagem de erro.
 *
 * Encapsula o padrão label + input + erro para não repetir o mesmo
 * bloco de JSX em cada campo do formulário.
 *
 * aria-describedby vincula o input com sua mensagem de erro para
 * leitores de tela anunciarem o erro automaticamente.
 *
 * @param props — label, name, type, value, onChange, error, placeholder, required
 */
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
        // Adiciona classe de erro visual se houver mensagem de erro
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        required={required}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {/* Exibe a mensagem de erro abaixo do input quando houver */}
      {error && (
        <span className={styles.errorMsg} id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

/**
 * Props do componente SelectField (campo de seleção).
 */
interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
  required?: boolean
  options: { value: string; label: string }[] // lista de opções do select
}

/**
 * SelectField — campo de seleção (dropdown) reutilizável com label e erro.
 *
 * Similar ao Field, mas renderiza um <select> em vez de <input>.
 * Recebe um array de opções e as renderiza dinamicamente.
 *
 * @param props — label, name, value, onChange, error, required, options
 */
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
        className={`${styles.input} ${styles.select} ${error ? styles.inputError : ''}`}
        required={required}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {/* Opção padrão desabilitada — obriga o usuário a escolher */}
        <option value="">Selecione...</option>
        {/* Renderiza cada opção passada via props */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className={styles.errorMsg} id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
