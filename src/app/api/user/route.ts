import { supabaseServer } from "@/config/supabaseServer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const token = (await cookies()).get("sb-access-token")?.value;
    const {data: user, error: userError} = await supabaseServer.auth.getUser(token);

    if (!user || userError) {
        return NextResponse.json({error: "Invalid User"}, {status: 401});
    }

    return NextResponse.json({user});
}