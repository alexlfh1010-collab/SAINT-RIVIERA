"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthState } from "@/app/(auth)/actions";

export function AuthForm({ mode, action, next = "" }: { mode: "login" | "signup"; action: (state: AuthState, data: FormData) => Promise<AuthState>; next?: string }) {
  const [state, formAction, pending] = useActionState(action, {});
  const signup = mode === "signup";
  return (
    <form className="auth-form" action={formAction}>
      {signup && <><label htmlFor="fullName">Nome completo</label><input id="fullName" name="fullName" required autoComplete="name" /><label htmlFor="whatsapp">WhatsApp</label><input id="whatsapp" name="whatsapp" placeholder="(11) 99999-9999" autoComplete="tel" /></>}
      <label htmlFor="email">E-mail</label><input id="email" name="email" type="email" required autoComplete="email" />
      <label htmlFor="password">Senha</label><input id="password" name="password" type="password" required minLength={signup ? 8 : 6} autoComplete={signup ? "new-password" : "current-password"} />
      {next && <input type="hidden" name="next" value={next} />}
      {state.error && <p className="form-error" role="alert">{state.error}</p>}
      <button className="button button--dark" type="submit" disabled={pending}>{pending ? signup ? "Criando seu acesso..." : "Entrando..." : signup ? "Criar acesso" : "Entrar"}<span>↗</span></button>
      <p>{signup ? "Já possui acesso?" : "Ainda não faz parte?"} <Link href={signup ? "/login" : "/pagamento-redirecionando"}>{signup ? "Entrar" : "Entrar para The Private Society"}</Link></p>
    </form>
  );
}
