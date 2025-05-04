import { createClient } from '@supabase/supabase-js'

// Replace these with your Supabase project URL and anon key
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY ;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and anon key must be set')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
