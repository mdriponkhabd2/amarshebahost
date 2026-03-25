
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Server, 
  GraduationCap, 
  Zap, 
  ShieldCheck, 
  UserCircle,
  Cpu,
  Layers,
  HardDrive
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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hostingItems = [
    { name: "BDIX Hosting", href: "#pricing", icon: Zap },
    { name: "Student Offer", href: "#pricing", icon: GraduationCap },
    { name: "Special Offer", href: "#pricing", icon: StarIcon },
    { name: "Web Hosting", href: "#pricing", icon: Server },
    { name: "VIP Hosting", href: "#pricing", icon: UserCircle },
  ];

  const resellerItems = [
    { name: "Alpha Reseller", href: "#pricing", icon: Cpu },
    { name: "Master Reseller", href: "#pricing", icon: Layers },
    { name: "Reseller Hosting", href: "#pricing", icon: HardDrive },
  ];

  function StarIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }

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
          <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
            <Globe className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-foreground">
            AmarSheba<span className="text-primary">Host</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>

          {/* Hosting Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
              Hosting <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 p-2 rounded-2xl shadow-xl border-border/50">
              {hostingItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer">
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reseller Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
              Reseller <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 p-2 rounded-2xl shadow-xl border-border/50">
              {resellerItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer">
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Support
          </Link>
          <Button className="gradient-blue shadow-lg hover:opacity-90 transition-opacity ml-4">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b animate-in slide-in-from-top duration-300 h-[calc(100vh-100%)] overflow-y-auto">
          <div className="flex flex-col p-6 gap-2">
            <Link href="/" className="text-lg font-semibold py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="hosting" className="border-none">
                <AccordionTrigger className="text-lg font-semibold py-2 hover:no-underline">Hosting</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 pl-4 pb-4">
                  {hostingItems.map((item) => (
                    <Link key={item.name} href={item.href} className="text-muted-foreground flex items-center gap-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <item.icon className="w-4 h-4" /> {item.name}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="reseller" className="border-none">
                <AccordionTrigger className="text-lg font-semibold py-2 hover:no-underline">Reseller</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 pl-4 pb-4">
                  {resellerItems.map((item) => (
                    <Link key={item.name} href={item.href} className="text-muted-foreground flex items-center gap-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <item.icon className="w-4 h-4" /> {item.name}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link href="#about" className="text-lg font-semibold py-2" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="#contact" className="text-lg font-semibold py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Support
            </Link>
            <Button className="gradient-blue w-full mt-4">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
