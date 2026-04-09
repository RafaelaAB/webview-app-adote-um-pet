import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  User,
  MessageCircle,
} from 'lucide-react'
import { PetContact } from '@/types'
import styles from './ContactCard.module.css'

interface ContactCardProps {

  contact: PetContact

  petName: string

  'data-testid'?: string
}

export default function ContactCard({
  contact,
  petName,
  'data-testid': testId,
}: ContactCardProps) {

  const whatsappNumber = contact.phone.replace(/\D/g, '')

  const whatsappMsg = encodeURIComponent(
    `Olá! Vi o perfil de ${petName} no Adote um Pet e gostaria de saber mais sobre a adoção. 🐾`
  )

  const whatsappHref = `https://wa.me/55${whatsappNumber}?text=${whatsappMsg}`

  return (
    <div className={styles.contactCard} data-testid={testId}>

      <div className={styles.contactCardHeader}>

        {contact.type === 'ong' ? (
          <Building2
            size={20}
            strokeWidth={2}
            aria-hidden="true"
            style={{ color: 'rgba(255,255,255,0.8)', flexShrink: 0 }}
          />
        ) : (
          <User
            size={20}
            strokeWidth={2}
            aria-hidden="true"
            style={{ color: 'rgba(255,255,255,0.8)', flexShrink: 0 }}
          />
        )}

        <div>

          <span className={styles.contactTypeTag}>
            {contact.type === 'ong' ? '🏠 ONG' : '👤 Tutor'}
          </span>
          <p className={styles.contactHeaderName}>{contact.name}</p>
        </div>
      </div>

      <address className={styles.contactCardBody}>

        <div className={styles.contactRow}>
          <MapPin
            size={15}
            strokeWidth={2}
            className={styles.contactRowIcon}
            aria-hidden="true"
          />
          <span>
            {contact.address}, {contact.city}
          </span>
        </div>

        <div className={styles.contactRow}>
          <Phone
            size={15}
            strokeWidth={2}
            className={styles.contactRowIcon}
            aria-hidden="true"
          />
          <a
            href={`tel:${contact.phone.replace(/\D/g, '')}`}
            className={styles.contactLink}
            aria-label={`Ligar para ${contact.name}`}
          >
            {contact.phone}
          </a>
        </div>

        {contact.email && (
          <div className={styles.contactRow}>
            <Mail
              size={15}
              strokeWidth={2}
              className={styles.contactRowIcon}
              aria-hidden="true"
            />
            <a
              href={`mailto:${contact.email}`}
              className={styles.contactLink}
              aria-label={`Enviar e-mail para ${contact.name}`}
            >
              {contact.email}
            </a>
          </div>
        )}

        {contact.openingHours && (
          <div className={styles.contactRow}>
            <Clock
              size={15}
              strokeWidth={2}
              className={styles.contactRowIcon}
              aria-hidden="true"
            />
            <span>{contact.openingHours}</span>
          </div>
        )}
      </address>

      <hr className={styles.contactDivider} />

      <div className={styles.actions}>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnWhatsApp}
          data-testid="adotar-btn-whatsapp"
          aria-label={`Enviar mensagem no WhatsApp para ${contact.name}`}
        >
          <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
          Chamar no WhatsApp
        </a>

        {contact.email && (
          <a
            href={`mailto:${contact.email}?subject=Interesse em adotar ${petName}&body=Olá! Vi o perfil de ${petName} no Adote um Pet e gostaria de saber mais sobre a adoção.`}
            className={styles.btnEmail}
            data-testid="adotar-btn-email"
            aria-label={`Enviar e-mail para ${contact.name}`}
          >
            <Mail size={18} strokeWidth={2} aria-hidden="true" />
            Enviar e-mail
          </a>
        )}

        <p className={styles.legalNote}>
          A adoção é gratuita e mediada pelo responsável acima. O Adote um Pet
          não intervém no processo.
        </p>
      </div>
    </div>
  )
}
