# Matriz de Requisitos — VMA Contabilidade

## 1. Requisitos Funcionais (RF)

| ID | Funcionalidade | Descrição | Ator | Prioridade |
|:---|:---|:---|:---|:---|
| **RF01** | Landing Page Institucional | Exibir informações sobre a VMA, incluindo seções de Hero, Serviços, Sobre e Rodapé. | Visitante | Alta |
| **RF02** | Catálogo de Serviços | Listar especialidades contábeis com descrições claras e ícones representativos. | Visitante | Alta |
| **RF11** | Calculadora CLT vs PJ | Ferramenta para comparar rendimentos líquidos entre regimes CLT e PJ. | Visitante | Alta |
| **RF12** | Calendário Fiscal | Visualização de datas recorrentes de obrigações (Dia 10 e 20). | Visitante | Alta |
| **RF03** | Formulário de Contato (Lead) | Permitir que interessados enviem nome, e-mail, telefone e mensagem. | Visitante | Alta |
| **RF04** | Persistência de Leads | Salvar automaticamente os dados do formulário no banco de dados com status "NOVO". | Sistema | Alta |
| **RF05** | Autenticação Administrativa | Permitir login de funcionários da VMA para acessar a área restrita. | Admin | Alta |
| **RF06** | Gestão de Leads | Visualizar, filtrar e atualizar o status dos leads (ex: "Em Atendimento", "Concluído"). | Admin | Média |
| **RF07** | Dashboard Admin | Resumo métrico de novos leads e solicitações recentes. | Admin | Média |
| **RF08** | Portal do Cliente (Futuro) | Área logada para clientes consultarem guias de impostos e documentos. | Cliente | Baixa |
| **RF09** | Upload de Documentos (Futuro) | Upload seguro de documentos fiscais/contábeis via dashboard. | Sistema | Baixa |
| **RF10** | Blog de Notícias | Publicação de artigos técnicos e novidades tributárias para SEO. | Admin | Baixa |

---

## 2. Requisitos Não Funcionais (RNF)

| ID | Categoria | Descrição |
|:---|:---|:---|
| **RNF01** | Performance | Pontuação mínima de 90 no Lighthouse para Performance e SEO. |
| **RNF02** | Segurança | Implementação de Row Level Security (RLS) no Supabase para proteção de dados. |
| **RNF03** | Interface | Design responsivo e premium utilizando Tailwind CSS 4. |
| **RNF04** | Disponibilidade | Hospedagem em plataforma Edge (ex: Vercel) para garantir alta disponibilidade. |
| **RNF05** | Manutenibilidade | Código 100% tipado com TypeScript e seguindo padrões do App Router do Next.js. |
| **RNF06** | UX | Feedback visual claro para ações de envio de formulário e carregamento. |
| **RNF07** | SEO | Meta tags dinâmicas e estrutura de cabeçalhos (H1-H6) otimizada para buscadores. |

---

## 3. Regras de Negócio (RN)

| ID | Descrição |
|:---|:---|
| **RN01** | Um lead só é considerado válido se possuir nome, e-mail e mensagem preenchidos. |
| **RN02** | O acesso à dashboard administrativa é exclusivo para usuários com a role "ADMIN". |
| **RN03** | Documentos enviados por um cliente só podem ser visualizados por ele mesmo e pela equipe "ADMIN". |
| **RN04** | O status de um lead deve seguir o fluxo lógico de atendimento comercial. |

---

## 4. Fora de Escopo

- Emissão direta de Notas Fiscais (integração com prefeituras).
- Cálculo automatizado de impostos em tempo real (fora da fase inicial).
- Chat em tempo real (substituído por formulário de contato e WhatsApp).
- Aplicativo móvel dedicado (substituído por Web App Responsivo).

---

## 5. Rastreabilidade

| RF | Funcionalidade | Caso de Uso |
|:---|:---|:---|
| RF01/02 | Landing Page | Visitante navega no site e conhece os serviços. |
| RF03/04 | Lead Capture | Visitante envia formulário e sistema gera registro. |
| RF05/06 | Admin | Contador faz login e gerencia novos contatos. |
| RF08/09 | Portal | Cliente acessa o portal para baixar uma guia de imposto. |
