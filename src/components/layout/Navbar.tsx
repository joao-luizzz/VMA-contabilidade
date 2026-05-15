"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'var(--background)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,151,58,0.12)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">

            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #C8973A, #E8B45A)', color: '#0A1628' }}>
                VMA
              </div>
              <div>
                <div style={{ color: 'var(--foreground)', fontWeight: 'bold', fontSize: '14px', fontFamily: 'var(--font-display)' }}>
                  VMA
                </div>
                <div className="text-[10px] uppercase tracking-widest leading-tight" style={{ color: 'var(--text-muted)' }}>
                  Contabilidade
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-[#C8973A]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA & Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <a href="tel:+5511999999999" className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                <Phone className="w-4 h-4" style={{ color: '#C8973A' }} />
                (11) 9999-9999
              </a>
              <a href="#contato" className="btn-primary px-5 py-2.5 text-sm">
                Falar Conosco
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setMobileOpen(false)} />
        <div
          className="absolute top-0 right-0 bottom-0 w-72 p-8 flex flex-col gap-8"
          style={{
            background: 'var(--background)',
            borderLeft: '1px solid rgba(200,151,58,0.15)',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease',
          }}
        >
          <div className="mt-12 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-semibold hover:text-[var(--primary)] transition-colors"
                style={{ color: 'var(--foreground)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a href="#contato" onClick={() => setMobileOpen(false)} className="btn-primary px-6 py-3 text-center text-sm mt-auto">
            Falar Conosco
          </a>
        </div>
      </div>
    </>
  );
};