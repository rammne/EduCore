import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { Bell, BookOpen, Calendar, User } from "lucide-react";

export const revalidate = 0;

export default async function StudentHomePage() {
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
      {/* Announcements Section (Left) */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Announcements</h2>
        </div>
        <div className="space-y-4">
          {announcements?.length === 0 ? (
            <p className="text-muted-foreground">No active announcements.</p>
          ) : (
            announcements?.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{alert.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {new Date(alert.created_at).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {alert.content}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Courses Section (Right) */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Courses</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {courses?.length === 0 ? (
            <p className="text-muted-foreground col-span-2">No courses available.</p>
          ) : (
            courses?.map((course) => (
              <Link key={course.id} href={`/student/courses/${course.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{course.code}</Badge>
                    </div>
                    <CardTitle className="mt-2">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="mr-1 h-3 w-3" />
                      {course.professor}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
