import { supabaseServer } from "@/config/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" },{ status: 401 });
    }

    const now = new Date();
    const oneMonthAgo = new Date();

    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const {data: usersToReset, error} = await supabaseServer.from("users").select("id, points, last_points_reset").lt("points", 5).lt("last_points_reset", oneMonthAgo.toISOString());

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