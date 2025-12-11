import { AnnouncementForm } from "@/components/announcements/announcement-form";

export default function NewAnnouncementPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Post New Announcement</h2>
      <AnnouncementForm />
    </div>
  );
}
