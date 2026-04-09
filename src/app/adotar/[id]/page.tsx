'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  Home,
  Heart,
  ClipboardList,
  ShieldCheck,
} from 'lucide-react'
import { usePetContext } from '@/context/PetContext'
import Button from '@/components/Button/Button'
import BackButton from '@/components/BackButton/BackButton'
import Skeleton from '@/components/Skeleton/Skeleton'
import ContactCard from '@/components/ContactCard/ContactCard'
import { ROUTES } from '@/lib/routes'
import { createLogger } from '@/lib/logger'
import styles from './adotar.module.css'

const log = createLogger('AdotarPage')

const ADOPTION_STEPS = [
  {
    title: 'Entre em contato com o responsável',
    desc: 'Mande uma mensagem via WhatsApp ou e-mail demonstrando interesse. Apresente-se e conte um pouco sobre você e sua casa.',
  },
  {
    title: 'Passe pela entrevista',
    desc: 'O responsável vai fazer algumas perguntas para garantir que o pet irá para um lar seguro e amoroso. É rápido e informal!',
  },
  {
    title: 'Agende uma visita',
    desc: 'Conheça o pet pessoalmente antes de confirmar a adoção. Esse encontro é importante para verificar a compatibilidade.',
  },
  {
    title: 'Assine o termo de adoção',
    desc: 'Um documento simples que garante os direitos do animal e os compromissos do adotante. É obrigatório por lei.',
  },
  {
    title: 'Leve seu novo companheiro para casa',
    desc: 'Após aprovação, o pet vai para o seu novo lar! Prepare um espaço aconchegante para recebê-lo com muito amor.',
  },
  {
    title: 'Acompanhamento pós-adoção',
    desc: 'O responsável poderá entrar em contato nos primeiros meses para saber como o pet está se adaptando. Esteja disponível!',
  },
]

const REQUIREMENTS = [
  { ok: true,  text: 'Ser maior de 18 anos' },
  { ok: true,  text: 'Ter residência fixa e ambiente seguro para o pet' },
  { ok: true,  text: 'Comprometer-se com alimentação, saúde e bem-estar do animal' },
  { ok: true,  text: 'Assinar o termo de adoção responsável' },
  { ok: true,  text: 'Permitir visita domiciliar quando solicitado' },
  { ok: false, text: 'Adotar para presentear terceiros (não permitido)' },
  { ok: false, text: 'Manter o animal acorrentado ou em confinamento permanente' },
]

const DOCUMENTS = [
  { icon: <CreditCard size={16} />, label: 'RG ou CNH' },
  { icon: <FileText size={16} />,   label: 'CPF' },
  { icon: <Home size={16} />,       label: 'Comprovante de residência' },
  { icon: <FileText size={16} />,   label: 'Termo de adoção (fornecido pelo responsável)' },
]

