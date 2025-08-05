import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { getDomainConfig } from '@/utils/domainConfig';

// Get the domain-specific configuration
const config = getDomainConfig();

export const supabase = createClient<Database>(config.supabaseUrl, config.supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Export domain config for use in components
export const domainConfig = config;