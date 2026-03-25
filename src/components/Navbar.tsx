
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Server, 
  GraduationCap, 
  Zap, 
  UserCircle,
  Cpu,
  Layers,
  HardDrive,
  ShieldCheck,
  DollarSign,
  ArrowRightLeft,
  MousePointerClick
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCollection, useMemoFirebase, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const db = useFirestore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinksQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "navigationLinks"), orderBy("displayOrder", "asc"));
  }, [db]);

  const contentQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "websiteContentBlocks"));
  }, [db]);

  const { data: navLinks } = useCollection(navLinksQuery);
  const { data: blocks } = useCollection(contentQuery);

  const getBlockValue = (key: string, defaultValue: string) => {
    return blocks?.find(b => b.id === key)?.value || defaultValue;
  };

  const logoUrl = getBlockValue("website_logo_url", "");
  const signInUrl = getBlockValue("hero_signin_url", "#");
  const signUpUrl = getBlockValue("hero_signup_url", "#");

  const filterLinks = (location: string) => {
    return navLinks?.filter(link => link.location === location) || [];
  };

  const hostingItems = filterLinks("hosting");
  const resellerItems = filterLinks("reseller");
  const domainItems = filterLinks("domain");

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("bdix")) return Zap;
    if (t.includes("student")) return GraduationCap;
    if (t.includes("special") || t.includes("offer")) return MousePointerClick;
    if (t.includes("web")) return Server;
    if (t.includes("vip")) return UserCircle;
    if (t.includes("alpha")) return Cpu;
    if (t.includes("master")) return Layers;
    if (t.includes("reseller")) return HardDrive;
    if (t.includes("registration")) return ShieldCheck;
    if (t.includes("pricing")) return DollarSign;
    if (t.includes("transfer")) return ArrowRightLeft;
    return Globe;
  };

  const NavDropdown = ({ label, items }: { label: string; items: any[] }) => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
        {label} <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-2 rounded-2xl shadow-xl border-border/50">
        {items.length > 0 ? (
          items.map((item) => {
            const Icon = getIcon(item.title);
            return (
              <DropdownMenuItem key={item.id} asChild>
                <Link href={item.url || "#"} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-accent transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{item.title}</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            );
          })
        ) : (
          <div className="p-4 text-xs text-muted-foreground italic text-center">Manage items in Admin Panel</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-lg border-b shadow-sm"
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          {logoUrl ? (
            <div className="relative h-10 w-48">
              <Image 
                src={logoUrl} 
                alt="AmarShebaHost Logo" 
                fill 
                className="object-contain object-left"
                priority
              />
            </div>
          ) : (
            <>
              <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-foreground">
                AmarSheba<span className="text-primary">Host</span>
              </span>
            </>
          )}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>

          <NavDropdown label="Hosting" items={hostingItems} />
          <NavDropdown label="Reseller" items={resellerItems} />
          <NavDropdown label="Domain" items={domainItems} />

          <Link href="/support" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Support
          </Link>
          <div className="flex items-center gap-3 ml-4">
            <Button 
              className="gradient-blue shadow-lg hover:opacity-90 transition-opacity rounded-xl px-6"
              onClick={() => window.location.href = signInUrl}
            >
              Sign In
            </Button>
            <Button 
              variant="outline"
              className="rounded-xl px-6 border-2 hover:bg-accent/50"
              onClick={() => window.location.href = signUpUrl}
            >
              Sign Up
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b animate-in slide-in-from-top duration-300 h-[calc(100vh-100%)] overflow-y-auto shadow-2xl">
          <div className="flex flex-col p-6 gap-2">
            <Link href="/" className="text-lg font-semibold py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            
            <Accordion type="single" collapsible className="w-full">
              {[
                { name: "Hosting", items: hostingItems },
                { name: "Reseller", items: resellerItems },
                { name: "Domain", items: domainItems }
              ].map((cat) => (
                <AccordionItem key={cat.name} value={cat.name.toLowerCase()} className="border-none">
                  <AccordionTrigger className="text-lg font-semibold py-2 hover:no-underline">{cat.name}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2 pl-4 pb-4">
                    {cat.items.map((item) => {
                      const Icon = getIcon(item.title);
                      return (
                        <Link key={item.id} href={item.url || "#"} className="text-muted-foreground flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-accent" onClick={() => setIsMobileMenuOpen(false)}>
                          <Icon className="w-4 h-4 text-primary" /> {item.title}
                        </Link>
                      );
                    })}
                    {cat.items.length === 0 && <span className="text-xs italic text-muted-foreground">No items added</span>}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Link href="/support" className="text-lg font-semibold py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Support
            </Link>
            <div className="flex flex-col gap-3 mt-6">
              <Button 
                className="gradient-blue w-full h-12 rounded-xl text-lg font-bold"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = signInUrl;
                }}
              >
                Sign In
              </Button>
              <Button 
                variant="outline"
                className="w-full h-12 rounded-xl text-lg font-bold border-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = signUpUrl;
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
