import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SyllabusEditor } from "@/components/courses/syllabus-editor";
import { ActivityList } from "@/components/courses/activity-list";
import { BookOpen, User } from "lucide-react";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: PageProps) {
  const { id } = await params;

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (!course) {
    notFound();
  }

  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .eq("course_id", id)
    .order("due_date", { ascending: true });

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Badge variant="outline">{course.code}</Badge>
          <span>•</span>
          <span className="flex items-center">
            <User className="mr-1 h-3 w-3" />
            {course.professor}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Syllabus</h2>
            </div>
            <Separator />
            <SyllabusEditor courseId={course.id} initialSyllabus={course.syllabus} />
          </section>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <ActivityList courseId={course.id} activities={activities || []} />
          </section>
        </div>
      </div>
    </div>
  );
}
