"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import Image from 'next/image';

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
          <div className="grid grid-cols-2 md:grid-cols-3 items-center h-18 py-4">
            
            {/* Left: Logo */}
            <div className="flex justify-start">
              <a href="#inicio" className="flex items-center gap-3 group">
                <Logo className="relative w-36 h-10 md:w-44 md:h-14 transition-transform duration-300 group-hover:scale-105" priority />
              </a>
            </div>

            {/* Center: Desktop nav */}
            <nav className="hidden md:flex items-center justify-center gap-8">
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

            {/* Right: CTA, Theme Toggle & Mobile Toggle */}
            <div className="flex items-center justify-end gap-4">
              <div className="hidden md:flex items-center gap-4">
                <ThemeToggle />
                <a href="tel:+5511947470884" className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  <Phone className="w-4 h-4" style={{ color: '#C8973A' }} />
                  <span className="hidden lg:inline">(11) 94747-0884</span>
                </a>
                <a href="https://wa.me/5511947470884" target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5 text-sm whitespace-nowrap">
                  Falar Conosco
                </a>
              </div>

              {/* Mobile toggle button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
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
          className="absolute top-0 right-0 bottom-0 w-[280px] p-8 flex flex-col"
          style={{
            background: 'var(--background)',
            borderLeft: '1px solid rgba(200,151,58,0.15)',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Logo in Drawer */}
          <div className="flex justify-start mb-8">
            <Logo className="relative w-32 h-10" />
          </div>

          <div className="flex flex-col gap-6">
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
          <a href="https://wa.me/5511947470884" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="btn-primary px-6 py-3 text-center text-sm mt-auto">
            Falar Conosco
          </a>
        </div>
      </div>
    </>
  );
};