import React from 'react';
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

const footerLinks = {
  Serviços: ['Assessoria Contábil', 'Planejamento Tributário', 'Gestão de Folha', 'Consultoria', 'Abertura de Empresa'],
  Empresa: ['Sobre Nós', 'Nossa Equipe', 'Blog', 'Clientes', 'Parceiros'],
  Legal: ['Política de Privacidade', 'Termos de Uso', 'LGPD'],
};

export const Footer = () => {
  return (
    <footer style={{ background: 'var(--background)', borderTop: '1px solid rgba(200,151,58,0.12)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand col */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #C8973A, #E8B45A)', color: '#0A1628' }}>
                VMA
              </div>
              <div>
                <div style={{ color: 'var(--foreground)', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}>VMA Contabilidade</div>
                <div className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Desde 2009</div>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontWeight: 400, maxWidth: '280px' }}>
              Transformamos números em resultados concretos para empresas que querem crescer com segurança e inteligência fiscal.
            </p>

            <div className="space-y-3">
              {[
                { icon: Phone, text: '+55 (11) 9999-9999' },
                { icon: Mail, text: 'contato@vma.com.br' },
                { icon: MapPin, text: 'Av. Paulista, 1000 — SP' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: '#C8973A' }} />
                  {item.text}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(200,151,58,0.1)', border: '1px solid rgba(200,151,58,0.2)', color: '#C8973A' }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm mb-5" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }}>{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors hover:text-[#C8973A]" style={{ color: 'var(--text-muted)' }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(200,151,58,0.12)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} VMA Contabilidade. Todos os direitos reservados.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            CRC/SP — Registro Ativo
          </p>
        </div>
      </div>
    </footer>
  );
};