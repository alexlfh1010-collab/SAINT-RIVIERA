import { requireAdmin } from "@/lib/profile";
import { createAdminClient } from "@/lib/supabase/admin";
import { activateMember, updateMember } from "./actions";
export const metadata = { title: "Administração" };
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  await requireAdmin();
  const admin = createAdminClient();
  const [{ data: profiles }, { data: orders }] = await Promise.all([
    admin.from("profiles").select("*").order("created_at", { ascending: false }).limit(50),
    admin.from("orders").select("*").order("created_at", { ascending: false }).limit(50),
  ]);
  return <main className="admin-page"><header><p className="eyebrow">SAINT RIVIERA · Operações</p><h1>Administração privada.</h1></header><section><h2>Solicitações e membros</h2><div className="admin-table">{profiles?.map((p) => <article key={p.id}><div><strong>{p.full_name || "Sem nome"}</strong><span>{p.email}</span></div><span className={`status status--${p.status}`}>{p.status}</span><form action={updateMember}><input type="hidden" name="userId" value={p.id}/><select name="status" defaultValue={p.status}><option value="pending">Pendente</option><option value="founder">Founder</option><option value="member">Membro</option></select><input name="credit" type="number" step="0.01" defaultValue={p.credit_balance}/><button type="submit">Salvar</button></form>{!p.membership_active&&<form action={activateMember}><input type="hidden" name="userId" value={p.id}/><input type="hidden" name="orderNsu" value={p.infinitepay_order_nsu||""}/><button type="submit">Ativar</button></form>}</article>)}</div></section><section><h2>Pedidos</h2><div className="admin-table orders">{orders?.map((o)=><article key={o.id}><div><strong>{o.type}</strong><span>{o.order_nsu}</span></div><span className={`status status--${o.status}`}>{o.status}</span><b>{new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(o.amount/100)}</b></article>)}</div></section></main>;
}
