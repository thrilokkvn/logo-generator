import { supabaseServer } from "@/config/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("sb-access-token")?.value;

    if(!token) {
        return NextResponse.redirect(new URL("/auth?message=login-required", req.url));
    }

    const { data: { user }, error } = await supabaseServer.auth.getUser(token);

    if (!user || error) {
        return NextResponse.redirect(new URL("/auth?message=login-required", req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/generate",
    "/generate/:path*",     
    "/logos",
    "/logos/:path",
    "/api/generate-logo/:path*",
    "/api/logout",
  ],
};