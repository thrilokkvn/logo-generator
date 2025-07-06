import { supabaseServer } from "@/config/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
    const now = new Date();
    const oneMonthAgo = new Date();

    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const {data: usersToReset, error} = await supabaseServer.from("users").select("id, points, last_reset_date").lt("points", 5).lt("last_reset_date", oneMonthAgo.toISOString());

    if (error) {
        return NextResponse.json({message: "Error fetching users"}, {status: 500});
    }

    const updates = usersToReset.map(each => {
        supabaseServer.from("users").update({
            points: 5,
            last_points_reset: now.toISOString()
        }).eq("id", each.id);
    })

    await Promise.all(updates);

    return NextResponse.json({ message: `Reset ${usersToReset.length} user(s)` });
}