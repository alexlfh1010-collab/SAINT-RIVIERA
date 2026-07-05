import { AuthForm } from "@/components/auth-form";
import { signup } from "../actions";
export const metadata = { title: "Criar acesso" };
export default function SignupPage() {
  return <main className="auth-page"><section><p className="eyebrow">Solicitação de entrada</p><h1>Entre<br /><em>antes.</em></h1><p>Crie seu perfil para iniciar a entrada na The Private Society.</p></section><AuthForm mode="signup" action={signup} /></main>;
}
