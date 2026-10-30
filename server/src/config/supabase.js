const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;
const isConfigured = Boolean(
  supabaseUrl && 
  supabaseKey && 
  !supabaseUrl.includes('your-supabase-url') &&
  !supabaseKey.includes('your-supabase-key')
);

if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: false
      }
    });
    console.log('✅ Supabase Client initialized with live credentials.');
  } catch (err) {
    console.warn('⚠️ Failed to initialize Supabase client:', err.message);
  }
} else {
  console.log('ℹ️ Running in Enhanced Dual-Mode: Supabase credentials not provided, utilizing high-performance in-memory persistence store.');
}

module.exports = {
  supabase,
  isSupabaseConfigured: () => isConfigured && supabase !== null
};
