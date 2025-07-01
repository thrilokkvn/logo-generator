import { supabaseServer } from "@/config/supabaseServer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const token = (await cookies()).get("sb-access-token")?.value;

    if (!token) {
        return NextResponse.json({ user: null }, { status: 200 });
    }

    const { data: { user }, error } = await supabaseServer.auth.getUser(token);

    if (error || !user) {
        return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user });
}