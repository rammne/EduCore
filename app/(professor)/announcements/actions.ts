"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function deleteAnnouncement(id: string) {
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/announcements");
}

export async function toggleAnnouncementStatus(id: string, isActive: boolean) {
    const { error } = await supabase
        .from("announcements")
        .update({ is_active: isActive })
        .eq("id", id);

    if (error) throw new Error(error.message);
    revalidatePath("/announcements");
}
