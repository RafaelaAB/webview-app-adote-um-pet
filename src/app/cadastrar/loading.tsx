/**
 * LOADING STATE — Cadastro de Pet (/cadastrar)
 *
 * Imita a estrutura da CadastrarPage:
 *   - Título + subtítulo
 *   - Campos de formulário em grid (label + input)
 *   - Botão de submit
 */

import Skeleton from '@/components/Skeleton/Skeleton'
import styles from './cadastrar-loading.module.css'

export default function CadastrarLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Carregando formulário de cadastro">
      <div className="container">

        {/* Botão voltar */}
        <Skeleton width={80} height={34} radius="md" className={styles.backBtn} />

        {/* Título + subtítulo */}
        <div className={styles.header}>
          <Skeleton width="40%" height={44} radius="md" />
          <Skeleton width="60%" height={18} radius="sm" />
        </div>

        {/* Formulário: grid de campos */}
        <div className={styles.form}>

          {/* Linha 1: nome + categoria */}
          <div className={styles.row}>
            <FieldSkeleton />
            <FieldSkeleton />
          </div>

          {/* Linha 2: raça + idade */}
          <div className={styles.row}>
            <FieldSkeleton />
            <FieldSkeleton />
          </div>

          {/* Linha 3: gênero + porte + localização */}
          <div className={styles.rowThree}>
            <FieldSkeleton />
            <FieldSkeleton />
            <FieldSkeleton />
          </div>

          {/* Descrição (textarea — mais alta) */}
          <div className={styles.fullWidth}>
            <Skeleton width="25%" height={14} radius="sm" className={styles.label} />
            <Skeleton width="100%" height={100} radius="md" />
          </div>

          {/* Contato: nome + telefone */}
          <div className={styles.row}>
            <FieldSkeleton />
            <FieldSkeleton />
          </div>

          {/* Botão submit */}
          <div className={styles.submitRow}>
            <Skeleton width={200} height={52} radius="full" />
          </div>

        </div>
      </div>
    </div>
  )
}

/** Campo de formulário genérico: label + input */
function FieldSkeleton() {
  return (
    <div className={styles.field}>
      <Skeleton width="40%" height={14} radius="sm" className={styles.label} />
      <Skeleton width="100%" height={44} radius="md" />
    </div>
  )
}
