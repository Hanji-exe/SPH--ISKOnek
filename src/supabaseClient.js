// Import the Supabase library
import { createClient } from '@supabase/supabase-js'

// TODO: Replace these with your own Supabase project details
const supabaseUrl = 'https://elcvfwcyoisjutlvzxmj.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsY3Zmd2N5b2lzanV0bHZ6eG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNjkwNDMsImV4cCI6MjA2ODc0NTA0M30.oTm5OFLrvM_GMCwdM72bKRCLQEtMeAt4_-Lz6ZDbbUk'
// Create a single Supabase client for your app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
