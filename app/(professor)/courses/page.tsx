import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { deleteCourse } from "./actions";
import { DeleteButton } from "@/components/ui/delete-button";

export const revalidate = 0;

export default async function CoursesPage() {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
        <Link href="/courses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Course
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Professor</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              courses?.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <Link href={`/courses/${course.id}`} className="hover:underline">
                      {course.code}
                    </Link>
                  </TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.professor}</TableCell>
                  <TableCell className="text-right">
                    {new Date(course.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DeleteButton id={course.id} deleteAction={deleteCourse} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
