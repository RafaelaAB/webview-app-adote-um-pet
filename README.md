<div align="center">
  <img src="public/logo.svg" alt="Adote um Pet" width="220" />

  <p>Plataforma web de adoção de animais construída com Next.js 15, React 19 e TypeScript.<br/>
  Encontre, conheça e adote pets disponíveis — ou cadastre um que precisa de lar.</p>
</div>

---

## Tecnologias

- **Next.js 15** (App Router)
- **React 19** + **TypeScript 5**
- **CSS Modules** com sistema de design tokens
- **Lucide React** para ícones
- **Jest + React Testing Library** para testes unitários
- **Cypress** para testes E2E

## Funcionalidades

- **Home** — Hero com CTAs, pets em destaque e estatísticas da ONG
- **Listagem de pets** (`/pets`) — todos os animais com filtro por categoria e paginação
- **Detalhe do pet** (`/pets/[id]`) — informações completas, saúde e botão de adoção
- **Cadastro** (`/cadastrar`) — formulário com validação para registrar novos pets
- **Menu lateral** — sidebar deslizante com navegação principal
  - Adote um Pet → `/pets`
  - Cadastre um Pet → `/cadastrar`
  - Eventos (expansível)
    - Campanhas de adoção em sua cidade → `/eventos/campanhas-adocao`
    - Campanhas de vacinação → `/eventos/campanhas-vacinacao`

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx                           # Layout raiz com PetProvider e SidebarProvider
│   ├── loading.tsx                          # Skeleton da home (Next.js Suspense)
│   ├── page.tsx                             # Página inicial
│   ├── pets/
│   │   ├── loading.tsx                      # Skeleton da listagem
│   │   ├── page.tsx                         # Listagem com filtros
│   │   └── [id]/
│   │       ├── loading.tsx                  # Skeleton do detalhe
│   │       └── page.tsx                     # Detalhe do pet
│   ├── cadastrar/
│   │   ├── loading.tsx                      # Skeleton do formulário
│   │   └── page.tsx                         # Formulário de cadastro
│   └── eventos/
│       ├── campanhas-adocao/page.tsx
│       └── campanhas-vacinacao/page.tsx
├── components/
│   ├── Button/             # Botão polimórfico (button/link)
│   ├── Header/             # Header com logo, efeito scroll e hambúrguer
│   ├── Footer/             # Footer com logo e links sociais
│   ├── PetCard/            # Card reutilizável de pet
│   ├── Sidebar/            # Menu lateral com foco gerenciado e sub-menu
│   └── Skeleton/           # Bloco placeholder com efeito shimmer
├── context/
│   ├── PetContext.tsx      # Estado global dos pets
│   └── SidebarContext.tsx  # Estado de abertura/fechamento da sidebar
├── hooks/
│   ├── usePets.ts          # Hook com filtragem de pets
│   └── useScrollEffect.ts  # Detecção de scroll
├── types/index.ts          # Interfaces TypeScript
├── data/pets.ts            # Dados mock
└── lib/logger.ts           # Logger estruturado
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
| `npm test` | Testes unitários |
| `npm run test:coverage` | Relatório de cobertura |
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

Testam componentes, hooks, contexto e páginas de forma isolada.

**Cobertura mínima exigida: 90%** em statements, branches, funções e linhas.

| Script | Descrição |
|---|---|
| `npm test` | Roda todos os testes uma vez |
| `npm run test:watch` | Modo interativo |
| `npm run test:coverage` | Relatório de cobertura |

Cobertura atual:

| Categoria | Cobertura |
|---|---|
| Statements | ~99% |
| Branches | ~93% |
| Funções | ~97% |
| Linhas | ~99% |

### Testes E2E — Cypress

```bash
npm run dev        # inicie o servidor
npm run cy:run     # rode os testes em outro terminal
```

## Acessibilidade (WCAG 2.1 AA)

O projeto segue as diretrizes **WCAG 2.1 nível AA**. As principais implementações:

### Critérios atendidos

| Critério | Descrição | Implementação |
|---|---|---|
| **1.1.1** Non-text Content | Imagens têm texto alternativo | `alt` descritivo em todas as imagens; `alt=""` + `aria-hidden` em imagens decorativas |
| **1.3.1** Info and Relationships | Estrutura semântica | `<header>`, `<nav>`, `<main>`, `<footer>`, `<section aria-labelledby>`, `<fieldset>`, `<legend>` |
| **1.4.3** Contrast | Contraste mínimo 4.5:1 | Textos primários em `#1c1917` sobre fundos claros |
| **2.1.1** Keyboard | Tudo acessível por teclado | Todos os controles interativos são focáveis; Escape fecha a sidebar |
| **2.4.1** Bypass Blocks | Skip navigation | Link "Pular para o conteúdo principal" visível no foco, aponta para `#main-content` |
| **2.4.3** Focus Order | Ordem de foco coerente | Ao abrir a sidebar, foco move para o botão fechar; ao fechar, retorna ao elemento anterior |
| **2.4.4** Link Purpose | Propósito do link claro | PetCards têm `aria-label` descritivo com nome, raça, idade e status do pet |
| **2.4.7** Focus Visible | Foco visível | `outline: 3px solid var(--color-primary)` com `outline-offset: 3px` em todos os elementos focáveis |
| **3.1.1** Language of Page | Idioma declarado | `<html lang="pt-BR">` |
| **3.3.1** Error Identification | Erros identificados | Mensagens de erro com `role="alert"` e `aria-describedby` vinculando ao campo |
| **3.3.2** Labels or Instructions | Campos rotulados | `<label htmlFor>` associado a cada campo; campos obrigatórios marcados |
| **4.1.2** Name, Role, Value | ARIA correto | `aria-label`, `aria-expanded`, `aria-pressed`, `aria-current="page"`, `aria-hidden`, `aria-live` |
| **4.1.3** Status Messages | Mensagens de status | Estados de carregamento com `role="status"` e `aria-live="polite"` |

### Utilitários de acessibilidade (globals.css)

```css
/* Skip link — visível apenas no foco */
.skip-link { position: absolute; top: -100%; ... }
.skip-link:focus { top: var(--space-4); }

/* Conteúdo visível apenas para leitores de tela */
.sr-only { position: absolute; width: 1px; height: 1px; ... }
```

## Sistema de Design

| Token | Valor |
|---|---|
| Cor primária | `#f97316` (laranja) |
| Cor secundária | `#1e3a5f` (azul marinho) |
| Cor de sucesso | `#10b981` (verde) |
| Fonte headings | Nunito |
| Fonte corpo | Inter |

## Git Flow

Este projeto segue o padrão Git Flow:

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

```bash
# Nova feature
git switch develop
git checkout -b feature/nome-da-feature

# Correção de bug
git switch develop
git checkout -b fix/nome-do-bug
```

## Observações

- Os dados são **mock** (sem banco de dados real)
- O formulário de cadastro não persiste dados
- Não há sistema de autenticação
- Pronto para integração com backend/API

---

Desenvolvido com ♥ por [Rafaela Andrade Batista](https://github.com/RafaelaAB)
