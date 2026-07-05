import { AuthForm } from "@/components/auth-form";
import { login } from "../actions";
export const metadata = { title: "Acesso privado" };
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = "" } = await searchParams;
  return <main className="auth-page"><section><p className="eyebrow">The Private Society</p><h1>Seu lugar<br /><em>por dentro.</em></h1><p>Entre para acessar créditos, drops privados e reservas.</p></section><AuthForm mode="login" action={login} next={next} /></main>;
}
