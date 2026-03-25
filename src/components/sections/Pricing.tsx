
"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export function Pricing() {
  const db = useFirestore();

  const pricingQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "pricingPlans"), orderBy("displayOrder", "asc"));
  }, [db]);

  const { data: plans } = useCollection(pricingQuery);

  const handleBuyNow = (url: string) => {
    if (url && url !== "#") {
      window.location.href = url;
    }
  };

  return (
    <section id="pricing" className="py-24 bg-accent/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that's right for you. No hidden fees, no complicated contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(plans && plans.length > 0) ? (
            plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative bg-white rounded-[2.5rem] p-10 transition-all duration-300",
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
                  <span className="text-5xl font-extrabold text-foreground">{plan.currency}{plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>

                <div className="space-y-4 mb-10">
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
            ))
          ) : (
            <div className="col-span-full p-12 text-center italic text-muted-foreground">
              Packages are being updated. Please check back shortly.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
