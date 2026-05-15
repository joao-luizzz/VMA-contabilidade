import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full text-accent text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Excelência em Contabilidade Estratégica
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary dark:text-white leading-[1.1]">
            Transformamos seus <span className="text-accent italic">Números</span> em Resultados.
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            A VMA Contabilidade oferece soluções inteligentes para empresas que buscam crescimento sólido e conformidade fiscal impecável.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-light transition-all shadow-xl shadow-primary/20 group">
              Começar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
              Ver Serviços
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Suporte Personalizado
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Tecnologia de Ponta
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* I will use a placeholder logic or a generated image later if needed, 
                for now a stylish div with a gradient and pattern */}
            <div className="aspect-[4/5] bg-gradient-to-br from-primary to-primary-light flex items-center justify-center p-12">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <ShieldCheck className="w-12 h-12 text-accent" />
                </div>
                <div className="text-4xl font-bold text-white tracking-tighter italic">VMA</div>
                <div className="text-sm uppercase tracking-[0.3em] text-white/60">Contabilidade</div>
              </div>
            </div>
          </div>
          {/* Decorative stats card */}
          <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 animate-bounce-slow">
            <div className="text-3xl font-bold text-primary dark:text-white">+150</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Clientes Ativos</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);
