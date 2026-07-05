export const isSupabaseConfigured = () => Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
);

export const getSiteUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const resolvedUrl = configuredUrl || (vercelUrl ? `https://${vercelUrl}` : undefined);

  if (!resolvedUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL precisa estar configurada.");
  }

  const siteUrl = new URL(resolvedUrl);
  if (!["http:", "https:"].includes(siteUrl.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL precisa usar http:// ou https://.");
  }

  return siteUrl.origin;
};

export const getMembershipLink = () => {
  const link = process.env.NEXT_PUBLIC_INFINITEPAY_MEMBERSHIP_LINK?.trim();
  if (!link) throw new Error("NEXT_PUBLIC_INFINITEPAY_MEMBERSHIP_LINK nao configurada.");

  if (!link.startsWith("https://")) {
    throw new Error("Use um link HTTPS direto da InfinitePay.");
  }

  const checkoutUrl = new URL(link);
  const isInfinitePay = checkoutUrl.hostname === "infinitepay.io" || checkoutUrl.hostname.endsWith(".infinitepay.io");
  if (!isInfinitePay) {
    throw new Error("Use um link direto do dominio infinitepay.io.");
  }

  return checkoutUrl.toString();
};
export const getOptionalMembershipLink = () => {
  try {
    return getMembershipLink();
  } catch {
    return null;
  }
};
