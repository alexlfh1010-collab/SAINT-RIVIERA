import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/types";

const mapProfile = (row: Record<string, unknown>): UserProfile => ({
  id: String(row.id),
  email: String(row.email || ""),
  fullName: String(row.full_name || "Membro Saint Riviera"),
  whatsapp: row.whatsapp ? String(row.whatsapp) : null,
  status: row.status as UserProfile["status"],
  membershipActive: Boolean(row.membership_active),
  creditBalance: Number(row.credit_balance || 0),
  referralCode: String(row.referral_code || ""),
  infinitepayCustomerId: row.infinitepay_customer_id ? String(row.infinitepay_customer_id) : null,
  infinitepayOrderNsu: row.infinitepay_order_nsu ? String(row.infinitepay_order_nsu) : null,
  createdAt: String(row.created_at),
  updatedAt: String(row.updated_at),
});

export async function getCurrentProfile(): Promise<UserProfile | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data ? mapProfile(data) : null;
}

export async function requireMember(): Promise<UserProfile> {
  if (!isSupabaseConfigured() && process.env.DEMO_MEMBER_MODE === "true") {
    return {
      id: "demo", email: "membro@saintriviera.com", fullName: "Alex Riviera", whatsapp: null,
      status: "founder", membershipActive: true, creditBalance: 30, referralCode: "RIVIERA30",
      infinitepayCustomerId: null, infinitepayOrderNsu: null,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
  }
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?next=/membro/dashboard");
  if (!profile.membershipActive) redirect("/pagamento-pendente");
  return profile;
}

export async function requireAdmin(): Promise<UserProfile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?next=/admin");
  if (profile.status !== "admin") redirect("/membro/dashboard");
  return profile;
}
