
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button 
              size="lg" 
              className="h-16 px-10 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-bold text-lg"
              onClick={handleSearch}
            >
              <Search className="mr-2" /> Search
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-white/70 relative z-10">
            {prices && prices.length > 0 ? (
              prices.map((item) => (
                <span key={item.id} className="flex items-center gap-1">
                  {item.tld} <span className="text-white">{item.price}</span>
                </span>
              ))
            ) : (
              <>
                <span className="flex items-center gap-1">.com <span className="text-white">৳1200</span></span>
                <span className="flex items-center gap-1">.top <span className="text-white">৳250</span></span>
                <span className="flex items-center gap-1">.xyz <span className="text-white">৳350</span></span>
                <span className="flex items-center gap-1">.bd <span className="text-white">৳1500</span></span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
