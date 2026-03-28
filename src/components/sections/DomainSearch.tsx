
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export function DomainSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const db = useFirestore();

  const pricesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "domainPrices"), orderBy("displayOrder", "asc"));
  }, [db]);

  const { data: prices } = useCollection(pricesQuery);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    // Redirect to the new registration URL provided by the user
    const billingUrl = `https://host.amarshebahost.com/cart.php?a=add&domain=register&query=${encodeURIComponent(searchTerm)}`;
    window.location.href = billingUrl;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative gradient-blue py-16 lg:py-20 text-white overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Find Your Perfect Domain</h2>
          <p className="text-white/80 text-lg">Start with the right name. Search availability now.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Input 
              className="h-16 bg-white text-foreground pl-6 rounded-2xl border-none shadow-xl text-lg w-full focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-secondary/50" 
              placeholder="search-your-domain.com"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button 
            className="h-16 px-10 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-bold text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            onClick={handleSearch}
          >
            <Search className="w-5 h-5" /> Search Now
          </button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm font-semibold text-white/90">
          {prices && prices.length > 0 ? (
            prices.map((item) => (
              <div key={item.id} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="opacity-70">{item.tld}</span> 
                <span className="text-white font-bold">{item.price}</span>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="opacity-70">.com</span> <span className="text-white font-bold">৳1200</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="opacity-70">.top</span> <span className="text-white font-bold">৳250</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="opacity-70">.xyz</span> <span className="text-white font-bold">৳350</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="opacity-70">.bd</span> <span className="text-white font-bold">৳1500</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
