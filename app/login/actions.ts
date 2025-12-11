"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const employeeId = formData.get("employeeId") as string;

    // Simple hardcoded check as requested
    if (employeeId === "ADMIN" || employeeId.startsWith("PROF")) {
        const cookieStore = await cookies();
        cookieStore.set("professor_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        redirect("/dashboard");
    } else {
        redirect("/login?error=Invalid Employee ID");
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("professor_session");
    redirect("/");
}
