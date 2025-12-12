"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addStudent(formData: FormData) {
    const name = formData.get("name") as string;
    const studentId = formData.get("studentId") as string;

    const { error } = await supabase.from("students").insert({
        name,
        student_id: studentId,
    });

    if (error) {
        if (error.code === "23505") { // Unique violation
            throw new Error("Student ID already exists.");
        }
        throw new Error(error.message);
    }
    revalidatePath("/students");
}

export async function deleteStudent(id: string) {
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/students");
}
