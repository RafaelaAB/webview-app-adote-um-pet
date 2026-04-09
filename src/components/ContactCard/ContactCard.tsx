/**
 * ContactCard — card de contato do responsável pelo pet
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Por que este componente existe?
 * ────────────────────────────────
 * O card de contato do responsável (ONG ou tutor particular) estava
 * embutido diretamente na página de adoção (adotar/[id]/page.tsx).
 * Ele é o componente mais específico e complexo dessa página, com:
 *   - Header colorido (gradiente) mostrando tipo (ONG | Tutor) e nome
 *   - Lista de informações: endereço, telefone, e-mail, horário
 *   - Botões de ação: WhatsApp e e-mail
 *   - Nota legal sobre o processo de adoção
 *
 * Ao extraí-lo, a página de adoção fica mais legível e o componente
 * pode ser reutilizado em outros contextos (ex: lista de ONGs, mapa).
 *
 * Como é construída a mensagem do WhatsApp?
 * ──────────────────────────────────────────
 * A API do WhatsApp (wa.me) aceita um link com o número e uma mensagem
 * pré-formatada via query string:
 *
 *   https://wa.me/5511999990000?text=Mensagem%20aqui
 *
 *   1. Removemos todos os não-dígitos do telefone com .replace(/\D/g, '')
 *   2. Prefixamos com "55" (DDI do Brasil)
 *   3. Codificamos a mensagem com encodeURIComponent() para URL segura
 *
 * A mensagem inclui o nome do pet para contextualizar o contato.
 *
 * Responsabilidade do componente pai:
 * ─────────────────────────────────────
 * Este componente recebe `contact` (PetContact) e `petName` (string).
 * Não precisa saber nada sobre o pet além do nome — quem busca o pet
 * pelo ID é a página de adoção, que então extrai os dados e passa aqui.
 *
 * Acessibilidade:
 * ────────────────
 * - <address>: elemento semântico para informações de contato (WCAG 1.3.1)
 * - aria-label nos links de ação: descreve o destino para leitores de tela
 * - target="_blank" + rel="noopener noreferrer": segurança ao abrir WhatsApp
 *   (noopener: impede a nova aba de acessar window.opener)
 *   (noreferrer: não envia o Referer header para o destino externo)
 */

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
  /** Dados do responsável extraídos de Pet.contact */
  contact: PetContact
  /** Nome do pet — usado nas mensagens pré-formatadas do WhatsApp e e-mail */
  petName: string
  /** Identificador para testes automatizados */
  'data-testid'?: string
}

export default function ContactCard({
  contact,
  petName,
  'data-testid': testId,
}: ContactCardProps) {
  // ── Construção do link do WhatsApp ───────────────────────────────────────

  // Remove tudo que não é dígito: "(11) 98765-4321" → "11987654321"
  const whatsappNumber = contact.phone.replace(/\D/g, '')

  // Mensagem padrão pré-preenchida para o adotante
  const whatsappMsg = encodeURIComponent(
    `Olá! Vi o perfil de ${petName} no Adote um Pet e gostaria de saber mais sobre a adoção. 🐾`
  )

  // "55" = DDI do Brasil. wa.me espera número completo sem formatação.
  const whatsappHref = `https://wa.me/55${whatsappNumber}?text=${whatsappMsg}`

  return (
    <div className={styles.contactCard} data-testid={testId}>

      {/* ── Cabeçalho com gradiente ── */}
      <div className={styles.contactCardHeader}>
        {/*
         * Ícone diferente para ONG (prédio) e tutor particular (pessoa).
         * style inline para cor porque depende do fundo gradiente do header.
         */}
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
          {/* Tag visual: "🏠 ONG" ou "👤 Tutor" */}
          <span className={styles.contactTypeTag}>
            {contact.type === 'ong' ? '🏠 ONG' : '👤 Tutor'}
          </span>
          <p className={styles.contactHeaderName}>{contact.name}</p>
        </div>
      </div>

      {/*
       * <address> — elemento semântico HTML5 para informações de contato.
       * Leitores de tela anunciam seu conteúdo como "informações de endereço".
       * Não precisa conter um endereço físico — pode ter e-mail e telefone.
       */}
      <address className={styles.contactCardBody}>

        {/* Endereço físico */}
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

        {/* Telefone — link tel: abre o discador no celular */}
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

        {/* E-mail — opcional (nem todo responsável tem e-mail cadastrado) */}
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

        {/* Horário de funcionamento — exclusivo de ONGs (campo opcional) */}
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

      {/* Divisor visual entre informações e botões de ação */}
      <hr className={styles.contactDivider} />

      {/* ── Botões de ação ── */}
      <div className={styles.actions}>

        {/*
         * Botão do WhatsApp — link externo para a API do WhatsApp Web.
         * target="_blank": abre em nova aba (não sai do site de adoção)
         * rel="noopener noreferrer": segurança para links externos
         */}
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

        {/*
         * Botão de e-mail — link mailto: com assunto e corpo pré-preenchidos.
         * Só aparece se o responsável tem e-mail cadastrado.
         * subject e body no href poupam o adotante de digitar do zero.
         */}
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

        {/* Disclaimer legal: o site apenas conecta adotante e responsável */}
        <p className={styles.legalNote}>
          A adoção é gratuita e mediada pelo responsável acima. O Adote um Pet
          não intervém no processo.
        </p>
      </div>
    </div>
  )
}
