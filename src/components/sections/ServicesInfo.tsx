
"use client";

import { CheckCircle2, Server, Globe, ShieldCheck, Search, Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ServicesInfo Component
 * Displays detailed textual information about various hosting and domain services.
 */
export function ServicesInfo() {
  const serviceBlocks = [
    {
      title: "Web Hosting in Bangladesh",
      description: "Securely host your website across multiple data centers in the USA and Bangladesh with AmarShebaHost's hosting infrastructure. Our BDIX Hosting and Gbps connectivity ensure fast and low-latency service for your website. You can choose to host on AmarShebaHost's Linux hosting platform powered by cPanel, CloudLinux, and LiteSpeed. We provide hosting for Python, Laravel, NodeJS, React, WordPress based websites with maximum security. With AmarShebaHost, you can rest assured that your website is hosted on a secure and reliable platform.",
      items: ["BDIX Budget Hosting", "USA Budget Hosting", "BDIX Premium Hosting", "USA Premium Hosting"],
      icon: Server,
      color: "text-blue-600",
      cta: "Buy Web Hosting"
    },
    {
      title: "Reseller Hosting In Bangladesh",
      description: "Reseller Hosting in Bangladesh refers to a type of web hosting service that allows individuals or businesses to resell hosting services to their own customers. We provide best reseller hosting in Bangladesh. Our BDIX Reseller Hosting best for Bangladeshi visitors website owner. With Reseller Hosting, you can purchase disk space and bandwidth, divide it into smaller packages, and sell them at a markup. It's profitable for designers and developers without the overhead of running a data center.",
      items: ["BDIX Reseller Hosting", "USA Reseller Hosting", "Standard Reseller Hosting"],
      icon: Database,
      color: "text-indigo-600",
      cta: "Buy Reseller Hosting"
    },
    {
      title: "VPS Hosting in Bangladesh",
      description: "AmarShebaHost offers vps hosting server for your corporate website and database applications. Our VPS solutions are built using cutting-edge technology and have been a pioneer in the industry in Bangladesh. We provide cheap vps in Bangladesh. Our virtual server platform is designed with the latest Intel server processors and DDR4 RAM to ensure optimal performance. Additionally, our platform utilizes SSD RAID to provide the highest IOPS and disk bandwidth.",
      items: ["BDIX VPS", "BDIX RDP Server", "USA VPS", "USA RDP Server"],
      icon: ShieldCheck,
      color: "text-purple-600",
      cta: "Buy VPS Now"
    },
    {
      title: "Domain Registration in Bangladesh",
      description: "With AmarShebaHost, you can effortlessly register your desired domain names at a reasonable cost from anywhere and anytime. AmarShebaHost offers a vast selection of over 2,500 domain extensions, including the commonly used .com, .net, .org, .info, and many more. We have already registered thousands of domains, and with every hosting reseller account, you will receive a complimentary domain reseller panel.",
      items: ["Domain Registration", "Domain Transfer", "Premium Domains"],
      icon: Search,
      color: "text-emerald-600",
      cta: "Register Domain"
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {serviceBlocks.map((service, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-border/40 hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl bg-accent ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {service.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
              <Button 
                className="w-full gradient-blue h-12 rounded-xl font-bold group"
                onClick={() => window.location.href = "#pricing"}
              >
                {service.cta} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-white p-10 lg:p-16 rounded-[3rem] border border-border/40 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 gradient-blue rounded-full" />
                <h3 className="text-2xl font-bold">BDIX Hosting In Bangladesh</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                BDIX hosting is one of the most powerful hosting facilities powered by Bangladeshi Data Centers. This ensures the fastest loading time, 99.9% guaranteed uptime with super-fast data sharing facilities. Our BDIX FTP server is one of the fastest in the country. AmarShebaHost offers the best NVMe BDIX web hosting in Bangladesh for all its clients. 
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Basically BDIX VPS Hosting is the perfect solution for Bangladeshi news portals, e-commerce businesses, blog sites, and high-traffic websites. It is quality and advanced in all respects compared to other hosting services. We offer both BDIX VPS managed and unmanaged packages with all the prominences you need.
              </p>
              <Button 
                variant="outline" 
                className="rounded-xl px-8 border-2"
                onClick={() => window.location.href = "#pricing"}
              >
                Get Started with BDIX
              </Button>
            </div>
            <div className="bg-primary/5 rounded-[2rem] p-8 border-2 border-dashed border-primary/20 text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-6" />
              <h4 className="font-bold text-lg mb-4">Fastest BDIX Network</h4>
              <p className="text-xs text-muted-foreground mb-6">
                Connect your business to millions of local users with less than 5ms latency via BDIX connectivity.
              </p>
              <div className="flex flex-col gap-2">
                 <Button size="sm" className="gradient-blue rounded-xl h-10 font-bold" onClick={() => window.location.href = "#pricing"}>Buy BDIX VPS</Button>
                 <Button size="sm" variant="ghost" className="rounded-xl h-10 font-bold" onClick={() => window.location.href = "#pricing"}>RDP Servers</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
