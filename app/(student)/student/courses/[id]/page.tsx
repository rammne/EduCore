import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentCoursePage({ params }: PageProps) {
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
    <div className="space-y-8 max-w-4xl mx-auto">
      <Link href="/">
        <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>
      </Link>

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

      <div className="grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Syllabus</h2>
            </div>
            <Separator />
            <div className="whitespace-pre-wrap rounded-md border p-6 bg-white">
              {course.syllabus || "No syllabus available."}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Activities</h2>
            <div className="space-y-4">
              {activities?.length === 0 ? (
                <p className="text-muted-foreground">No activities yet.</p>
              ) : (
                activities?.map((activity) => (
                  <Card key={activity.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">{activity.title}</CardTitle>
                      {activity.due_date && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          Due: {new Date(activity.due_date).toLocaleString()}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {activity.description}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
