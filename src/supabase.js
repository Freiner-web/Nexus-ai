import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vmmhoqpkkuemrcjmvovy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
