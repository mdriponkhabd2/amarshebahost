
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

/**
 * AdminLogin Page
 * Provides a simple password-based entry point for the administration panel.
 */
export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Verify the requested password
    if (password === "Repon@1997@") {
      sessionStorage.setItem("admin_auth", "true");
      router.push("/admin");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md rounded-[2.5rem] shadow-2xl border-none bg-white overflow-hidden">
        <div className="h-2 gradient-blue w-full" />
        <CardHeader className="text-center pt-8 pb-2">
          <div className="w-20 h-20 gradient-blue rounded-[1.5rem] flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-primary/20 animate-fade-in-up">
            <Lock className="w-10 h-10" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Admin Portal</CardTitle>
          <p className="text-muted-foreground mt-2">Enter your secure credentials</p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                className="h-14 rounded-2xl text-center text-xl tracking-widest border-border/50 focus:ring-primary/20"
              />
              {error && (
                <p className="text-destructive text-sm text-center font-medium animate-in fade-in slide-in-from-top-1">
                  {error}
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl gradient-blue text-lg font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Access Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
