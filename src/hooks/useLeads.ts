import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useLeads = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitLead = async (leadData: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    subject?: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!supabase) {
        throw new Error('Supabase não configurado. Verifique as variáveis de ambiente.');
      }
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([leadData]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao enviar sua mensagem.');
    } finally {
      setLoading(false);
    }
  };

  return { submitLead, loading, error, success };
};
