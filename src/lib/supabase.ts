import { createClient } from '@supabase/supabase-js'

// Define hardcoded fallback values from the .env file
const FALLBACK_URL = 'https://zirkbuzgqxdmvmhtlaul.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppcmtidXpncXhkbXZtaHRsYXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzk4ODAsImV4cCI6MjA2MTYxNTg4MH0.hgBr7hCBOsqEtvb-PhuZjRYC8clevfYa-DI0heIdvCo';

// Use the fallback values for development
const supabaseUrl = FALLBACK_URL;
const supabaseAnonKey = FALLBACK_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
