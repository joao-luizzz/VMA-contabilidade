const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jkozpvnhsmryppjohayi.supabase.co';
const supabaseKey = 'sb_publishable_-jjJ3HJE_bmuSci9er8PEA_3Zawc_sZ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'vma.contabil@gmail.com',
    password: 'admin123',
  });

  if (error) {
    console.error('Login error:', error.message);
  } else {
    console.log('Login successful:', data.user?.email);
  }
}

testLogin();
