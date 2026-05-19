'use server';

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export async function submitLeadForm(prevState: any, formData: FormData) {
  try {
    const nome = formData.get('nome') as string;
    const email = formData.get('email') as string;
    const telefone = formData.get('telefone') as string;
    const empresa = formData.get('empresa') as string;
    const mensagem = formData.get('mensagem') as string;
    const pdfFile = formData.get('documento') as File | null;

    if (!nome || !email) {
      return { success: false, message: 'Nome e E-mail são obrigatórios.' };
    }

    const supabase = await createClient();
    let pdfUrl = null;

    if (pdfFile && pdfFile.size > 0) {
      if (pdfFile.type !== 'application/pdf') {
        return { success: false, message: 'Apenas arquivos PDF são permitidos.' };
      }

      // Limite de 10MB
      if (pdfFile.size > 10 * 1024 * 1024) {
        return { success: false, message: 'O arquivo deve ter no máximo 10MB.' };
      }

      const fileExt = 'pdf';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload do arquivo para o bucket (ex: "documents")
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, pdfFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Erro no upload do PDF:', uploadError);
        return { success: false, message: 'Falha ao fazer upload do documento.' };
      }

      // Obtém a URL pública do arquivo
      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);
        
      pdfUrl = publicUrlData.publicUrl;
    }

    // Inserir os dados na tabela leads
    const { error: insertError } = await supabase
      .from('leads')
      .insert([
        {
          nome,
          email,
          telefone,
          empresa,
          mensagem,
          documento_url: pdfUrl, // Supondo que a coluna exista
          status: 'NOVO', // Regra inegociável do AGENTS.md
        },
      ]);

    if (insertError) {
      console.error('Erro ao inserir lead no banco:', insertError);
      return { success: false, message: 'Falha ao salvar as informações.' };
    }

    return { success: true, message: 'Informações enviadas com sucesso! Entraremos em contato.' };

  } catch (error) {
    console.error('Erro na action submitLeadForm:', error);
    return { success: false, message: 'Ocorreu um erro inesperado.' };
  }
}

export async function uploadMultiplePdfs(prevState: any, formData: FormData) {
  try {
    const files = formData.getAll('documentos') as File[];
    
    if (!files || files.length === 0) {
      return { success: false, message: 'Nenhum arquivo foi selecionado.' };
    }

    const supabase = await createClient();
    const uploadedUrls = [];

    for (const file of files) {
      if (file.size === 0) continue;

      if (file.type !== 'application/pdf') {
        return { success: false, message: 'Apenas arquivos PDF são permitidos.' };
      }

      if (file.size > 10 * 1024 * 1024) {
        return { success: false, message: `O arquivo ${file.name} excede o limite de 10MB.` };
      }

      const fileExt = 'pdf';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        return { success: false, message: `Falha ao fazer upload de ${file.name}.` };
      }

      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);
        
      uploadedUrls.push(publicUrlData.publicUrl);
    }
    
    if (uploadedUrls.length === 0) {
      return { success: false, message: 'Nenhum arquivo válido foi enviado.' };
    }

    // Retorna as URLs caso queira exibir para o usuário, mas vamos manter o padrão UI
    return { success: true, message: `${uploadedUrls.length} documento(s) enviado(s) com sucesso!` };

  } catch (error) {
    console.error('Erro na action uploadMultiplePdfs:', error);
    return { success: false, message: 'Ocorreu um erro inesperado.' };
  }
}

export async function signInWithEmail(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { success: false, message: 'E-mail e senha são obrigatórios.' };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erro no login:', error.message);
      return { success: false, message: 'Credenciais inválidas. Verifique seus dados.' };
    }

    return { success: true, message: 'Login realizado com sucesso!' };
  } catch (error) {
    console.error('Erro na action signInWithEmail:', error);
    return { success: false, message: 'Ocorreu um erro inesperado.' };
  }
}

export async function signOutUser() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Erro na action signOutUser:', error);
  }
  redirect('/');
}

