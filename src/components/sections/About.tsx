"use client";

import React from 'react';
import { Target, Shield, Zap, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Conformidade rigorosa com normas fiscais e proteção absoluta dos seus dados."
  },
  {
    icon: Zap,
    title: "Agilidade Digital",
    description: "Processos otimizados e tecnologia de ponta para respostas rápidas ao seu negócio."
  },
  {
    icon: Target,
    title: "Foco em Resultado",
    description: "Nossa meta é a sua economia tributária e o crescimento sustentável da sua empresa."
  }
];

export const About = () => {
  return (
    <section id="sobre" className="py-28 relative overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image/Visual side */}
          <div className="relative opacity-0 reveal">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-square">
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent z-10"
                style={{ background: 'linear-gradient(45deg, var(--primary) 0%, transparent 100%)' }}
              />
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000" 
                alt="Escritório VMA" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              
              {/* Floating experience box */}
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-xl backdrop-blur-md z-20"
                style={{ 
                  background: 'var(--surface)', 
                  opacity: 0.9,
                  border: '1px solid rgba(200, 151, 58, 0.2)' 
                }}>
                <div className="text-4xl font-bold text-gradient mb-1">15+</div>
                <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--foreground)' }}>Anos transformando empresas</div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl -z-10 border-2 border-[var(--accent)] opacity-20 animate-pulse" />
          </div>

          {/* Right: Content side */}
          <div className="space-y-8">
            <div className="opacity-0 reveal stagger-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: 'var(--accent)' }}>
                <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                Nossa História
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--foreground)' }}>
                Mais que contadores, somos seu braço <span className="text-gradient">estratégico</span>.
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Desde 2009, a VMA Contabilidade nasceu com o propósito de desmistificar a burocracia brasileira. Entendemos que cada número conta uma história de esforço e dedicação.
              </p>
              <p className="text-lg leading-relaxed mt-4" style={{ color: 'var(--text-muted)' }}>
                Hoje, unimos a tradição da contabilidade consultiva com a inovação digital para entregar agilidade e economia real para centenas de parceiros em todo o Brasil.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-1 gap-6 opacity-0 reveal stagger-2">
              {values.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl transition-all hover:bg-[var(--surface)]">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(200,151,58,0.1)', color: 'var(--accent)' }}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="opacity-0 reveal stagger-3">
              <a href="#contato" className="inline-flex items-center gap-2 font-bold transition-all hover:gap-4" 
                style={{ color: 'var(--accent)' }}>
                Conheça nossa metodologia <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
