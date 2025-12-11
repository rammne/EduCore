import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    const { data: alerts, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(alerts);
}
