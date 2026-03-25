
"use client";

import { CheckCircle2, Server, Globe, ShieldCheck, Search, Database } from "lucide-react";

/**
 * ServicesInfo Component
 * Displays detailed textual information about various hosting and domain services.
 */
export function ServicesInfo() {
  const serviceBlocks = [
    {
      title: "Web Hosting in Bangladesh",
      description: "Securely host your website across multiple data centers in the USA and Bangladesh with AmarShebaHost's hosting infrastructure. Our BDIX Hosting and Gbps connectivity ensure fast and low-latency service for your website. You can choose to host on our Linux hosting platform powered by cPanel, CloudLinux, and LiteSpeed. We provide hosting for Python, Laravel, NodeJS, React, WordPress based websites with maximum security.",
      items: ["BDIX Budget Hosting", "USA Budget Hosting", "BDIX Premium Hosting", "USA Premium Hosting"],
      icon: Server,
      color: "text-blue-600"
    },
    {
      title: "Reseller Hosting In Bangladesh",
      description: "Reseller Hosting allows individuals or businesses to resell hosting services to their own customers. Our BDIX Reseller Hosting is best for Bangladeshi visitors. With Reseller Hosting, you can purchase disk space and bandwidth, divide it into smaller packages, and sell them at a markup. It's profitable for designers and developers without the overhead of running a data center.",
      items: ["BDIX Reseller Hosting", "USA Reseller Hosting", "Standard Reseller Hosting"],
      icon: Database,
      color: "text-indigo-600"
    },
    {
      title: "VPS Hosting in Bangladesh",
      description: "We offer VPS hosting servers for your corporate websites and database applications. Built using cutting-edge technology, our virtual server platform is designed with the latest Intel processors and DDR4 RAM. We utilize SSD RAID for the highest IOPS and disk bandwidth, with 1Gbps connectivity already trusted by government and private sector projects.",
      items: ["BDIX VPS", "BDIX RDP Server", "USA VPS", "USA RDP Server"],
      icon: ShieldCheck,
      color: "text-purple-600"
    },
    {
      title: "Domain Registration in Bangladesh",
      description: "Effortlessly register your desired domain names at a reasonable cost. We offer over 2,500 domain extensions, including .com, .net, .org, and more. With every hosting reseller account, you receive a complimentary domain reseller panel. We also provide support in securing Bangladesh government-approved .bd domains.",
      items: ["Domain Registration", "Domain Transfer", "Premium Domains"],
      icon: Search,
      color: "text-emerald-600"
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {serviceBlocks.map((service, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-border/40 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl bg-accent ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {service.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
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
            </div>
            <div className="bg-primary/5 rounded-[2rem] p-8 border-2 border-dashed border-primary/20 text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-6" />
              <h4 className="font-bold text-lg mb-4">Fastest BDIX Network</h4>
              <p className="text-xs text-muted-foreground mb-6">
                Connect your business to millions of local users with less than 5ms latency via BDIX connectivity.
              </p>
              <div className="flex flex-col gap-2">
                 <div className="py-2 px-4 bg-white rounded-xl text-xs font-bold shadow-sm">BDIX VPS Hosting</div>
                 <div className="py-2 px-4 bg-white rounded-xl text-xs font-bold shadow-sm">RDP Server</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
