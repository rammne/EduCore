"use server";

import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function studentLogin(formData: FormData) {
    const studentId = formData.get("studentId") as string;

    const { data: student } = await supabase
        .from("students")
        .select("id")
        .eq("student_id", studentId)
        .single();

    if (student) {
        const cookieStore = await cookies();
        cookieStore.set("student_session", studentId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });
        redirect("/");
    } else {
        redirect("/?error=Not enrolled");
    }
}

export async function studentLogout() {
    const cookieStore = await cookies();
    cookieStore.delete("student_session");
    redirect("/");
}
