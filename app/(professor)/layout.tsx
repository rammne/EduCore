import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";

export default async function ProfessorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("professor_session");

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
