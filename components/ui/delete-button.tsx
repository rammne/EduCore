"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

interface DeleteButtonProps {
  id: string;
  deleteAction: (id: string) => Promise<void>;
}

export function DeleteButton({ id, deleteAction }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this?")) {
          startTransition(async () => {
            await deleteAction(id);
          });
        }
      }}
    >
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  );
}
