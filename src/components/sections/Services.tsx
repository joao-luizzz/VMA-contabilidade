import React from 'react';
import { Briefcase, Calculator, LineChart, FileText, Users, Scale, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "Assessoria Contábil",
    description: "Gestão completa de livros, balanços e demonstrações financeiras com precisão absoluta e relatórios claros.",
    icon: Calculator,
    tag: "Essencial",
  },
  {
    title: "Planejamento Tributário",
    description: "Estratégias inteligentes para redução legal de impostos e otimização da carga tributária da sua empresa.",
    icon: Scale,
    tag: "Mais Procurado",
    highlight: true,
  },
  {
    title: "Gestão de Folha",
    description: "Processamento completo de folha de pagamento, encargos sociais, eSocial e todas as rotinas de RH.",
    icon: Users,
    tag: "RH & DP",
  },
  {
    title: "Consultoria de Negócios",
    description: "Análise estratégica para expansão, valuation, reestruturação e melhoria de rentabilidade operacional.",
    icon: LineChart,
    tag: "Estratégico",
  },
  {
    title: "Abertura de Empresas",
    description: "Suporte total no processo de legalização, enquadramento tributário e estruturação do seu negócio.",
    icon: Briefcase,
    tag: "Início",
  },
  {
    title: "Auditoria Interna",
    description: "Verificação rigorosa de processos e controles internos para garantir segurança e transparência.",
    icon: FileText,
    tag: "Compliance",
  },
];

export const Services = () => {
  return (
    <section id="servicos" className="py-28 relative" style={{ background: 'var(--background)' }}>
      {/* Top diagonal */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="0,0 1440,80 1440,0" fill="var(--background)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-16 max-w-2xl opacity-0 reveal">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: '#C8973A' }}>
            <span className="w-8 h-px" style={{ background: '#C8973A' }} />
            Nossas Especialidades
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: 'var(--foreground)' }}>
            Soluções completas para cada fase do seu negócio
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
            Um portfólio robusto de serviços contábeis e consultivos, desenhados para empresas que querem crescer com solidez.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card-hover group relative p-8 rounded-2xl cursor-pointer opacity-0 reveal ${service.highlight ? 'ring-1 ring-[#C8973A]/30' : ''}`}
              style={{
                background: service.highlight
                  ? 'linear-gradient(145deg, rgba(200,151,58,0.12), var(--surface))'
                  : 'var(--surface)',
                border: `1px solid ${service.highlight ? 'rgba(200,151,58,0.3)' : 'rgba(200, 151, 58, 0.1)'}`,
                animationDelay: `${0.1 + (index * 0.1)}s`,
              }}
            >
              {/* Tag */}
              <div className="absolute top-6 right-6">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    background: service.highlight ? 'rgba(200,151,58,0.2)' : 'rgba(200, 151, 58, 0.08)',
                    color: service.highlight ? '#C8973A' : 'var(--text-muted)',
                  }}>
                  {service.tag}
                </span>
              </div>

              {/* Icon */}
              <div className="w-13 h-13 mb-6 rounded-xl flex items-center justify-center w-12 h-12"
                style={{
                  background: service.highlight ? 'rgba(200,151,58,0.2)' : 'rgba(255,255,255,0.05)',
                  transition: 'background 0.3s ease',
                }}>
                <service.icon className="w-6 h-6"
                  style={{ color: service.highlight ? '#C8973A' : 'var(--text-muted)', transition: 'color 0.3s' }} />
              </div>

              <h3 className="text-lg font-bold mb-3 group-hover:text-[#C8973A] transition-colors" style={{ color: 'var(--foreground)' }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {service.description}
              </p>

              <div className="mt-6 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: '#C8973A' }}>
                Saiba mais <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="mt-16 p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(200,151,58,0.12), rgba(200,151,58,0.05))',
            border: '1px solid rgba(200,151,58,0.2)',
          }}>
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Não encontrou o que procura?</h3>
            <p style={{ color: 'var(--text-muted)' }}>Fale conosco e montamos uma proposta personalizada para o seu negócio.</p>
          </div>
          <a href="#contato"
            className="btn-primary px-8 py-4 whitespace-nowrap flex items-center gap-2 text-sm">
            Falar com Especialista
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};