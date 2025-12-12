"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { login } from "@/app/login/actions";
import { useTransition } from "react";

export function ProfessorLoginForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await login(formData);
    });
  };

  return (
    <form action={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="employeeId">Employee ID</Label>
        <Input
          id="employeeId"
          name="employeeId"
          type="text"
          placeholder="e.g., PROF123"
          required
          disabled={isPending}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
