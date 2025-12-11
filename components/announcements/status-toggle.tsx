"use client";

import { Badge } from "@/components/ui/badge";
import { toggleAnnouncementStatus } from "@/app/(professor)/announcements/actions";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface StatusToggleProps {
  id: string;
  isActive: boolean;
}

export function StatusToggle({ id, isActive }: StatusToggleProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleAnnouncementStatus(id, !isActive);
    });
  };

  return (
    <div
      onClick={!isPending ? handleToggle : undefined}
      className={cn(
        "inline-flex cursor-pointer select-none items-center",
        isPending && "opacity-70 cursor-not-allowed"
      )}
    >
      <Badge
        variant={isActive ? "default" : "secondary"}
        className={cn(
          "transition-colors",
          isActive ? "bg-green-600 hover:bg-green-700" : "hover:bg-secondary/80"
        )}
      >
        {isPending ? (
          <Loader2 className="h-3 w-3 animate-spin mr-1" />
        ) : null}
        {isActive ? "Active" : "Archived"}
      </Badge>
    </div>
  );
}
