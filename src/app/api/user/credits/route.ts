import { supabaseServer } from "@/config/supabaseServer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const token = (await cookies()).get("sb-access-token")?.value;

    if (!token) {
        return NextResponse.json({message: "No User"}, {status: 200});
    }

    const {data, error} = await supabaseServer.auth.getUser(token);

    if (!data || error) {
        return NextResponse.json({message: "Invalid User"}, {status: 401});
    }

    const {data: credits, error: creditsError} = await supabaseServer.from("users").select("points").eq("id", data.user.id);
    
    if (creditsError) {
        return NextResponse.json({message: "Error fetching the credits"}, {status: 500});
    }

    return NextResponse.json({credits});
}