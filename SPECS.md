# Especificações Técnicas (SPECS) — VMA Contabilidade

## 1. Arquitetura do Sistema

O projeto utiliza uma arquitetura **Serverless** moderna, baseada no framework Next.js e no ecossistema Supabase:

- **Frontend & API (Next.js 16):** Utiliza o **App Router** para renderização híbrida.
    - **Server Components:** Utilizados para a maioria da UI institucional, garantindo performance e SEO.
    - **Server Actions:** Lidam com mutações de dados (ex: envio de formulários) sem a necessidade de APIs REST manuais.
- **Backend-as-a-Service (Supabase):** 
    - **PostgreSQL:** Banco de dados relacional para persistência.
    - **Supabase Auth:** Gestão de usuários e sessões via JWT.
    - **Supabase Storage:** Armazenamento de documentos e imagens.
    - **RLS (Row Level Security):** Controle de acesso granular direto no banco de dados.

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js | 16.2+ |
| Linguagem | TypeScript | 5.x |
| Biblioteca UI | React | 19.0+ |
| Estilização | Tailwind CSS | 4.0 |
| Banco de Dados | PostgreSQL (Supabase) | — |
| Autenticação | Supabase Auth | — |
| Ícones | Lucide React | — |

---

## 3. Modelagem de Dados

### 3.1 Leads (Captação de Clientes)

| Atributo | Tipo SQL | Obrigatório | Observação |
|----------|----------|-------------|-----------|
| `id` | UUID (PK) | Sim | Gerado pelo Supabase |
| `nome` | VARCHAR(255) | Sim | — |
| `email` | VARCHAR(255) | Sim | — |
| `telefone` | VARCHAR(20) | Não | — |
| `assunto` | VARCHAR(150) | Não | — |
| `mensagem` | TEXT | Sim | — |
| `status` | ENUM('NOVO','EM_ATENDIMENTO','CONCLUIDO') | Sim | Padrão: 'NOVO' |
| `created_at` | TIMESTAMPTZ | Sim | Automático |

### 3.2 Perfis (Users)

| Atributo | Tipo SQL | Obrigatório | Observação |
|----------|----------|-------------|-----------|
| `id` | UUID (PK) | Sim | FK → auth.users.id |
| `nome_completo` | VARCHAR(255) | Sim | — |
| `role` | ENUM('ADMIN','CLIENTE') | Sim | — |
| `empresa_id` | UUID (FK) | Não | Apenas para clientes |

### 3.3 Empresas (Futuro)

| Atributo | Tipo SQL | Obrigatório | Observação |
|----------|----------|-------------|-----------|
| `id` | UUID (PK) | Sim | — |
| `razao_social` | VARCHAR(255) | Sim | — |
| `cnpj` | VARCHAR(18) UNIQUE | Sim | — |
| `status_contabil` | VARCHAR(50) | Sim | Regular, Pendente, etc. |

---

## 4. Fluxos Principais

### 4.1 Captura de Lead
1. Usuário preenche o formulário na seção "Contato".
2. Hook `useLeads` ou Server Action valida os dados.
3. Inserção na tabela `leads` via Supabase Client.
4. Notificação (futuro: email/dashboard admin).

### 4.2 Autenticação Admin
1. Login via `/login` usando Supabase Auth.
2. Middleware do Next.js verifica o token JWT.
3. Se a role for `ADMIN`, permite acesso à rota `/admin`.
4. Dados são filtrados via RLS para garantir que apenas admins vejam todos os leads.

---

## 5. Regras de Segurança

| Recurso | Regra RLS |
|---------|-----------|
| **Leads** | `INSERT` permitido para público; `SELECT/UPDATE/DELETE` apenas para `ADMIN`. |
| **Documentos** | `SELECT` apenas para o proprietário (`user_id`) ou `ADMIN`. |
| **Perfis** | Usuário só pode ler seu próprio perfil; `ADMIN` lê todos. |

---

## 6. Padrões de Interface (UI)

- **Cores:** Azul Marinho Profundo, Slate e Acentos em Dourado/Turquesa (Elegância Contábil).
- **Tipografia:** Inter ou Montserrat para clareza e profissionalismo.
- **Responsividade:** Mobile-first, garantindo legibilidade em todos os dispositivos.
- **Interatividade:** Hover effects sutis em cards de serviços e botões.

---

## 7. Estrutura de Rotas (Next.js)

```
/ (Home)
├── #servicos (Anchor)
├── #contato (Anchor)
├── /login (Acesso Admin/Cliente)
├── /admin (Dashboard Administrativa)
│   ├── /leads (Gestão de contatos)
│   └── /clientes (Gestão de empresas)
└── /portal (Área do Cliente)
    └── /documentos (Consulta de arquivos)
```
