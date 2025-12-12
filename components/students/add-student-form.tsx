"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { addStudent } from "@/app/(professor)/students/actions";
import { useRef, useTransition } from "react";

export function AddStudentForm() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  // const { toast } = useToast(); // Assuming toast is available, if not I'll skip for now or use alert

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await addStudent(formData);
        formRef.current?.reset();
      } catch (error) {
        console.error(error);
        // toast({ title: "Error", description: "Failed to add student", variant: "destructive" });
        alert("Failed to add student: " + (error as Error).message);
      }
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="e.g., John Doe" required disabled={isPending} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="studentId">Student ID</Label>
        <Input id="studentId" name="studentId" placeholder="e.g., 2023-0001" required disabled={isPending} />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </>
        )}
      </Button>
    </form>
  );
}
