import React from 'react';
import Link from 'next/link';
import { Menu, X, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold tracking-tighter text-primary dark:text-white">
              VMA <span className="font-light text-accent">Contabilidade</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#inicio" className="text-sm font-medium hover:text-accent transition-colors">Início</Link>
            <Link href="#servicos" className="text-sm font-medium hover:text-accent transition-colors">Serviços</Link>
            <Link href="#sobre" className="text-sm font-medium hover:text-accent transition-colors">Sobre</Link>
            <Link href="#contato" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light transition-all shadow-lg hover:shadow-primary/20">
              Fale Conosco
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center py-8">
            <Link href="#inicio" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-lg font-medium">Início</Link>
            <Link href="#servicos" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-lg font-medium">Serviços</Link>
            <Link href="#sobre" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-lg font-medium">Sobre</Link>
            <Link href="#contato" onClick={() => setIsOpen(false)} className="mt-4 bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold">
              Fale Conosco
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
