'use client';

import { useActionState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { signInWithEmail } from '@/app/actions';
import { KeyRound, Mail, Loader2, AlertCircle } from 'lucide-react';

const initialState = {
  success: false,
  message: '',
};

function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/upload';

  useEffect(() => {
    if (state?.success) {
      router.push(redirectUrl);
      router.refresh();
    }
  }, [state, router, redirectUrl]);

  return (
    <div className="w-full max-w-md mx-auto relative z-10 animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
      <div 
        className="px-6 py-8 sm:p-8 backdrop-blur-md rounded-2xl shadow-2xl"
        style={{
          background: 'var(--surface)',
          border: '1px solid rgba(200, 151, 58, 0.15)',
        }}
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
            Área do <span className="text-gradient">Cliente</span> & Admin
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            Faça login para gerenciar e enviar seus documentos com segurança.
          </p>
        </div>

        {state?.message && !state.success && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{state.message}</p>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--foreground)' }}>
              E-mail institucional
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <input
                type="email"
                name="email"
                required
                placeholder="exemplo@vmacontabilidade.com"
                disabled={isPending}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-transparent text-sm focus:outline-none transition-all placeholder:text-[var(--text-muted)]/50"
                style={{
                  borderColor: 'rgba(200, 151, 58, 0.15)',
                  color: 'var(--foreground)',
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--foreground)' }}>
              Senha de acesso
            </label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                disabled={isPending}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-transparent text-sm focus:outline-none transition-all placeholder:text-[var(--text-muted)]/50"
                style={{
                  borderColor: 'rgba(200, 151, 58, 0.15)',
                  color: 'var(--foreground)',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#C8973A] to-[#E8B45A] hover:brightness-110 text-primary font-bold rounded-xl shadow-[0_4px_24px_rgba(200,151,58,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            style={{ color: '#0A1628' }}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Autenticando...
              </>
            ) : (
              'Entrar na Conta'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ background: 'var(--background)' }}>
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 pt-32 pb-16 relative overflow-hidden grid-bg noise-overlay">
        {/* Glowing orbs for premium aesthetics */}
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(200,151,58,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] rounded-full pointer-events-none opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(29,52,97,0.4) 0%, transparent 70%)' }} />
        
        <Suspense fallback={
          <div className="w-full max-w-md mx-auto relative z-10 flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-[#C8973A]" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}
