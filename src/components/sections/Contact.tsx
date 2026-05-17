"use client";

import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Loader2, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useLeads } from '@/hooks/useLeads';

const contactInfo = [
  { icon: Phone, label: "WhatsApp / Telefone", value: "(11) 94747-0884", href: "https://wa.me/5511947470884" },
  { icon: Mail, label: "E-mail", value: "vma.contabil@gmail.com", href: "mailto:vma.contabil@gmail.com" },
  { icon: MapPin, label: "Endereço", value: "R. Harold Loyd, 198, Sl 7 — Vargem Gde. Paulista, SP", href: "#" },
];

const subjects = [
  'Abertura de Empresa',
  'Migração de MEI/ME',
  'Consultoria Tributária',
  'Gestão de Folha',
  'Auditoria',
  'Outros',
];

export const Contact = () => {
  const { submitLead, loading, error, success } = useLeads();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Abertura de Empresa',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLead(formData);
    if (!error) {
      setFormData({ name: '', email: '', subject: 'Abertura de Empresa', message: '' });
    }
  };

  const inputClass = `
    w-full px-4 py-3.5 rounded-xl text-[var(--foreground)] text-sm placeholder-[var(--text-muted)]
    focus:outline-none focus:ring-2 focus:ring-[#C8973A]/40 transition-all
    bg-[var(--surface)] border border-[rgba(200,151,58,0.1)]
    hover:border-[rgba(200,151,58,0.3)]
  `;

  return (
    <section id="contato" className="py-28 relative overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* BG accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,151,58,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: '#C8973A' }}>
            <span className="w-8 h-px" style={{ background: '#C8973A' }} />
            Entre em Contato
            <span className="w-8 h-px" style={{ background: '#C8973A' }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Pronto para o próximo nível?
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
            Fale com um especialista e descubra como a VMA pode transformar a gestão contábil da sua empresa.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Left: info + cards */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="flex items-center gap-5 p-5 rounded-2xl group transition-all"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid rgba(200, 151, 58, 0.1)',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ background: 'rgba(200,151,58,0.12)' }}>
                  <item.icon className="w-5 h-5" style={{ color: '#C8973A' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>
                    {item.label}
                  </div>
                  <div className="font-semibold text-sm whitespace-normal break-words" style={{ color: 'var(--foreground)' }}>{item.value}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#C8973A' }} />
              </a>
            ))}

            {/* Horário */}
            <div className="p-6 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(200,151,58,0.1), rgba(200,151,58,0.04))', border: '1px solid rgba(200,151,58,0.2)' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#C8973A' }}>
                Horário de Atendimento
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Segunda — Sexta</span>
                  <span className="font-semibold" style={{ color: 'var(--foreground)' }}>08h — 18h</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Sábado</span>
                  <span className="font-semibold" style={{ color: 'var(--foreground)' }}>09h — 13h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 rounded-2xl p-6 sm:p-8 md:p-10"
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(200, 151, 58, 0.1)',
              backdropFilter: 'blur(20px)',
            }}>

            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-5">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(52,211,153,0.1)' }}>
                  <CheckCircle className="w-10 h-10" style={{ color: '#34D399' }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Mensagem Enviada!</h3>
                <p style={{ color: 'var(--text-muted)' }}>Nossa equipe retornará em até 1 dia útil.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm font-semibold hover:underline"
                  style={{ color: '#C8973A' }}>
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-6">
                  <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>Envie sua mensagem</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Responderemos em até 24 horas.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8A9BB5' }}>
                      Nome Completo *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8A9BB5' }}>
                      E-mail *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@empresa.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8A9BB5' }}>
                    Assunto
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={inputClass}
                    style={{ appearance: 'auto', colorScheme: 'dark' }}
                  >
                    {subjects.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    Mensagem *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descreva como podemos ajudar..."
                    className={inputClass}
                    style={{ resize: 'none' }}
                  />
                </div>

                {error && (
                  <p className="text-sm font-medium px-4 py-3 rounded-xl" style={{ color: '#F87171', background: 'rgba(248,113,113,0.08)' }}>
                    {error}
                  </p>
                )}

                <button
                  disabled={loading}
                  type="submit"
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};