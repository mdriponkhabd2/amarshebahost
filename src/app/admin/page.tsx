
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Globe, FileText, CreditCard, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * AdminDashboard Component
 * Provides a high-level overview and quick navigation to all management sections.
 */
export default function AdminDashboard() {
  const stats = [
    { title: "Website Content", icon: FileText, value: "Hero & About", color: "bg-orange-100 text-orange-600", href: "/admin/content" },
    { title: "Navigation Links", icon: Link2, value: "Menu Items", color: "bg-blue-100 text-blue-600", href: "/admin/navigation" },
    { title: "Pricing Plans", icon: CreditCard, value: "Hosting & VPS", color: "bg-purple-100 text-purple-600", href: "/admin/pricing" },
    { title: "Domain Prices", icon: Globe, value: "TLD Extensions", color: "bg-emerald-100 text-emerald-600", href: "/admin/domains" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 gradient-blue rounded-2xl flex items-center justify-center text-white shadow-lg">
          <LayoutDashboard className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-1 text-gradient">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome to the AmarShebaHost administration panel.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover-lift cursor-pointer rounded-[2rem] border-border/50 overflow-hidden shadow-lg transition-all active:scale-95">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={cn("p-2 rounded-xl", stat.color)}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="bg-primary/5 rounded-[2.5rem] p-12 text-center border border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Quick Management</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Update your hosting plans, prices, navigation links, and website content in real-time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admin/pricing">
              <Button size="lg" className="gradient-blue shadow-xl px-12 rounded-2xl h-14 font-bold">
                Manage Pricing
              </Button>
            </Link>
            <Link href="/admin/content">
              <Button size="lg" variant="outline" className="shadow-xl px-12 rounded-2xl h-14 font-bold bg-white">
                Edit Content
              </Button>
            </Link>
            <Link href="/admin/navigation">
              <Button size="lg" variant="ghost" className="shadow-xl px-12 rounded-2xl h-14 font-bold">
                Manage Links
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
