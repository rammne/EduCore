"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateSyllabus(courseId: string, newSyllabus: string) {
    const { error } = await supabase
        .from("courses")
        .update({ syllabus: newSyllabus })
        .eq("id", courseId);

    if (error) throw new Error(error.message);
    revalidatePath(`/courses/${courseId}`);
}

export async function createActivity(courseId: string, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;

    const { error } = await supabase.from("activities").insert({
        course_id: courseId,
        title,
        description,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
    });

    if (error) throw new Error(error.message);
    revalidatePath(`/courses/${courseId}`);
}

export async function deleteActivity(activityId: string, courseId: string) {
    const { error } = await supabase.from("activities").delete().eq("id", activityId);
    if (error) throw new Error(error.message);
    revalidatePath(`/courses/${courseId}`);
}