export default function AdotarPage() {
  const params = useParams()
  const { getPetById, loading } = usePetContext()

  const petId = typeof params.id === 'string' ? params.id : params.id?.[0] ?? ''
  const pet = getPetById(petId)

  log.info('página de adoção acessada', { petId })

  if (loading) {
    return (
      <div className={styles.page}>
        <div className="container">
          <Skeleton width={80} height={34} radius="md" className={styles.backBtn} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, marginTop: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Skeleton width="60%" height={48} radius="md" />
              <Skeleton width="100%" height={240} radius="lg" />
              <Skeleton width="100%" height={200} radius="lg" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Skeleton width="100%" height={300} radius="lg" />
              <Skeleton width="100%" height={200} radius="lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!pet) {
    log.warn('pet não encontrado na página de adoção', { petId })
    return (
      <div className={styles.page}>
        <div className="container" style={{ textAlign: 'center', paddingTop: 80 }}>
          <span style={{ fontSize: '3rem' }}>🐾</span>
          <h2 style={{ marginTop: 16 }}>Pet não encontrado</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24 }}>
            Esse pet pode já ter sido adotado ou não existe.
          </p>
          <Button as="link" href={ROUTES.PETS}>Ver todos os pets</Button>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="adotar-page" className={styles.page}>
      <div className="container">

        <BackButton />

        <div className={styles.layout}>

          <div className={styles.content}>

            <header className={styles.pageHeader}>

              <img
                src={pet.image}
                alt={`Foto de ${pet.name}`}
                className={styles.petThumb}
              />
              <div>
                <h1 className={styles.pageTitle}>
                  Adotar{' '}
                  <span className={styles.titleHighlight}>{pet.name}</span>
                </h1>
                <p className={styles.pageSubtitle}>
                  Veja como funciona o processo e entre em contato com o responsável
                </p>
              </div>
            </header>

            <section className={styles.card} aria-labelledby="steps-title">
              <h2 className={styles.cardTitle} id="steps-title">
                <span className={styles.cardTitleIcon} aria-hidden="true">
                  <ClipboardList size={18} strokeWidth={2} />
                </span>
                Como funciona a adoção
              </h2>
              <ol className={styles.steps} aria-label="Passo a passo da adoção">
                {ADOPTION_STEPS.map((step, i) => (
                  <li key={i} className={styles.step}>
                    <span className={styles.stepNumber} aria-hidden="true">{i + 1}</span>
                    <div className={styles.stepBody}>
                      <p className={styles.stepTitle}>{step.title}</p>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.card} aria-labelledby="req-title">
              <h2 className={styles.cardTitle} id="req-title">
                <span className={styles.cardTitleIcon} aria-hidden="true">
                  <ShieldCheck size={18} strokeWidth={2} />
                </span>
                Requisitos para adoção
              </h2>
              <ul className={styles.requirementsList} role="list">
                {REQUIREMENTS.map((req, i) => (
                  <li key={i} className={styles.requirementItem}>
                    {req.ok ? (
                      <CheckCircle2
                        size={18}
                        strokeWidth={2}
                        className={styles.reqIcon}
                        aria-label="Obrigatório"
                      />
                    ) : (
                      <AlertCircle
                        size={18}
                        strokeWidth={2}
                        className={`${styles.reqIcon} ${styles.reqIconWarn}`}
                        aria-label="Não permitido"
                      />
                    )}
                    <span>{req.text}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.card} aria-labelledby="docs-title">
              <h2 className={styles.cardTitle} id="docs-title">
                <span className={styles.cardTitleIcon} aria-hidden="true">
                  <FileText size={18} strokeWidth={2} />
                </span>
                Documentos necessários
              </h2>
              <div className={styles.docGrid}>
                {DOCUMENTS.map((doc, i) => (
                  <div key={i} className={styles.docItem}>
                    <span className={styles.docIcon} aria-hidden="true">{doc.icon}</span>
                    <span>{doc.label}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <aside className={styles.sidebar} aria-label="Informações do pet e contato">

            <div className={styles.petCard}>
              <div className={styles.petCardImage}>
                <Image
                  src={pet.image}
                  alt={`Foto de ${pet.name}`}
                  fill
                  sizes="380px"
                  className={styles.petCardImg}
                  unoptimized
                />
              </div>
              <div className={styles.petCardBody}>
                <p className={styles.petCardName}>{pet.name}</p>
                <div className={styles.petCardBadges}>
                  <span className={styles.badge}>{pet.category}</span>
                  <span className={styles.badge}>{pet.breed}</span>
                  <span className={`${styles.badge} ${styles.badgeGray}`}>{pet.age}</span>
                  <span className={`${styles.badge} ${styles.badgeGray}`}>{pet.gender}</span>
                  <span className={`${styles.badge} ${styles.badgeGray}`}>{pet.size}</span>
                  {pet.vaccinated && (
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>✓ Vacinado</span>
                  )}
                  {pet.castrated && (
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>✓ Castrado</span>
                  )}
                </div>
                <div className={styles.petCardLocation}>
                  <MapPin size={13} strokeWidth={2} aria-hidden="true" />
                  <span>{pet.location}</span>
                </div>
              </div>
            </div>

            <ContactCard
              contact={pet.contact}
              petName={pet.name}
              data-testid="adotar-contact-card"
            />

            <Link
              href={ROUTES.PET_DETAIL(pet.id)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}
              aria-label={`Ver perfil completo de ${pet.name}`}
            >
              <Heart size={14} aria-hidden="true" />
              Ver perfil completo de {pet.name}
            </Link>

          </aside>
        </div>
      </div>
    </div>
  )
}
