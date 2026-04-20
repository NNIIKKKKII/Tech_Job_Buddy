import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    throw new Error("Missing Supabase environment variables. Please check your .env file.");
}

// Create and export the anonymous client
export const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

// Create and export the admin client
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey);