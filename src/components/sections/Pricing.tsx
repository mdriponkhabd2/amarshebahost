
"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DEMO_PLANS = [
  // Hosting
  { id: "h1", category: "hosting", name: "Basic", description: "Perfect for personal websites", price: 199, currency: "৳", features: ["1GB Storage", "100GB Bandwidth", "1 Website", "Free SSL"], isPopular: false, callToActionUrl: "#" },
  { id: "h2", category: "hosting", name: "Standard", description: "Ideal for growing businesses", price: 499, currency: "৳", features: ["10GB Storage", "Unlimited Bandwidth", "5 Websites", "Free Domain"], isPopular: true, callToActionUrl: "#" },
  { id: "h3", category: "hosting", name: "Premium", description: "Ultimate power for professionals", price: 999, currency: "৳", features: ["Unlimited Storage", "Global CDN", "20 Websites", "Priority Support"], isPopular: false, callToActionUrl: "#" },
  // VPS
  { id: "v1", category: "vps", name: "VPS Start", description: "Entry-level virtual server", price: 999, currency: "৳", features: ["2 vCPU Cores", "4GB RAM", "50GB NVMe SSD", "1TB Bandwidth"], isPopular: false, callToActionUrl: "#" },
  { id: "v2", category: "vps", name: "VPS Pro", description: "High performance VPS", price: 1999, currency: "৳", features: ["4 vCPU Cores", "8GB RAM", "100GB NVMe SSD", "Unlimited Bandwidth"], isPopular: true, callToActionUrl: "#" },
  { id: "v3", category: "vps", name: "VPS Elite", description: "Enterprise grade VPS", price: 3999, currency: "৳", features: ["8 vCPU Cores", "16GB RAM", "200GB NVMe SSD", "Dedicated IP"], isPopular: false, callToActionUrl: "#" },
  // Reseller
  { id: "r1", category: "reseller", name: "Starter Reseller", description: "Start your hosting business", price: 799, currency: "৳", features: ["20 cPanel Accounts", "50GB NVMe Storage", "Free WHMCS (Trial)", "Private Name Servers"], isPopular: false, callToActionUrl: "#" },
  { id: "r2", category: "reseller", name: "Pro Reseller", description: "Grow your agency", price: 1499, currency: "৳", features: ["50 cPanel Accounts", "100GB NVMe Storage", "Free SSL for Clients", "24/7 Priority Support"], isPopular: true, callToActionUrl: "#" },
  { id: "r3", category: "reseller", name: "Ultimate Reseller", description: "Maximum capacity", price: 2499, currency: "৳", features: ["Unlimited Accounts", "250GB NVMe Storage", "Free Domain (1st Year)", "White-label Branding"], isPopular: false, callToActionUrl: "#" }
];

export function Pricing() {
  const db = useFirestore();

  const pricingQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "pricingPlans"), orderBy("displayOrder", "asc"));
  }, [db]);

  const { data: plans } = useCollection(pricingQuery);
  const displayPlans = (plans && plans.length > 0) ? plans : DEMO_PLANS;

  const handleBuyNow = (url: string) => {
    if (url && url !== "#") {
      window.location.href = url;
    }
  };

  const PlanCard = ({ plan }: { plan: any }) => (
    <div
      key={plan.id}
      className={cn(
        "relative bg-white rounded-[2.5rem] p-10 transition-all duration-300 flex flex-col h-full",
        plan.isPopular 
          ? "border-4 border-primary shadow-2xl lg:scale-105 z-10" 
          : "border border-border/50 shadow-lg hover:shadow-xl"
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 gradient-blue text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-muted-foreground text-sm">{plan.description}</p>
      </div>

      <div className="mb-10 flex items-baseline gap-1">
        <span className="text-5xl font-extrabold text-foreground">{plan.currency || "৳"}{plan.price}</span>
        <span className="text-muted-foreground">/mo</span>
      </div>

      <div className="space-y-4 mb-10 flex-1">
        {plan.features?.map((feature: string, fIdx: number) => (
          <div key={fIdx} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-sm font-medium">{feature}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={() => handleBuyNow(plan.callToActionUrl)}
        className={cn(
          "w-full h-14 text-lg font-bold rounded-2xl transition-all",
          plan.isPopular ? "gradient-blue text-white" : "bg-accent/50 text-foreground hover:bg-accent"
        )}
      >
        Buy Now
      </Button>
    </div>
  );

  return (
    <section id="pricing" className="py-24 bg-accent/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that's right for you. From shared hosting to powerful VPS and Reseller accounts.
          </p>
        </div>

        <Tabs defaultValue="hosting" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white/50 backdrop-blur-sm p-1 h-14 rounded-2xl border shadow-sm">
              <TabsTrigger value="hosting" className="rounded-xl px-8 h-full text-base data-[state=active]:gradient-blue data-[state=active]:text-white transition-all">Web Hosting</TabsTrigger>
              <TabsTrigger value="vps" className="rounded-xl px-8 h-full text-base data-[state=active]:gradient-blue data-[state=active]:text-white transition-all">VPS Hosting</TabsTrigger>
              <TabsTrigger value="reseller" className="rounded-xl px-8 h-full text-base data-[state=active]:gradient-blue data-[state=active]:text-white transition-all">Reseller</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hosting">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {displayPlans.filter(p => p.category === "hosting").map(plan => <PlanCard key={plan.id} plan={plan} />)}
            </div>
          </TabsContent>

          <TabsContent value="vps">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {displayPlans.filter(p => p.category === "vps").map(plan => <PlanCard key={plan.id} plan={plan} />)}
            </div>
          </TabsContent>

          <TabsContent value="reseller">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {displayPlans.filter(p => p.category === "reseller").map(plan => <PlanCard key={plan.id} plan={plan} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
