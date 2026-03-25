
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronRight, Server, Shield, Zap } from "lucide-react";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-server");

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
            <Zap className="w-3 h-3" />
            <span>Best Web Hosting in Bangladesh</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
            Fast, Secure & <br />
            <span className="text-primary">Reliable Hosting</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg">
            Empower your online presence with ultra-fast servers, 99.9% uptime, and premium support. Start your journey with AmarShebaHost today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gradient-blue text-lg px-8 shadow-xl hover:scale-105 transition-transform">
              Get Started <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 hover:bg-accent/50 transition-colors">
              View Plans
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 grayscale opacity-60">
             <div className="flex items-center gap-2"><Server className="w-5 h-5"/> <span className="text-sm font-medium">NVMe SSD</span></div>
             <div className="flex items-center gap-2"><Shield className="w-5 h-5"/> <span className="text-sm font-medium">DDoS Protected</span></div>
          </div>
        </div>

        <div className="relative animate-fade-in delay-300">
          <div className="absolute -inset-4 gradient-blue opacity-10 blur-2xl rounded-3xl" />
          <div className="relative glass-card rounded-3xl p-4 transform hover:scale-[1.02] transition-transform duration-500">
            <Image
              src={heroImage?.imageUrl || ""}
              alt={heroImage?.description || "Hosting Servers"}
              width={600}
              height={400}
              className="rounded-2xl shadow-lg object-cover"
              data-ai-hint="server datacenter"
              priority
            />
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
