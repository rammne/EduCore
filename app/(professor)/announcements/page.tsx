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
import { deleteAnnouncement } from "./actions";
import { DeleteButton } from "@/components/ui/delete-button";
import { StatusToggle } from "@/components/announcements/status-toggle";

export const revalidate = 0;

export default async function AnnouncementsPage() {
  const { data: announcements, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching announcements:", error);
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
        <Link href="/announcements/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Post Alert
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No announcements found.
                </TableCell>
              </TableRow>
            ) : (
              announcements?.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.title}</TableCell>
                  <TableCell className="max-w-md truncate">{alert.content}</TableCell>
                  <TableCell>
                    <StatusToggle id={alert.id} isActive={alert.is_active} />
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(alert.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DeleteButton id={alert.id} deleteAction={deleteAnnouncement} />
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
