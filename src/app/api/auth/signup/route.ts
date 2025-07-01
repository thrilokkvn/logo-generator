import { supabaseServer } from "@/config/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {email, password, firstName, lastName} = await req.json();

    if (!email || !password || !firstName || !lastName) {
        return NextResponse.json({error: "Email, password and name are required"}, {status: 400})
    }

    const {data: existingUser, error: userCheckingError} = await supabaseServer.from("users").select("id").eq("email", email).limit(1);

    if (userCheckingError) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }

    if (existingUser && existingUser.length > 0) {
        return NextResponse.json({error: "User already exists, try signing in..."}, {status: 400})
    }

    const {data, error} = await supabaseServer.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName
            }
        }
    });

    console.log(data);
    console.log(error)

    if (error || !data.user) {
        return NextResponse.json({ error: error?.message || "Signup failed" }, { status: 400 });
    }

    const insertUser = await supabaseServer.from("users").insert({
        id: data.user?.id,
        email,
        first_name: firstName,
        last_name: lastName,
        points: 5,
        registered_at: new Date().toISOString()
    })

    if (insertUser.error) {
        return NextResponse.json({error: "Error creating user"}, {status: 500});
    }

    const token = data.session?.access_token;

    const res = NextResponse.json({user: data.user}, {status: 201});;

    if(token) {
        res.cookies.set("sb-access-token", token, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60*60*24*7
        })
    }

    return res;
}