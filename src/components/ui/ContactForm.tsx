'use client';

import { useActionState, useState } from 'react';
import { submitLeadForm } from '@/app/actions';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, FileText, Send } from 'lucide-react';

const initialState = {
  success: false,
  message: '',
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitLeadForm, initialState);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setFileName(file.name);
      } else {
        setFileName('');
        e.target.value = '';
        alert('Por favor, selecione um arquivo PDF.');
      }
    } else {
      setFileName('');
    }
  };

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800 text-center animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Tudo certo!</h3>
        <p className="text-zinc-400">{state.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
        >
          Enviar novo formulário
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Fale Conosco</h2>
        <p className="text-zinc-400 mt-2">Preencha os dados e anexe sua documentação em PDF, se aplicável.</p>
      </div>

      {state?.message && !state.success && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{state.message}</p>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="nome" className="text-sm font-medium text-zinc-300">Nome completo</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              required
              disabled={isPending}
              className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all disabled:opacity-50"
              placeholder="Ex: João da Silva"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-300">E-mail corporativo</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              disabled={isPending}
              className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all disabled:opacity-50"
              placeholder="joao@empresa.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="telefone" className="text-sm font-medium text-zinc-300">Telefone / WhatsApp</label>
            <input 
              type="tel" 
              id="telefone" 
              name="telefone" 
              disabled={isPending}
              className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all disabled:opacity-50"
              placeholder="(00) 00000-0000"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="empresa" className="text-sm font-medium text-zinc-300">Nome da Empresa</label>
            <input 
              type="text" 
              id="empresa" 
              name="empresa" 
              disabled={isPending}
              className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all disabled:opacity-50"
              placeholder="Opcional"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="mensagem" className="text-sm font-medium text-zinc-300">Sua mensagem</label>
          <textarea 
            id="mensagem" 
            name="mensagem" 
            rows={4}
            disabled={isPending}
            className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none disabled:opacity-50"
            placeholder="Como a VMA Contabilidade pode ajudar o seu negócio?"
          ></textarea>
        </div>

        <div className="space-y-1.5">
          <span className="text-sm font-medium text-zinc-300">Documento (PDF)</span>
          <div className="relative group">
            <input 
              type="file" 
              id="documento" 
              name="documento"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={isPending}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            />
            <div className={`w-full px-4 py-4 border-2 border-dashed rounded-xl flex items-center justify-center gap-3 transition-colors ${fileName ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-zinc-700 bg-zinc-900/50 group-hover:border-zinc-500 group-hover:bg-zinc-800/50'}`}>
              {fileName ? (
                <>
                  <FileText className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-400 truncate max-w-[200px]">{fileName}</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-5 h-5 text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-400">Clique para anexar ou arraste o PDF</span>
                </>
              )}
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            Tamanho máximo suportado: 10MB
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:hover:bg-emerald-600 flex items-center justify-center gap-2 mt-6"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Enviar Solicitação
              <Send className="w-5 h-5 ml-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
