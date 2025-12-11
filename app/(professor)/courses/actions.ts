"use server";

import { model } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function deleteCourse(id: string) {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/courses");
}

export async function generateSyllabus(topic: string, duration: string) {
    const prompt = `Generate a ${duration} syllabus for a course on ${topic}.
  Format it as a weekly breakdown (Week 1: Topic... Week 2: Topic...).
  Keep it concise and professional.`;

    const maxRetries = 3;
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            lastError = error;
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff-ish
            }
        }
    }

    const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
    throw new Error(`Failed to generate syllabus after ${maxRetries} attempts: ${errorMessage}`);
}
