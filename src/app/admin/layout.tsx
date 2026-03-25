
"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Link2, LogOut, Settings, Globe } from "lucide-react";

/**
 * AdminLayout Component
 * Wraps all admin pages. Handles authentication redirection and sidebar navigation.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for authorization flag in session storage
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      // Redirect to login if not authorized and not already on the login page
      if (pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    }
  }, [pathname, router]);

  // If we are on the login page, render children without the layout sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Prevent UI flashing while checking authentication status
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </div>
    );
  }

  // Effect will handle the redirect if unauthorized
  if (!isAuthorized) {
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white border-r flex flex-col shadow-sm">
        <div className="p-8 border-b">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">Admin Area</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Management Console</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${
              pathname === "/admin" ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link 
            href="/admin/navigation" 
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${
              pathname === "/admin/navigation" ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <Link2 className="w-5 h-5" />
            <span>Navigation Links</span>
          </Link>
          <Link 
            href="/admin/domains" 
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${
              pathname === "/admin/domains" ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <Globe className="w-5 h-5" />
            <span>Domain Prices</span>
          </Link>
        </nav>

        <div className="p-6 border-t">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-destructive/10 text-destructive transition-colors text-left font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Primary Workspace */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        {children}
      </main>
    </div>
  );
}
