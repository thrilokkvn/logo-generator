import { supabaseServer } from "@/config/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {email, password} = await req.json();

    if (!email || !password) {
        return NextResponse.json({error: "Email and password are required"}, {status: 400});
    }

    const {data, error} = await supabaseServer.auth.signInWithPassword({email, password});

    if (error || !data.session) {
        return NextResponse.json({error: error?.message}, {status: 401});
    }

    const res = NextResponse.json({user: data.user}, {status: 201});
    res.cookies.set('sb-access-token', data.session.access_token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    return res;
}