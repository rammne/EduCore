"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Loader2 } from "lucide-react";
import { studentLogin } from "@/app/(student)/actions";
import { useTransition } from "react";

export function StudentLoginForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await studentLogin(formData);
    });
  };

  return (
    <form action={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="studentId">Student ID</Label>
        <Input
          id="studentId"
          name="studentId"
          type="text"
          placeholder="e.g., 2023-0001"
          required
          disabled={isPending}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" /> Enter Portal
          </>
        )}
      </Button>
    </form>
  );
}
