import React from 'react';
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import Image from 'next/image';

const footerLinks = [
  {
    title: 'Serviços',
    links: [
      { label: 'Assessoria Contábil', href: '/#servicos' },
      { label: 'Planejamento Tributário', href: '/#servicos' },
      { label: 'Gestão de Folha', href: '/#servicos' },
      { label: 'Consultoria', href: '/#servicos' },
      { label: 'Abertura de Empresa', href: '/#servicos' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', href: '/#sobre' },
      { label: 'Enviar Documentos', href: '/upload' },
      { label: 'Contato', href: '/#contato' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Termos de Uso', href: '#' },
      { label: 'LGPD', href: '#' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer style={{ background: 'var(--background)', borderTop: '1px solid rgba(200,151,58,0.12)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand col */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 group">
              <Logo className="relative w-52 h-16 transition-transform duration-300 group-hover:scale-105" />
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontWeight: 400, maxWidth: '280px' }}>
              Transformamos números em resultados concretos para empresas que querem crescer com segurança e inteligência fiscal.
            </p>

            <div className="space-y-3">
              {[
                { icon: Phone, text: '(11) 94747-0884', href: 'https://wa.me/5511947470884' },
                { icon: Mail, text: 'vma.contabil@gmail.com', href: 'mailto:vma.contabil@gmail.com' },
                { icon: MapPin, text: 'R. Harold Loyd, 198, Sl 7 - Vargem Gde. Paulista, SP', href: '#' },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-3 text-sm hover:text-[#C8973A] transition-colors" style={{ color: 'var(--text-muted)' }}>
                  <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: '#C8973A' }} />
                  {item.text}
                </a>
              ))}
            </div>


          </div>

          {/* Link cols */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-sm mb-5" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }}>{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm transition-colors hover:text-[#C8973A]" style={{ color: 'var(--text-muted)' }}>
                      {link.label}
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
            CRC/SP — Registro Ativo | CEP 06731-244
          </p>
        </div>
      </div>
    </footer>
  );
};