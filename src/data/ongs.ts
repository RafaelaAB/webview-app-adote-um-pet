export interface Ong {
  id: string
  name: string
  description: string
  address: string
  city: string
  phone: string
  email: string
  howToHelp: string[]
  pixKey?: string
}

export const ongs: Ong[] = [
  {
    id: '1',
    name: 'Patinhas do Bem',
    description:
      'Resgatamos animais em situação de rua e os mantemos em lares temporários até a adoção definitiva.',
    address: 'Rua das Flores, 120 — Jardim Paulista',
    city: 'São Paulo, SP',
    phone: '(11) 98765-4321',
    email: 'contato@patinhasbem.org.br',
    howToHelp: [
      'Doação de ração e medicamentos',
      'Lar temporário para pets resgatados',
      'Voluntariado nos finais de semana',
      'Doação via PIX',
    ],
    pixKey: 'contato@patinhasbem.org.br',
  },
  {
    id: '2',
    name: 'Amigos de Quatro Patas',
    description:
      'Focamos em castração, vacinação e reabilitação de animais em vulnerabilidade em parceria com clínicas veterinárias da região.',
    address: 'Av. Central, 450 — Centro',
    city: 'Rio de Janeiro, RJ',
    phone: '(21) 97654-3210',
    email: 'ong@quatropatas.org',
    howToHelp: [
      'Doação em dinheiro para cirurgias',
      'Adoção responsável',
      'Divulgação nas redes sociais',
      'Patrocínio de campanhas de castração',
    ],
    pixKey: '12.345.678/0001-90',
  },
  {
    id: '3',
    name: 'Refúgio Animal',
    description:
      'Mantemos um abrigo com capacidade para 80 animais e trabalhamos com educação ambiental em escolas públicas.',
    address: 'Estrada do Campo, km 5 — Zona Rural',
    city: 'Belo Horizonte, MG',
    phone: '(31) 96543-2109',
    email: 'refugio@refugioanimal.org.br',
    howToHelp: [
      'Doação de cobertores e camas',
      'Ajuda nos mutirões de limpeza',
      'Adoção ou apadrinhamento de pet',
      'Doação de alimentos para os abrigos',
    ],
    pixKey: '(31) 96543-2109',
  },
  {
    id: '4',
    name: 'SOS Pets',
    description:
      'Atendemos emergências de maus-tratos e abandono, acionando fiscalização e oferecendo suporte jurídico às vítimas animais.',
    address: 'Rua Esperança, 88 — Vila Nova',
    city: 'Curitiba, PR',
    phone: '(41) 95432-1098',
    email: 'sos@sospets.org.br',
    howToHelp: [
      'Denúncia de maus-tratos',
      'Apoio jurídico voluntário',
      'Doação para custeio de resgates',
      'Compartilhamento de casos nas redes',
    ],
    pixKey: 'sospets@sospets.org.br',
  },
  {
    id: '5',
    name: 'Viva Bicho',
    description:
      'Promovemos feiras de adoção mensais e conectamos famílias a pets já castrados, vacinados e microchipados.',
    address: 'Praça da Liberdade, 10 — Boa Vista',
    city: 'Porto Alegre, RS',
    phone: '(51) 94321-0987',
    email: 'contato@vivabicho.org',
    howToHelp: [
      'Participação nas feiras de adoção',
      'Transporte de pets para eventos',
      'Doação de produtos de higiene',
      'Contribuição mensal recorrente',
    ],
    pixKey: '98.765.432/0001-10',
  },
  {
    id: '6',
    name: 'Amor Animal',
    description:
      'Atuamos em comunidades carentes oferecendo atendimento veterinário gratuito e orientação sobre guarda responsável.',
    address: 'Rua da Comunidade, 33 — Bairro Novo',
    city: 'Salvador, BA',
    phone: '(71) 93210-9876',
    email: 'amor@amoranimal.org.br',
    howToHelp: [
      'Voluntariado veterinário',
      'Doação de materiais médicos',
      'Financiamento de clínicas móveis',
      'Adoção de animais do abrigo',
    ],
    pixKey: 'amor@amoranimal.org.br',
  },
]
