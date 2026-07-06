"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOptionalMembershipLink, isSupabaseConfigured } from "@/lib/env";

export type AuthState = { error?: string };

const unavailableMessage = "Cadastro temporariamente indisponível. Fale com o Concierge para liberar seu acesso.";

const getSignupErrorMessage = (message: string) => {
  const normalized = message.toLowerCase();
  if (normalized.includes("already") || normalized.includes("registered")) return "Este e-mail já possui um acesso. Entre com sua senha para continuar.";
  if (normalized.includes("password")) return "Escolha uma senha mais segura, com pelo menos 8 caracteres.";
  if (normalized.includes("rate") || normalized.includes("limit")) return "Não foi possível concluir agora. Aguarde um instante e tente novamente.";
  return "Não foi possível criar seu acesso. Revise os dados e tente novamente.";
};

export async function login(_: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) return { error: unavailableMessage };
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/membro/dashboard");
  if (!email || password.length < 6) return { error: "Informe e-mail e senha válidos." };

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: "Não foi possível entrar. Verifique seus dados." };
  } catch {
    return { error: unavailableMessage };
  }

  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/membro/dashboard";
  redirect(safeNext);
}

export async function signup(_: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) return { error: unavailableMessage };
  const fullName = String(formData.get("fullName") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!fullName || !email || password.length < 8) return { error: "Preencha os dados e use uma senha com pelo menos 8 caracteres." };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, whatsapp } },
    });
    if (error) return { error: getSignupErrorMessage(error.message) };
    if (!data.user || data.user.identities?.length === 0) return { error: "Este e-mail já possui um acesso. Entre com sua senha para continuar." };
  } catch {
    return { error: unavailableMessage };
  }

  redirect(getOptionalMembershipLink() ? "/pagamento-redirecionando" : "/pagamento-pendente");
}

export async function logout() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // The local session can still be abandoned through the redirect.
    }
  }
  redirect("/");
}
