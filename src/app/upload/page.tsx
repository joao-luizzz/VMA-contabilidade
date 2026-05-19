import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DocumentUploader } from '@/components/ui/DocumentUploader';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { UserCheck, ShieldCheck, LogOut } from 'lucide-react';
import { signOutUser } from '@/app/actions';

export const metadata = {
  title: 'Upload de Documentos | VMA Contabilidade',
  description: 'Envio de múltiplos documentos PDF para a VMA Contabilidade.',
};

export default async function UploadPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/upload');
  }

  const isOwner = user.email === 'vma.contabil@gmail.com' || user.app_metadata?.role === 'ADMIN';

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ background: 'var(--background)' }}>
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-16 relative overflow-hidden grid-bg noise-overlay">
        {/* Glowing orbs for premium aesthetics */}
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(200,151,58,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] rounded-full pointer-events-none opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(29,52,97,0.4) 0%, transparent 70%)' }} />
        
        <div className="w-full max-w-xl mx-auto flex flex-col gap-6 relative z-10 animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          {/* User Session Bar */}
          <div 
            className="w-full px-6 py-4 backdrop-blur-md rounded-2xl flex items-center justify-between shadow-lg border"
            style={{
              background: 'var(--surface)',
              borderColor: 'rgba(200, 151, 58, 0.15)',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: isOwner ? 'rgba(200, 151, 58, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: isOwner ? '#C8973A' : '#10B981',
                }}
              >
                {isOwner ? <ShieldCheck className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>
                  Sessão Ativa
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm font-semibold truncate max-w-[180px] sm:max-w-xs" style={{ color: 'var(--foreground)' }}>
                    {user.email}
                  </span>
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0"
                    style={{
                      background: isOwner ? 'rgba(200, 151, 58, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                      borderColor: isOwner ? 'rgba(200, 151, 58, 0.25)' : 'rgba(16, 185, 129, 0.25)',
                      color: isOwner ? '#C8973A' : '#10B981',
                    }}
                  >
                    {isOwner ? 'Proprietário VMA' : 'Cliente'}
                  </span>
                </div>
              </div>
            </div>

            <form action={signOutUser}>
              <button 
                type="submit"
                className="p-2.5 rounded-xl border transition-all hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                style={{
                  borderColor: 'rgba(200, 151, 58, 0.12)',
                  color: 'var(--text-muted)',
                }}
                title="Sair da Conta"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>

          <DocumentUploader />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
