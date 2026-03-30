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

O projeto conta com dois tipos de testes: **unitários** (Jest) e **E2E** (Cypress).

### Testes Unitários — Jest + React Testing Library

Testam componentes, hooks, contexto e páginas de forma isolada, sem precisar rodar o servidor.

**Cobertura mínima exigida: 90%** em statements, branches, funções e linhas. O build falha se não atingir esse threshold.

| Script | Descrição |
|---|---|
| `npm test` | Roda todos os testes uma vez |
| `npm run test:watch` | Modo interativo — re-roda ao salvar arquivos |
| `npm run test:coverage` | Roda os testes e gera relatório de cobertura |

Cobertura atual:

| Categoria | Cobertura |
|---|---|
| Statements | ~99% |
| Branches | ~93% |
| Funções | ~97% |
| Linhas | ~99% |

Os testes ficam em `src/__tests__/` organizados por tipo:

```
src/__tests__/
├── app/
│   ├── HomePage.test.tsx
│   ├── PetsPage.test.tsx
│   ├── PetDetailPage.test.tsx
│   └── CadastrarPage.test.tsx
├── components/
│   ├── Button.test.tsx
│   ├── Header.test.tsx
│   ├── Footer.test.tsx
│   └── PetCard.test.tsx
├── context/
│   └── PetContext.test.tsx
├── hooks/
│   ├── usePets.test.tsx
│   └── useScrollEffect.test.tsx
└── data/
    └── pets.test.ts
```

### Testes E2E — Cypress

Testam fluxos completos no browser com o servidor rodando.

```bash
# Certifique-se que o servidor está rodando
npm run dev

# Em outro terminal, rode os testes
npm run cy:run
```

Os testes E2E cobrem:

- Layout e navegação da home
- Listagem e filtragem de pets por categoria
- Navegação para detalhe do pet
- Validação e envio do formulário de cadastro

## Sistema de Design

| Token | Valor |
|---|---|
| Cor primária | `#f97316` (laranja) |
| Cor secundária | `#1e3a5f` (azul marinho) |
| Cor de sucesso | `#10b981` (verde) |
| Fonte headings | Nunito |
| Fonte corpo | Inter |

## Git Flow

Este projeto segue o padrão Git Flow com as seguintes branches:

| Branch | Descrição |
|---|---|
| `main` | Código estável de produção |
| `develop` | Integração — base para novas branches |
| `feature/xxxx` | Nova funcionalidade |
| `fix/xxxx` | Correção de bug |

### Regras

- **Nunca** commitar diretamente em `main` ou `develop`
- Toda branch deve ser criada **a partir da `develop`**
- Após concluir, a branch é mesclada de volta na `develop`

### Fluxo de trabalho

```bash
# Nova feature
git switch develop
git checkout -b feature/nome-da-feature
# ... desenvolve e commita ...
git switch develop
git merge feature/nome-da-feature

# Correção de bug
git switch develop
git checkout -b fix/nome-do-bug
# ... corrige e commita ...
git switch develop
git merge fix/nome-do-bug
```

### Exemplos de nomes de branch

```
feature/home
feature/paginacao
feature/detalhe-pet
fix/filtro-categoria
fix/botao-voltar
```

## Observações

- Os dados são **mock** (sem banco de dados real)
- O formulário de cadastro salva apenas localmente (sem persistência)
- Não há sistema de autenticação
- Pronto para integração com backend/API

---

Desenvolvido por Rafaela Andrade
