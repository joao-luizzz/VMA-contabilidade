const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jkozpvnhsmryppjohayi.supabase.co';
const supabaseKey = 'sb_publishable_-jjJ3HJE_bmuSci9er8PEA_3Zawc_sZ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'vma.admin@gmail.com',
    password: 'admin123',
    options: {
      data: {
        role: 'ADMIN'
      }
    }
  });

  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('User created successfully:', data.user?.email);
  }
}

createAdmin();
