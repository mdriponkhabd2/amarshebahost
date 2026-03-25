
import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Link2, LogOut, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center text-white">
              <Settings className="w-4 h-4" />
            </div>
            <span className="font-bold">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link 
            href="/admin/navigation" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary transition-colors"
          >
            <Link2 className="w-5 h-5" />
            <span className="font-medium">Navigation Links</span>
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
