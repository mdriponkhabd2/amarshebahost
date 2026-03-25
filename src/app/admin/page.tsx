
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, LayoutDashboard, Database, Globe, DollarSign } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const stats = [
    { title: "Navigation Links", icon: Link2, value: "Dynamic", color: "bg-blue-100 text-blue-600", href: "/admin/navigation" },
    { title: "Domain Prices", icon: Globe, value: "Search List", color: "bg-emerald-100 text-emerald-600", href: "/admin/domains" },
    { title: "Pricing Plans", icon: Database, value: "Hosting", color: "bg-purple-100 text-purple-600", href: "#" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gradient">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to the AmarShebaHost administration panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover-lift cursor-pointer rounded-[2rem] border-border/50 overflow-hidden shadow-lg transition-all">
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

      <div className="bg-primary/5 rounded-[2.5rem] p-12 text-center border border-primary/10">
        <h2 className="text-2xl font-bold mb-4">Quick Management</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Manage your website's navigation links and domain prices in real-time.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/admin/navigation">
            <Button size="lg" className="gradient-blue shadow-xl px-12 rounded-2xl">
              Manage Links
            </Button>
          </Link>
          <Link href="/admin/domains">
            <Button size="lg" variant="outline" className="shadow-xl px-12 rounded-2xl">
              Domain Prices
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
