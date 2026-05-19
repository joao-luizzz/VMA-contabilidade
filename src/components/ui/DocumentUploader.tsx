'use client';

import { useActionState, useState, useRef } from 'react';
import { uploadMultiplePdfs } from '@/app/actions';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, FileText, Send, X } from 'lucide-react';

const initialState = {
  success: false,
  message: '',
};

export function DocumentUploader() {
  const [state, formAction, isPending] = useActionState(uploadMultiplePdfs, initialState);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(file => file.type === 'application/pdf');
      
      if (validFiles.length !== selectedFiles.length) {
        alert('Alguns arquivos foram ignorados. Apenas arquivos PDF são permitidos.');
      }
      
      setFiles(prev => [...prev, ...validFiles]);
      // Reset input para permitir selecionar o mesmo arquivo novamente, se necessário
      e.target.value = '';
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (formData: FormData) => {
    if (files.length === 0) {
      alert('Por favor, selecione pelo menos um arquivo PDF.');
      return;
    }
    
    // Adiciona os arquivos do estado React ao formData para ser enviado
    files.forEach(file => {
      formData.append('documentos', file);
    });
    
    formAction(formData);
  };

  if (state?.success) {
    return (
      <div 
        className="flex flex-col items-center justify-center px-6 py-8 sm:p-8 backdrop-blur-md rounded-2xl text-center animate-in fade-in zoom-in duration-500 shadow-2xl"
        style={{
          background: 'var(--surface)',
          border: '1px solid rgba(200, 151, 58, 0.15)',
        }}
      >
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Upload Concluído!</h3>
        <p style={{ color: 'var(--text-muted)' }}>{state.message}</p>
        <button 
          onClick={() => {
            setFiles([]);
            window.location.reload();
          }}
          className="mt-6 px-6 py-2.5 text-white rounded-lg transition-colors cursor-pointer text-sm font-semibold hover:brightness-110"
          style={{ background: 'var(--primary)', border: '1px solid rgba(200,151,58,0.2)' }}
        >
          Enviar mais documentos
        </button>
      </div>
    );
  }

  return (
    <div 
      className="w-full max-w-xl mx-auto px-6 py-8 sm:p-8 backdrop-blur-md rounded-2xl shadow-2xl"
      style={{
        background: 'var(--surface)',
        border: '1px solid rgba(200, 151, 58, 0.15)',
      }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>Envio de Documentos</h2>
        <p className="mt-2" style={{ color: 'var(--text-muted)' }}>Faça o upload seguro de um ou múltiplos PDFs para nossa equipe.</p>
      </div>

      {state?.message && !state.success && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{state.message}</p>
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div 
            onClick={() => !isPending && fileInputRef.current?.click()}
            className={`w-full px-4 py-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 transition-all ${
              isPending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            } ${
              files.length > 0 
                ? 'border-[#C8973A] bg-[#C8973A]/5 shadow-[0_0_15px_rgba(200,151,58,0.15)]' 
                : 'border-[var(--text-muted)]/20 hover:border-[#C8973A] hover:bg-[#C8973A]/5 hover:shadow-[0_0_15px_rgba(200,151,58,0.1)]'
            }`}
            style={{
              background: 'rgba(200, 151, 58, 0.01)',
            }}
          >
            <UploadCloud className="w-10 h-10 transition-colors" style={{ color: files.length > 0 ? '#C8973A' : 'var(--text-muted)' }} />
            <div className="text-center">
              <span className="text-sm font-semibold block" style={{ color: 'var(--foreground)' }}>
                {files.length > 0 ? 'Adicionar mais PDFs' : 'Clique para selecionar os PDFs'}
              </span>
              <span className="text-xs mt-1 block" style={{ color: 'var(--text-muted)' }}>Tamanho máximo: 10MB por arquivo</span>
            </div>
            <input 
              type="file" 
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              disabled={isPending}
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Arquivos selecionados ({files.length}):</p>
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {files.map((file, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-center justify-between p-3 rounded-lg border transition-all hover:scale-[1.01]"
                    style={{
                      background: 'var(--background)',
                      borderColor: 'rgba(200, 151, 58, 0.1)',
                    }}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="w-5 h-5 shrink-0" style={{ color: '#C8973A' }} />
                      <span className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>{file.name}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeFile(idx)}
                      disabled={isPending}
                      className="p-1 hover:text-red-400 transition-colors shrink-0 cursor-pointer"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || files.length === 0}
          className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[var(--background)] transition-all disabled:opacity-50 disabled:hover:bg-emerald-600 flex items-center justify-center gap-2 mt-6 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Fazer Upload
              <Send className="w-5 h-5 ml-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
