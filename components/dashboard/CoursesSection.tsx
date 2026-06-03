import { createServerSupabaseClient } from "@/lib/supabase/server";
import CourseTile from "./CourseTile";
import type { Course } from "@/types";

async function getCourses(): Promise<Course[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export default async function CoursesSection() {
  const courses = await getCourses();

  if (courses.length === 0) {
    return (
      <article className="col-span-full rounded-2xl border border-white/6 bg-[#111122] p-8 text-center">
        <p className="text-sm text-slate-500">No courses found.</p>
      </article>
    );
  }

  return (
    <>
      {courses.map((course, index) => (
        <CourseTile key={course.id} course={course} index={index} />
      ))}
    </>
  );
}
