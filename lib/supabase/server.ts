import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/lib/env";

export async function createClient() {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Cadastro temporariamente indisponível. Fale com o Concierge para liberar seu acesso.");
  const cookieStore = await cookies();

  return createServerClient(
    config.url,
    config.publicKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Components cannot set cookies. proxy.ts handles refreshes.
          }
        },
      },
    },
  );
}
