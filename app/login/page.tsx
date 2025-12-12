import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "./actions";
import { ProfessorLoginForm } from "@/components/auth/professor-login-form";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Professor Login</CardTitle>
          <CardDescription>
            Enter your Employee ID to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfessorLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
