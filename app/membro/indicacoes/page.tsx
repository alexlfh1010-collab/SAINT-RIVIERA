import { requireMember } from "@/lib/profile";
import { MemberHeading } from "@/components/member-heading";
import { getSiteUrl } from "@/lib/env";

export default async function ReferralsPage() {
  const profile = await requireMember();
  const url = `${getSiteUrl()}/pagamento-redirecionando?ref=${profile.referralCode}`;
  return <><MemberHeading eyebrow="Círculo privado" title="Indique com intenção."/><section className="referral-panel"><p>Seu link é reservado para pessoas que reconhecem os mesmos códigos.</p><code>{url}</code><p>Código: <b>{profile.referralCode}</b></p></section></>;
}
