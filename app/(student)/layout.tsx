import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            EduCore Student Portal
          </Link>
          <Link href="/login">
            <Button variant="outline">Professor Login</Button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">{children}</main>
    </div>
  );
}
