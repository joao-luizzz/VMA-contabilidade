# AGENTS.md — Diretrizes para IA no Projeto VMA Contabilidade

## 🧠 1. Contexto e Domínio

Você está atuando como assistente de desenvolvimento para o **VMA Contabilidade**, uma plataforma web premium para prestação de serviços contábeis e consultoria empresarial. 
O projeto utiliza uma arquitetura moderna baseada em **Next.js 16 (App Router)** e **Supabase** como Backend-as-a-Service (BaaS).

### Stack obrigatória (não sugerir alternativas legadas)
- **Framework:** Next.js 16+ (App Router)
- **UI/UX:** React 19+, Lucide React
- **Estilização:** Tailwind CSS 4.0 (engine baseada em CSS puro)
- **Backend/Database:** Supabase (PostgreSQL + RLS)
- **Linguagem:** TypeScript (Strict Mode)
- **Autenticação:** Supabase Auth (SSR Integration)

### Perfis de usuário (RBAC via Supabase RLS)
| Perfil | Descrição | Permissões |
|--------|-----------|------------|
| `ADMIN` | Equipe da VMA Contabilidade | Gestão total de leads, clientes, documentos e conteúdo do blog. |
| `CLIENTE` | Empresa parceira | Acesso ao painel próprio, consulta de documentos e chamados. |
| `PUBLIC` | Visitante | Visualização do site institucional e envio de formulários de contato. |

### Regras de negócio inegociáveis
1. **Captura de Leads:** Todo contato via site deve ser persistido na tabela `leads` com status inicial `NOVO`.
2. **Segurança de Dados:** O acesso a dados sensíveis de clientes deve ser protegido via **Row Level Security (RLS)** no Supabase e validação no lado do servidor (Server Components/Middleware).
3. **Performance:** Priorizar **Server Components** para SEO e performance, utilizando **Client Components** apenas para interatividade necessária.
4. **Design System:** Manter a estética premium (Dark Mode opcional, tipografia elegante, micro-animações suaves).

---

## 👥 2. Equipe e Responsabilidades

| Integrante | Papel | Responsabilidades no código |
|:-----------|:------|:---------------------------|
| **Lucas Lucachak** | Full Stack Developer | Arquitetura Next.js, Integração Supabase, Frontend e Backend |
| **João Luiz** | QA & Documentation | Testes automatizados, Documentação técnica e Auditoria de qualidade |
| **Antigravity** | AI Assistant | Geração de componentes, lógica de hooks e suporte ao desenvolvimento |

---

## 🏗️ 3. Padrões de Arquitetura — Regras de Codificação

### Frontend (Next.js + React)
- **App Router:** Usar a estrutura de pastas `src/app/` seguindo as convenções de `layout.tsx`, `page.tsx` e `loading.tsx`.
- **Componentização:** Separar componentes globais em `src/components/layout/`, seções em `src/components/sections/` e UI pura em `src/components/ui/`.
- **Hooks:** Lógica de negócio reutilizável deve residir em `src/hooks/`.
- **Estilização:** Usar Tailwind 4.0. Evitar classes utilitárias excessivas em elementos complexos; preferir a extração de componentes.

### Supabase & Data
- **Lib:** Configuração centralizada em `src/lib/supabase.ts`.
- **SSR:** Usar `@supabase/ssr` para gerenciar sessões no servidor (Middleware/Server Actions).
- **Tipagem:** Utilizar os tipos gerados pelo Supabase CLI sempre que possível.

---

## 🔒 4. Segurança — Checklist Obrigatório

| Ponto | Regra |
|-------|-------|
| RLS (Supabase) | Toda tabela deve ter RLS habilitado. Jamais permitir `INSERT/UPDATE` público sem validação rigorosa. |
| Server Actions | Validar permissões de usuário dentro de cada Server Action usando `supabase.auth.getUser()`. |
| Env Vars | Chaves sensíveis (Service Role) nunca devem ser expostas no cliente (prefixo `NEXT_PUBLIC_`). |
| Injeção | O Supabase/PostgreSQL lida com parametrização. No frontend, validar inputs com Zod ou similar. |
| CORS | Configurar no Supabase para aceitar apenas o domínio de produção e localhost. |

---

## 📁 5. Estrutura de Pastas de Referência

```
src/
├── app/                  # Rotas, Layouts e Server Actions
│   ├── (admin)/          # Grupo de rotas protegidas para administração
│   ├── (auth)/           # Login, Recuperação de senha
│   └── api/              # Endpoints API (se necessário)
├── components/           # Componentes React
│   ├── layout/           # Navbar, Footer, Sidebar
│   ├── sections/         # Seções da Landing Page
│   └── ui/               # Componentes atômicos (Button, Input, Card)
├── hooks/                # Hooks customizados (ex: useLeads, useAuth)
├── lib/                  # Configuração de clientes (Supabase, Utils)
├── services/             # Abstração de chamadas complexas à API/DB
└── types/                # Definições de tipos TypeScript
```

---

## ✅ 6. O que NÃO fazer (restrições explícitas)

- ❌ Não usar `any`. TypeScript deve ser estrito.
- ❌ Não usar bibliotecas de estado global pesadas (Redux) se o estado do servidor (Supabase) for suficiente.
- ❌ Não colocar lógica de banco de dados diretamente em Client Components.
- ❌ Não ignorar o sistema de grid do Tailwind para layouts responsivos.
- ❌ Não fazer commit de arquivos `.env` ou segredos.
