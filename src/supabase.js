// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vmmhoqpkkuemrcjmvovy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbWhvcXBra3VlbXJjam12b3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDYxNTMsImV4cCI6MjA2ODIyMjE1M30.raHa71EIl6hxse-ffB-B_ZI1rt9Xq4p6Z2gaLLXidRI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
