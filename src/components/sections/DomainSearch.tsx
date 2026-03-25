
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function DomainSearch() {
  return (
    <section className="py-12 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="gradient-blue rounded-3xl p-8 lg:p-12 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl font-bold mb-4">Find Your Perfect Domain</h2>
            <p className="text-white/80">Start with the right name. Search availability now.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <div className="flex-1 relative">
              <Input 
                className="h-16 bg-white text-foreground pl-6 rounded-2xl border-none shadow-inner text-lg" 
                placeholder="search-your-domain.com"
              />
            </div>
            <Button size="lg" className="h-16 px-10 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-bold text-lg">
              <Search className="mr-2" /> Search
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-white/70 relative z-10">
            <span className="flex items-center gap-1">.com <span className="text-white">$9.99/yr</span></span>
            <span className="flex items-center gap-1">.net <span className="text-white">$12.50/yr</span></span>
            <span className="flex items-center gap-1">.org <span className="text-white">$10.99/yr</span></span>
            <span className="flex items-center gap-1">.bd <span className="text-white">$15.00/yr</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
