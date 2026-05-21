# Matriz de Requisitos — VMA Contabilidade

> **Status do Projeto:** ✅ Concluído — Todas as funcionalidades do escopo foram implementadas.

---

## 1. Requisitos Funcionais (RF)

| ID | Funcionalidade | Descrição | Ator | Prioridade | Status |
|:---|:---|:---|:---|:---|:---|
| **RF01** | Landing Page Institucional | Exibir informações sobre a VMA, incluindo seções de Hero, Serviços, Sobre e Rodapé. | Visitante | Alta | ✅ Concluído |
| **RF02** | Catálogo de Serviços | Listar especialidades contábeis com descrições claras e ícones representativos. | Visitante | Alta | ✅ Concluído |
| **RF03** | Formulário de Contato (Lead) | Permitir que interessados enviem nome, e-mail, telefone, empresa e mensagem, com suporte a anexo de PDF. | Visitante | Alta | ✅ Concluído |
| **RF04** | Persistência de Leads | Salvar automaticamente os dados do formulário no banco de dados com status `NOVO` via Server Action. | Sistema | Alta | ✅ Concluído |
| **RF05** | Autenticação Administrativa | Permitir login de funcionários e clientes da VMA via e-mail e senha com Supabase Auth. | Admin/Cliente | Alta | ✅ Concluído |
| **RF06** | Upload de Documentos | Upload seguro de múltiplos PDFs (até 10MB cada) no Supabase Storage via página `/upload`. | Admin/Cliente | Alta | ✅ Concluído |
| **RF07** | Gestão de Sessão | Exibir sessão ativa com e-mail, role (Cliente/Proprietário) e opção de logout na área restrita. | Admin/Cliente | Média | ✅ Concluído |
| **RF08** | Controle de Acesso | Redirecionar para `/login` caso o usuário tente acessar `/upload` sem autenticação. | Sistema | Alta | ✅ Concluído |
| **RF09** | Calculadora CLT vs PJ | Ferramenta para comparar rendimentos líquidos entre regimes CLT e PJ. | Visitante | Alta | ✅ Concluído |
| **RF10** | Calendário Fiscal | Visualização de datas recorrentes de obrigações (Dia 10 e 20). | Visitante | Média | ✅ Concluído |
| **RF11** | Blog de Notícias | Publicação de artigos técnicos e novidades tributárias para SEO. | Admin | Baixa | ⏸️ Fora do escopo |

---

## 2. Requisitos Não Funcionais (RNF)

| ID | Categoria | Descrição | Status |
|:---|:---|:---|:---|
| **RNF01** | Performance | Pontuação mínima de 90 no Lighthouse para Performance e SEO. | ✅ Implementado |
| **RNF02** | Segurança | Row Level Security (RLS) no Supabase + validação de arquivos no servidor (tipo e tamanho). | ✅ Implementado |
| **RNF03** | Interface | Design responsivo e premium utilizando Tailwind CSS 4. | ✅ Implementado |
| **RNF04** | Disponibilidade | Arquitetura compatível com Edge (Vercel) para alta disponibilidade e latência mínima. | ✅ Implementado |
| **RNF05** | Manutenibilidade | Código 100% tipado com TypeScript, App Router e Server Actions do Next.js 15. | ✅ Implementado |
| **RNF06** | UX | Feedback visual claro com `useActionState` para envio de formulários e estados de carregamento. | ✅ Implementado |
| **RNF07** | SEO | Meta tags por página (`metadata` export) e estrutura semântica de cabeçalhos. | ✅ Implementado |

---

## 3. Regras de Negócio (RN)

| ID | Descrição | Status |
|:---|:---|:---|
| **RN01** | Um lead só é considerado válido se possuir nome e e-mail preenchidos. | ✅ Validado no servidor |
| **RN02** | O acesso à página de upload é exclusivo para usuários autenticados. | ✅ Validado server-side |
| **RN03** | Apenas arquivos do tipo `application/pdf` com no máximo 10MB são aceitos no upload. | ✅ Validado server-side |
| **RN04** | Todo lead criado via formulário recebe o status inicial `'NOVO'`. | ✅ Implementado via Server Action |
| **RN05** | O papel `Proprietário VMA` é identificado pelo e-mail `vma.contabil@gmail.com` ou `role: 'ADMIN'` no metadata. | ✅ Implementado na `/upload` |

---

## 4. Fora de Escopo

- Emissão direta de Notas Fiscais (integração com prefeituras).
- Cálculo automatizado de impostos em tempo real.
- Chat em tempo real (substituído por formulário de contato e WhatsApp).
- Aplicativo móvel dedicado (substituído por Web App Responsivo).
- Blog/CMS de notícias (prioridade baixa, não incluído no escopo final).

---

## 5. Rastreabilidade

| RF | Funcionalidade | Implementação |
|:---|:---|:---|
| RF01/02 | Landing Page | `src/app/page.tsx` → Sections: `Hero`, `Services`, `About`, `Contact`, `Footer` |
| RF03/04 | Lead Capture | `ContactForm.tsx` + `actions.ts` → `submitLeadForm()` → tabela `leads` |
| RF05 | Autenticação | `src/app/login/page.tsx` + `actions.ts` → `signInWithEmail()` |
| RF06/07/08 | Upload Restrito | `src/app/upload/page.tsx` + `DocumentUploader.tsx` + `actions.ts` → `uploadMultiplePdfs()` |
| RF09 | Calculadora | `src/components/sections/CltPjCalculator.tsx` |
