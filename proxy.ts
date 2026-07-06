import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/env";

const loginRedirect = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
};

export async function proxy(request: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) return loginRedirect(request);

  try {
    let response = NextResponse.next({ request });
    const supabase = createServerClient(
      config.url,
      config.publicKey,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      },
    );
    const { data: { user } } = await supabase.auth.getUser();
    const path = request.nextUrl.pathname;
    if (!user) return loginRedirect(request);

    const { data: profile } = await supabase.from("profiles").select("status,membership_active").eq("id", user.id).single();
    if (path.startsWith("/admin") && profile?.status !== "admin") return NextResponse.redirect(new URL("/membro/dashboard", request.url));
    if (path.startsWith("/membro") && !profile?.membership_active) return NextResponse.redirect(new URL("/pagamento-pendente", request.url));
    return response;
  } catch {
    return loginRedirect(request);
  }
}

export const config = { matcher: ["/membro/:path*", "/admin/:path*"] };
