# VMA Contabilidade — Plataforma de Assessoria Empresarial

<p align="center">
  <strong>Solução digital moderna para gestão contábil, consultoria tributária e suporte estratégico para empresas.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Supabase-JS-3ECF8E?logo=supabase&logoColor=white" alt="Supabase">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Arquitetura-Serverless-blue?logoColor=white" alt="Arquitetura">
  <img src="https://img.shields.io/badge/Status-Concluído-brightgreen" alt="Status">
</p>

---

## 📌 Sobre o Projeto

O **VMA Contabilidade** é uma plataforma web premium desenvolvida para elevar o padrão de atendimento de serviços contábeis. Focada em performance e experiência do usuário, a aplicação serve como porta de entrada digital para clientes que buscam assessoria contábil, planejamento tributário e consultoria de negócios de alto nível.

A plataforma utiliza as tecnologias mais recentes do ecossistema JavaScript para garantir uma interface fluida, segura e altamente responsiva.

---

## ✅ Estado Atual — Projeto Concluído

Todas as funcionalidades do escopo foram desenvolvidas e integradas.

### 🗺️ Roadmap de Desenvolvimento

- [x] **Setup Inicial:** Configuração do Next.js 15 (App Router), Tailwind 4 e TypeScript.
- [x] **Interface Premium:** Landing page completa com design moderno e responsivo.
- [x] **Componentização:** Navbar, Hero, Services, About, Contact e Footer modulares.
- [x] **Captação de Leads:** Formulário de contato com integração ao Supabase via Server Actions.
- [x] **Upload de Documentos:** Upload seguro de PDFs (até 10MB) via Supabase Storage com validação no servidor.
- [x] **Autenticação Administrativa:** Login seguro via Supabase Auth com redirecionamento para área restrita.
- [x] **Área Restrita (Upload):** Página `/upload` com sessão autenticada, identificação de role (Cliente/Proprietário) e logout.
- [x] **Recursos Úteis:** Calculadora CLT vs PJ implementada e funcional.
- [x] **Identidade Visual:** Design system baseado em cores sóbrias e tipografia premium.
- [x] **Formulário Inteligente:** `ContactForm` com `useActionState`, feedback de status e validação.

---

## 🛠️ Tech Stack

### Frontend & Core
| Tecnologia | Uso |
|------------|-----|
| **Next.js 15** | Framework Fullstack com renderização híbrida, App Router e Server Actions. |
| **React 19** | Biblioteca base para UI com `useActionState` e melhorias de performance. |
| **Tailwind CSS 4** | Estilização utilitária de última geração com engine otimizada. |
| **Lucide React** | Pacote de ícones modernos e leves. |
| **TypeScript** | Garantia de tipos e segurança em todo o ciclo de desenvolvimento. |

### Backend & Infra
| Tecnologia | Uso |
|------------|-----|
| **Supabase Auth** | Autenticação segura com sessão server-side via cookies. |
| **Supabase Database** | Persistência de leads em PostgreSQL com RLS ativo. |
| **Supabase Storage** | Upload de documentos PDF no bucket `documents`. |
| **Next.js Server Actions** | Lógica de backend colocada em `src/app/actions.ts`, sem API Routes externas. |

---

## 📋 Funcionalidades Implementadas

### Área Institucional (Pública)
- **Hero Dinâmico:** Apresentação de alto impacto visual com foco em conversão.
- **Catálogo de Serviços:** Exposição detalhada das especialidades (Assessoria, Planejamento, RH, etc.).
- **Calculadora CLT vs PJ:** Ferramenta interativa de comparação de rendimentos.
- **Seção Sobre:** Apresentação da equipe e filosofia da VMA.
- **Formulário de Contato:** Captura de leads com validação, feedback de status e envio via Server Action.

### Área Restrita (Autenticada)
- **Login (`/login`):** Autenticação via e-mail e senha com Supabase Auth. Suporte a redirecionamento pós-login.
- **Upload de Documentos (`/upload`):** Upload de múltiplos PDFs. Sessão autenticada validada no servidor — redireciona para `/login` se não autenticado.
- **Identificação de Role:** Badge visual diferenciado para usuário `Cliente` e `Proprietário VMA`.
- **Logout:** Encerramento de sessão via Server Action com redirecionamento para a home.

### Server Actions (`src/app/actions.ts`)
| Action | Descrição |
|--------|-----------|
| `submitLeadForm` | Valida campos, faz upload opcional de PDF e insere lead no banco com `status: 'NOVO'`. |
| `uploadMultiplePdfs` | Upload de múltiplos arquivos PDF para o bucket `documents` no Supabase Storage. |
| `signInWithEmail` | Autentica usuário via Supabase Auth com e-mail e senha. |
| `signOutUser` | Encerra sessão e redireciona para a raiz `/`. |

---

## 💻 Como Executar Localmente

### Pré-requisitos
- Node.js 20+
- NPM
- Projeto no Supabase com Auth, tabela `leads` e bucket `documents` configurados.

### Passos de Configuração

1. **Clone o repositório**
```bash
git clone https://github.com/joao-luizzz/VMA-contabilidade.git
cd VMA-contabilidade
```

2. **Instale as dependências**
```bash
npm install
```

3. **Variáveis de Ambiente**
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

4. **Inicie o Servidor de Desenvolvimento**
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`.

---

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── actions.ts        # Server Actions (leads, upload, auth)
│   ├── login/            # Página de login com Supabase Auth
│   ├── upload/           # Página de upload de documentos (autenticada)
│   └── layout.tsx        # Layout raiz
├── components/
│   ├── layout/           # Navbar e Footer
│   ├── sections/         # Hero, About, Services, Contact, CltPjCalculator
│   └── ui/               # ContactForm, DocumentUploader, Logo, TestimonialPill
└── lib/
    └── supabase-server.ts # Cliente Supabase server-side (SSR com cookies)
```

---

## 🗄️ Estrutura do Banco de Dados (Supabase)

### Tabela `leads`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | Chave primária gerada automaticamente. |
| `nome` | `text` | Nome do solicitante. |
| `email` | `text` | E-mail de contato. |
| `telefone` | `text` | Telefone (opcional). |
| `empresa` | `text` | Nome da empresa (opcional). |
| `mensagem` | `text` | Mensagem do lead. |
| `documento_url` | `text` | URL pública do PDF anexado (opcional). |
| `status` | `text` | Status do atendimento. Padrão: `'NOVO'`. |
| `created_at` | `timestamptz` | Data de criação automática. |

### Storage
- **Bucket `documents`:** Armazena os PDFs enviados pelo formulário de contato e pela página de upload. Caminhos no padrão `uploads/{timestamp}-{hash}.pdf`.

---

## 👥 Equipe

- **Lucas Lucachak** — Full Stack Developer
- **João Luiz** — QA & Documentação

---

<p align="center">
  <sub>VMA Contabilidade — Excelência em Gestão Empresarial.</sub>
</p>
