"use client";

import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import Image from 'next/image';

const stats = [
  { value: '+150', label: 'Clientes Ativos' },
  { value: '15+', label: 'Anos de Mercado' },
  { value: '98%', label: 'Satisfação' },
  { value: 'R$50M+', label: 'Em Economia Fiscal' },
];

export const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg noise-overlay"
      style={{ background: 'var(--background)' }}
    >
      {/* Glowing orbs */}
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,151,58,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(29,52,97,0.6) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest opacity-0 reveal"
              style={{ background: 'rgba(200,151,58,0.12)', border: '1px solid rgba(200,151,58,0.25)', color: '#C8973A' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#C8973A' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#C8973A' }}></span>
              </span>
              Excelência em Contabilidade Estratégica
            </div>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-[1.1] md:leading-[1.05] tracking-tight opacity-0 reveal stagger-1" style={{ color: 'var(--foreground)' }}>
              Sua empresa{' '}
              <span className="text-gradient">crescendo</span>{' '}
              com segurança fiscal.
            </h1>

            <p className="text-lg leading-relaxed max-w-lg opacity-0 reveal stagger-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
              A VMA Contabilidade oferece soluções estratégicas para empresas que buscam crescimento sólido, conformidade fiscal impecável e mais tempo para focar no que importa.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 opacity-0 reveal stagger-3">
              <a href="https://wa.me/5511947470884" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 flex items-center gap-2 text-sm">
                Falar com Especialista
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#servicos" className="btn-outline px-8 py-4 flex items-center gap-2 text-sm">
                Nossos Serviços
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {['CRC Certificado', 'LGPD Compliance', 'Sigiloso'].map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg className="w-4 h-4" style={{ color: '#C8973A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual card stack */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="animate-float">
              {/* Main card */}
              <div className="relative w-80 rounded-2xl p-8 text-center shadow-2xl transition-all duration-500"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid rgba(200,151,58,0.2)',
                  boxShadow: '0 32px 64px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                <div className="mb-6 opacity-80">
                  <div className="w-12 h-1 mx-auto rounded-full bg-gradient-to-r from-transparent via-[#C8973A] to-transparent opacity-30" />
                </div>
                <Logo className="relative w-40 h-16 mx-auto mb-2" />

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {stats.slice(0, 2).map((s, i) => (
                    <div key={i} className="p-3 rounded-xl text-left" style={{ background: 'rgba(200,151,58,0.08)' }}>
                      <div className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{s.value}</div>
                      <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-10 px-5 py-4 rounded-xl"
                style={{
                  background: '#C8973A',
                  boxShadow: '0 16px 32px rgba(200,151,58,0.4)'
                }}>
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-primary/70">Satisfação</div>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -top-4 -left-8 px-5 py-4 rounded-xl"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid rgba(200,151,58,0.25)',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.1)'
                }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>15+</div>
                <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Anos de Exp.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: 'rgba(200,151,58,0.15)' }}>
          {stats.map((s, i) => (
            <div key={i} className="py-8 px-8 text-center opacity-0 reveal"
              style={{ background: 'var(--surface)', animationDelay: `${0.4 + (i * 0.1)}s` }}>
              <div className="text-3xl font-bold text-gradient mb-1">{s.value}</div>
              <div className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: '#C8973A' }} />
      </div>
    </section>
  );
};

const ShieldCheck = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);