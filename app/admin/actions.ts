"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/profile";
import { createAdminClient } from "@/lib/supabase/admin";

export async function activateMember(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") || "");
  const orderNsu = String(formData.get("orderNsu") || `manual-${Date.now()}`);
  if (!userId) return;
  const admin = createAdminClient();
  await admin.rpc("activate_membership", { p_user_id: userId, p_order_nsu: orderNsu });
  revalidatePath("/admin");
}

export async function updateMember(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") || "");
  const status = String(formData.get("status") || "member");
  const credit = Number(formData.get("credit") || 0);
  if (!userId || !["founder", "member", "pending"].includes(status) || !Number.isFinite(credit)) return;
  const admin = createAdminClient();
  await admin.from("profiles").update({ status, credit_balance: credit, membership_active: status !== "pending", updated_at: new Date().toISOString() }).eq("id", userId);
  revalidatePath("/admin");
}
