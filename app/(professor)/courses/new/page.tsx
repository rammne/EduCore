import { CourseForm } from "@/components/courses/course-form";

export default function NewCoursePage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Create New Course</h2>
      <CourseForm />
    </div>
  );
}
