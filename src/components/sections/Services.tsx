import React from 'react';
import { Briefcase, Calculator, LineChart, FileText, Users, Scale } from 'lucide-react';

const services = [
  {
    title: "Assessoria Contábil",
    description: "Gestão completa de livros, balanços e demonstrações financeiras com precisão absoluta.",
    icon: Calculator,
  },
  {
    title: "Planejamento Tributário",
    description: "Estratégias inteligentes para redução legal de impostos e otimização de carga tributária.",
    icon: Scale,
  },
  {
    title: "Gestão de Folha",
    description: "Processamento completo de folha de pagamento, encargos sociais e rotinas de RH.",
    icon: Users,
  },
  {
    title: "Consultoria de Negócios",
    description: "Análise estratégica para expansão, valuation e melhoria de rentabilidade.",
    icon: LineChart,
  },
  {
    title: "Abertura de Empresas",
    description: "Suporte total no processo de legalização e estruturação do seu novo negócio.",
    icon: Briefcase,
  },
  {
    title: "Auditoria Interna",
    description: "Verificação rigorosa de processos e controles para garantir segurança e transparência.",
    icon: FileText,
  },
];

export const Services = () => {
  return (
    <section id="servicos" className="py-24 bg-surface dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-accent font-bold tracking-widest uppercase text-sm">Nossas Especialidades</h2>
          <p className="text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
            Soluções completas para sua jornada empresarial
          </p>
          <p className="text-slate-500 text-lg">
            Oferecemos um portfólio robusto de serviços contábeis e consultivos desenhados para cada fase do seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 transform hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary dark:text-accent group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary dark:text-white group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
