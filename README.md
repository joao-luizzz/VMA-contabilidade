# VMA Contabilidade - Plataforma de Assessoria Empresarial

<p align="center">
  <strong>Solução digital moderna para gestão contábil, consultoria tributária e suporte estratégico para empresas.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-000000?logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Supabase-JS-3ECF8E?logo=supabase&logoColor=white" alt="Supabase">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Arquitetura-Serverless-blue?logo=architecture&logoColor=white" alt="Arquitetura">
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow" alt="Status">
</p>

---

## 📌 Sobre o Projeto

O **VMA Contabilidade** é uma plataforma web premium desenvolvida para elevar o padrão de atendimento de serviços contábeis. Focada em performance e experiência do usuário, a aplicação serve como porta de entrada digital para clientes que buscam assessoria contábil, planejamento tributário e consultoria de negócios de alto nível.

A plataforma utiliza as tecnologias mais recentes do ecossistema JavaScript para garantir uma interface fluida, segura e altamente responsiva.



---

## 🚀 Estado Atual e Progresso

O projeto está em fase ativa de desenvolvimento, com a fundação e o fluxo principal de captação de clientes já implementados.

### 🗺️ Roadmap de Desenvolvimento

- [x] **Setup Inicial:** Configuração do Next.js 16 (App Router), Tailwind 4 e TypeScript.
- [x] **Interface Premium:** Landing page completa com design moderno e responsivo.
- [x] **Componentização:** Navbar, Hero, Services, Contact e Footer modulares.
- [x] **Captação de Leads:** Integração funcional com banco de dados via Supabase (Hook `useLeads`).
- [x] **Recursos Úteis:** Calculadora CLT vs PJ e Calendário Fiscal implementados.
- [x] **Identidade Visual:** Design system baseado em cores sóbrias e tipografia premium.
- [ ] **Painel Administrativo:** Dashboard para gestão interna dos leads e solicitações.
- [ ] **Sistema de Autenticação:** Acesso seguro para administradores.
- [ ] **Blog/Notícias:** Área para publicação de novidades do setor tributário e contábil.
- [ ] **SEO & Analytics:** Otimização avançada para motores de busca e rastreamento de métricas.

---

## 🛠️ Tech Stack

### Frontend & Core
| Tecnologia | Uso |
|------------|-----|
| **Next.js 16** | Framework Fullstack com renderização híbrida e App Router. |
| **React 19** | Biblioteca base para UI com os novos hooks e melhorias de performance. |
| **Tailwind CSS 4** | Estilização utilitária de última geração com engine otimizada. |
| **Lucide React** | Pacote de ícones modernos e leves. |
| **TypeScript** | Garantia de tipos e segurança em todo o ciclo de desenvolvimento. |

### Backend & Infra
| Tecnologia | Uso |
|------------|-----|
| **Supabase** | Backend-as-a-Service para persistência de dados em PostgreSQL. |
| **Edge Runtime** | Execução de funções próxima ao usuário para latência mínima. |

---

## 📋 Funcionalidades Implementadas

### Área Institucional
- **Hero Dinâmico:** Apresentação de alto impacto visual com foco em conversão.
- **Catálogo de Serviços:** Exposição detalhada das especialidades (Assessoria, Planejamento, RH, etc.).
- **Calculadora CLT vs PJ:** Ferramenta interativa de comparação de rendimentos.
- **Calendário Fiscal:** Visualização clara das datas de obrigações recorrentes (Dia 10 e 20).
- **Formulário Inteligente:** Captura de leads com validação em tempo real e feedback de status.

### Integrações
- **Database Real-time:** Registro automático de solicitações de contato na tabela `leads` do Supabase.
- **Hook Customizado:** `useLeads` para abstração de lógica de submissão e tratamento de erros.

---

## 💻 Como Executar Localmente

### Pré-requisitos
- Node.js 20+
- NPM ou PNPM
- Conta no Supabase (para as variáveis de ambiente)

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
├── app/              # Rotas e Layouts (App Router)
├── components/       # Componentes React (layout, sections, ui)
├── hooks/            # Hooks customizados (lógica de leads)
├── lib/              # Configurações de bibliotecas (Supabase)
└── assets/           # Imagens e recursos estáticos
```

---
+
+## 👥 Equipe
+
+- **Lucas Lucachak** — Full Stack Developer
+- **João Luiz** — QA & Documentation
+
 ---

<p align="center">
  <sub>VMA Contabilidade - Excelência em Gestão Empresarial.</sub>
</p>
# VMA
