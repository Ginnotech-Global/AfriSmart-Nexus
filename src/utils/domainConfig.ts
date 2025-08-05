export interface DomainConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  domain: string;
  serviceType: 'wellness' | 'agro';
}

export const getDomainConfig = (): DomainConfig => {
  const hostname = window.location.hostname;
  
  if (hostname.includes('agro.gitech.africa') || hostname.includes('localhost') && window.location.search.includes('agro')) {
    return {
      supabaseUrl: "https://ifrbhsakulbpggxeiznn.supabase.co",
      supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcmJoc2FrdWxicGdneGVpem5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjAzMzMsImV4cCI6MjA2OTkzNjMzM30.L-eYnhoRCPCg76yvZ8hYrS62S858awDNtio4cJKvX7A",
      domain: 'agro',
      serviceType: 'agro'
    };
  }
  
  // Default to wellness (gitech.africa)
  return {
    supabaseUrl: "https://cpfvcfnmvoovkqrjipbm.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwZnZjZm5tdm9vdmtxcmppcGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDQwNDUsImV4cCI6MjA2ODY4MDA0NX0.TZqW0UuY92CVogsz628QJrdvPn8SWDskbzs4BAXyhR8",
    domain: 'wellness',
    serviceType: 'wellness'
  };
};