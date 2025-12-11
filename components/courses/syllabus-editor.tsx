"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateSyllabus } from "@/app/(professor)/courses/[id]/actions";
import { Loader2 } from "lucide-react";

interface SyllabusEditorProps {
  courseId: string;
  initialSyllabus: string;
}

export function SyllabusEditor({ courseId, initialSyllabus }: SyllabusEditorProps) {
  const [syllabus, setSyllabus] = useState(initialSyllabus || "");
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    startTransition(async () => {
      await updateSyllabus(courseId, syllabus);
      setIsEditing(false);
    });
  };

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="whitespace-pre-wrap rounded-md border p-4 bg-muted/50 min-h-[200px]">
          {syllabus || "No syllabus available."}
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Syllabus</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={syllabus}
        onChange={(e) => setSyllabus(e.target.value)}
        className="min-h-[300px] font-mono"
        placeholder="Enter course syllabus..."
      />
      <div className="flex space-x-2">
        <Button onClick={handleSave} disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
        <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isPending}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
