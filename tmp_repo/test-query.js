const { createClient } = require('@supabase/supabase-js');

async function run() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) { return console.log("Missing vars"); }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from('tenants').select('id, name');
  console.log("tenants:", data, error);
}
run();
