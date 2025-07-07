import { supabaseServer } from "@/config/supabaseServer";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const {id} = await params;
    const token = (await cookies()).get("sb-access-token")?.value;
    const {data: user, error: userError} = await supabaseServer.auth.getUser(token);

    if (!user || userError) {
        return NextResponse.json({error: "Invalid User"}, {status: 401});
    }

    const {data, error} = await supabaseServer.from("logos").select().eq("id", id).eq("user_id",user.user.id);

    if (error) {
        return NextResponse.json({error: "Error fetching logo"}, {status: 500});
    }

    if (data.length === 0) {
        return NextResponse.json({error: "Invalid User"}, {status: 401});
    }

    return NextResponse.json(data);
}