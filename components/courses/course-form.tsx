"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSyllabus } from "@/app/(professor)/courses/actions";
import { supabase } from "@/lib/supabase";
import { Loader2, Sparkles } from "lucide-react";

export function CourseForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [duration, setDuration] = useState("12 weeks");
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    professor: "",
    syllabus: "",
  });

  const handleGenerate = async () => {
    if (!formData.title) return;
    setGenerating(true);
    try {
      const syllabus = await generateSyllabus(formData.title, duration);
      setFormData((prev) => ({ ...prev, syllabus }));
    } catch (error) {
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("courses").insert([formData]);
      if (error) throw error;
      router.push("/courses");
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
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                placeholder="BIO-101"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="professor">Professor Name</Label>
              <Input
                id="professor"
                placeholder="Dr. Smith"
                value={formData.professor}
                onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Course Title (Topic)</Label>
            <Input
              id="title"
              placeholder="Introduction to Biology"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-end gap-4">
               <div className="flex-1 space-y-2">
                 <Label htmlFor="duration">Duration (for AI)</Label>
                 <Input
                   id="duration"
                   value={duration}
                   onChange={(e) => setDuration(e.target.value)}
                   placeholder="12 weeks"
                 />
               </div>
               <Button
                type="button"
                variant="outline"
                onClick={handleGenerate}
                disabled={generating || !formData.title}
                className="mb-0.5"
              >
                {generating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                )}
                Generate Syllabus
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="syllabus">Syllabus</Label>
            <Textarea
              id="syllabus"
              className="min-h-[200px]"
              placeholder="Week 1: ..."
              value={formData.syllabus}
              onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Course
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
