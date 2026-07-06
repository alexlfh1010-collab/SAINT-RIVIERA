const getValidHttpOrigin = (value?: string) => {
  const candidate = value?.trim();
  if (!candidate || !/^https?:\/\//i.test(candidate)) return "";

  try {
    const url = new URL(candidate);
    return ["http:", "https:"].includes(url.protocol) ? url.origin : "";
  } catch {
    return "";
  }
};

export const getSupabaseConfig = () => {
  const url = getValidHttpOrigin(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const publicKey = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ""
  ).trim();

  return url && publicKey ? { url, publicKey } : null;
};

export const isSupabaseConfigured = () => Boolean(getSupabaseConfig());

export const getSiteUrl = () => getValidHttpOrigin(process.env.NEXT_PUBLIC_SITE_URL);

export const getBrowserSiteUrl = () => {
  const configuredUrl = getSiteUrl();
  if (configuredUrl) return configuredUrl;
  return typeof window !== "undefined" ? window.location.origin : "";
};

export const getMembershipLink = () => {
  const rawLink = process.env.NEXT_PUBLIC_INFINITEPAY_MEMBERSHIP_LINK?.trim();
  if (!rawLink) return null;

  let link = rawLink.replace(/,+\s*$/, "").trim();
  if (/^https%3A%2F%2F/i.test(link)) {
    try {
      link = decodeURIComponent(link).replace(/,+\s*$/, "").trim();
    } catch {
      return null;
    }
  }

  if (!link.startsWith("https://invoice.infinitepay.io/plans/")) return null;

  try {
    const checkoutUrl = new URL(link);
    const pathSegments = checkoutUrl.pathname.split("/").filter(Boolean);
    const isCompletePlanLink =
      checkoutUrl.hostname === "invoice.infinitepay.io" &&
      pathSegments.length === 3 &&
      pathSegments[0] === "plans" &&
      /^[A-Za-z0-9_-]+$/.test(pathSegments[1]) &&
      /^[A-Za-z0-9_-]+$/.test(pathSegments[2]) &&
      !checkoutUrl.search &&
      !checkoutUrl.hash;

    return isCompletePlanLink ? checkoutUrl.toString() : null;
  } catch {
    return null;
  }
};

export const getOptionalMembershipLink = getMembershipLink;

export const getWhatsAppLink = (message?: string) => {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  if (!phone) return null;
  const baseUrl = `https://wa.me/${phone}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
};
