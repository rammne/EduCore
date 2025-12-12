import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { Bell, BookOpen, User, LogIn } from "lucide-react";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studentLogin, studentLogout } from "./actions";

export const revalidate = 0;

export default async function StudentHomePage() {
  const cookieStore = await cookies();
  const studentSession = cookieStore.get("student_session");

  if (!studentSession) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Student Portal</CardTitle>
            <CardDescription>
              Enter your Student ID to access your courses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={studentLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  type="text"
                  placeholder="e.g., 2023-0001"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" /> Enter Portal
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

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
    <div className="space-y-8">
      <div className="flex justify-end">
        <form action={studentLogout}>
          <Button variant="outline" size="sm">
            Sign Out ({studentSession.value})
          </Button>
        </form>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-[1fr_2fr]">
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
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
    </div>
  );
}
