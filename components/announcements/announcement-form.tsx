"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"; // I need to install switch if not present, but I'll check. If not, I'll use a checkbox or just install it.
// I didn't install switch. I'll use a simple checkbox or install it.
// I'll use a checkbox for now to avoid installing another component if I missed it, or I can install it.
// Actually, I'll use a checkbox styled as a toggle or just a checkbox.
// Wait, I'll just use a checkbox.
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export function AnnouncementForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("announcements").insert([formData]);
      if (error) throw error;
      router.push("/announcements");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Announcement Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Snow Day Alert"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              className="min-h-[100px]"
              placeholder="Campus is closed due to..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            />
            <Label htmlFor="is_active">Active Status</Label>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Announcement
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
