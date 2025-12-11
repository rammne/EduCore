"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createActivity, deleteActivity } from "@/app/(professor)/courses/[id]/actions";
import { Loader2, Plus, Trash2, Calendar } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
}

interface ActivityListProps {
  courseId: string;
  activities: Activity[];
}

export function ActivityList({ courseId, activities }: ActivityListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await createActivity(courseId, formData);
      setIsAdding(false);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Activities & Assignments</h3>
        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "secondary" : "default"}>
          {isAdding ? "Cancel" : <><Plus className="mr-2 h-4 w-4" /> Add Activity</>}
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>New Activity</CardTitle>
            <CardDescription>Create a new assignment or activity for this course.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required placeholder="e.g., Midterm Project" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Details about the activity..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="datetime-local" />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Activity
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border rounded-md border-dashed">
            No activities yet.
          </div>
        ) : (
          activities.map((activity) => (
            <Card key={activity.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-medium">{activity.title}</CardTitle>
                  {activity.due_date && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      Due: {new Date(activity.due_date).toLocaleString()}
                    </div>
                  )}
                </div>
                <DeleteActivityButton activityId={activity.id} courseId={courseId} />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function DeleteActivityButton({ activityId, courseId }: { activityId: string, courseId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-muted-foreground hover:text-destructive"
      disabled={isPending}
      onClick={() => {
        if (confirm("Delete this activity?")) {
          startTransition(async () => {
            await deleteActivity(activityId, courseId);
          });
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
