# Adote um Pet

Plataforma web de adoção de animais construída com Next.js 15, React 19 e TypeScript. Permite visualizar pets disponíveis para adoção, filtrar por categoria, ver detalhes de cada animal e cadastrar novos pets.

## Tecnologias

- **Next.js 15** (App Router)
- **React 19** + **TypeScript 5**
- **CSS Modules** com sistema de design tokens
- **Lucide React** para ícones
- **Cypress** para testes E2E

## Funcionalidades

- **Home** — Hero com CTAs, pets em destaque e estatísticas da ONG
- **Listagem de pets** (`/pets`) — todos os animais com filtro por categoria
- **Detalhe do pet** (`/pets/[id]`) — informações completas, saúde e botão de adoção
- **Cadastro** (`/cadastrar`) — formulário com validação para registrar novos pets

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout raiz com PetProvider
│   ├── page.tsx            # Página inicial
│   ├── pets/
│   │   ├── page.tsx        # Listagem com filtros
│   │   └── [id]/page.tsx   # Detalhe do pet
│   └── cadastrar/page.tsx  # Formulário de cadastro
├── components/
│   ├── Button/             # Botão polimórfico (button/link)
│   ├── Header/             # Header com efeito de scroll
│   ├── Footer/
│   └── PetCard/            # Card reutilizável de pet
├── context/
│   └── PetContext.tsx      # Estado global dos pets
├── hooks/
│   ├── usePets.ts          # Hook com filtragem de pets
│   └── useScrollEffect.ts  # Detecção de scroll
├── types/index.ts          # Interfaces TypeScript
└── data/pets.ts            # Dados mock (8 pets)
```

## Como Rodar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd adote-um-pet

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | Verificação de lint |
| `npm run cy:open` | Cypress (modo interativo) |
| `npm run cy:run` | Cypress (modo headless) |

## Modelo de Dados

```typescript
interface Pet {
  id: string
  name: string
  category: 'Cachorro' | 'Gato' | 'Ave' | 'Coelho' | 'Outro'
  breed: string
  age: string
  gender: 'Macho' | 'Fêmea'
  size: 'Pequeno' | 'Médio' | 'Grande'
  description: string
  image: string
  location: string
  status: 'Disponível' | 'Adotado' | 'Pendente'
  vaccinated: boolean
  castrated: boolean
}
```

## Testes

Os testes E2E com Cypress cobrem:

- Layout e navegação da home
- Listagem e filtragem de pets por categoria
- Navegação para detalhe do pet
- Validação e envio do formulário de cadastro

```bash
# Certifique-se que o servidor está rodando
npm run dev

# Em outro terminal, rode os testes
npm run cy:run
```

## Sistema de Design

| Token | Valor |
|---|---|
| Cor primária | `#f97316` (laranja) |
| Cor secundária | `#1e3a5f` (azul marinho) |
| Cor de sucesso | `#10b981` (verde) |
| Fonte headings | Nunito |
| Fonte corpo | Inter |

## Observações

- Os dados são **mock** (sem banco de dados real)
- O formulário de cadastro salva apenas localmente (sem persistência)
- Não há sistema de autenticação
- Pronto para integração com backend/API

---

Desenvolvido por Rafaela Andrade
