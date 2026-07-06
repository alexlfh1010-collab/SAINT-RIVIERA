import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/env";

export function createClient() {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Cadastro temporariamente indisponível. Fale com o Concierge para liberar seu acesso.");
  return createBrowserClient(config.url, config.publicKey);
}
