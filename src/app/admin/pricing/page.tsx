
"use client";

import { useState } from "react";
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Plus, CreditCard, Sparkles, Server, Globe, Cpu } from "lucide-react";

const DEMO_PLANS = [
  // Hosting
  { category: "hosting", name: "Basic", description: "Perfect for personal websites", price: 199, features: ["1GB Storage", "100GB Bandwidth", "1 Website", "Free SSL"], isPopular: false, callToActionUrl: "#", displayOrder: 1 },
  { category: "hosting", name: "Standard", description: "Ideal for growing businesses", price: 499, features: ["10GB Storage", "Unlimited Bandwidth", "5 Websites", "Free Domain"], isPopular: true, callToActionUrl: "#", displayOrder: 2 },
  { category: "hosting", name: "Premium", description: "Ultimate power for professionals", price: 999, features: ["Unlimited Storage", "Global CDN", "20 Websites", "Priority Support"], isPopular: false, callToActionUrl: "#", displayOrder: 3 },
  // VPS
  { category: "vps", name: "VPS Start", description: "Entry-level virtual server", price: 999, features: ["2 vCPU Cores", "4GB RAM", "50GB NVMe SSD", "1TB Bandwidth"], isPopular: false, callToActionUrl: "#", displayOrder: 4 },
  { category: "vps", name: "VPS Pro", description: "High performance VPS", price: 1999, features: ["4 vCPU Cores", "8GB RAM", "100GB NVMe SSD", "Unlimited Bandwidth"], isPopular: true, callToActionUrl: "#", displayOrder: 5 },
  { category: "vps", name: "VPS Elite", description: "Enterprise grade VPS", price: 3999, features: ["8 vCPU Cores", "16GB RAM", "200GB NVMe SSD", "Dedicated IP"], isPopular: false, callToActionUrl: "#", displayOrder: 6 },
  // Reseller
  { category: "reseller", name: "Starter Reseller", description: "Start your hosting business", price: 799, features: ["20 cPanel Accounts", "50GB NVMe Storage", "Free WHMCS (Trial)", "Private Name Servers"], isPopular: false, callToActionUrl: "#", displayOrder: 7 },
  { category: "reseller", name: "Pro Reseller", description: "Grow your agency", price: 1499, features: ["50 cPanel Accounts", "100GB NVMe Storage", "Free SSL for Clients", "24/7 Priority Support"], isPopular: true, callToActionUrl: "#", displayOrder: 8 },
  { category: "reseller", name: "Ultimate Reseller", description: "Maximum capacity", price: 2499, features: ["Unlimited Accounts", "250GB NVMe Storage", "Free Domain (1st Year)", "White-label Branding"], isPopular: false, callToActionUrl: "#", displayOrder: 9 }
];

export default function AdminPricing() {
  const db = useFirestore();
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("hosting");
  const [newDesc, setNewDesc] = useState("");
  const [newFeatures, setNewFeatures] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newPopular, setNewPopular] = useState(false);

  const pricingQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "pricingPlans"), orderBy("displayOrder", "asc"));
  }, [db]);

  const { data: plans, isLoading } = useCollection(pricingQuery);

  const handleAdd = () => {
    if (!newName || !newPrice || !db) return;
    const colRef = collection(db, "pricingPlans");
    addDocumentNonBlocking(colRef, {
      name: newName,
      category: newCategory,
      price: parseFloat(newPrice) || 0,
      currency: "৳",
      description: newDesc,
      features: newFeatures.split("\n").filter(f => f.trim() !== ""),
      isPopular: newPopular,
      callToActionUrl: newUrl || "#",
      displayOrder: (plans?.length || 0) + 1
    });
    setNewName("");
    setNewPrice("");
    setNewDesc("");
    setNewFeatures("");
    setNewUrl("");
    setNewPopular(false);
  };

  const initializeAllDemoPlans = () => {
    if (!db) return;
    const colRef = collection(db, "pricingPlans");
    DEMO_PLANS.forEach((plan) => {
      addDocumentNonBlocking(colRef, { ...plan, currency: "৳" });
    });
  };

  const handleDelete = (id: string) => {
    if (!db) return;
    deleteDocumentNonBlocking(doc(db, "pricingPlans", id));
  };

  const handleUpdate = (id: string, updates: any) => {
    if (!db) return;
    updateDocumentNonBlocking(doc(db, "pricingPlans", id), updates);
  };

  if (isLoading) return <div className="p-12 text-center text-muted-foreground">Loading Plans...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gradient">Pricing Plan Manager</h1>
          <p className="text-muted-foreground">Manage your web hosting, VPS, and reseller packages.</p>
        </div>
        <Button onClick={initializeAllDemoPlans} variant="outline" className="rounded-xl gap-2 border-primary text-primary hover:bg-primary/10">
          <Sparkles className="w-4 h-4" /> Load All Demo Packages (Hosting, VPS, Reseller)
        </Button>
      </div>

      <Card className="rounded-[2rem] shadow-sm border-border/50 bg-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" /> Create New Plan
          </CardTitle>
          <CardDescription>Select category and define package details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hosting">Web Hosting</SelectItem>
                  <SelectItem value="vps">VPS Hosting</SelectItem>
                  <SelectItem value="reseller">Reseller Hosting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Plan Name</Label>
              <Input placeholder="e.g. Starter" value={newName} onChange={e => setNewName(e.target.value)} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Price (৳)</Label>
              <Input type="number" placeholder="499" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>CTA URL</Label>
              <Input placeholder="https://..." value={newUrl} onChange={e => setNewUrl(e.target.value)} className="rounded-xl" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Short Description</Label>
            <Input placeholder="Ideal for growing businesses..." value={newDesc} onChange={e => setNewDesc(e.target.value)} className="rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label>Features (One per line)</Label>
            <Textarea 
              placeholder="10GB Storage&#10;Unlimited Emails&#10;Free SSL" 
              value={newFeatures} 
              onChange={e => setNewFeatures(e.target.value)}
              className="rounded-xl min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-dashed">
            <div className="flex items-center gap-3">
              <Switch checked={newPopular} onCheckedChange={setNewPopular} />
              <Label>Mark as "Most Popular"</Label>
            </div>
            <Button onClick={handleAdd} className="gradient-blue h-12 px-8 rounded-xl shadow-lg">
              Save Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {["hosting", "vps", "reseller"].map((cat) => (
        <div key={cat} className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-3 capitalize">
            {cat === "hosting" ? <Globe className="w-5 h-5 text-blue-500" /> : cat === "vps" ? <Cpu className="w-5 h-5 text-purple-500" /> : <Server className="w-5 h-5 text-orange-500" />}
            {cat} Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans?.filter(p => p.category === cat).map((plan) => (
              <Card key={plan.id} className={`rounded-[2rem] shadow-sm border-border/50 relative overflow-hidden flex flex-col ${plan.isPopular ? 'border-primary ring-1 ring-primary/20' : ''}`}>
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-bl-xl shadow-sm">
                    Popular
                  </div>
                )}
                <CardContent className="p-6 space-y-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Label className="text-[10px] uppercase text-muted-foreground">Plan Name</Label>
                      <Input 
                        defaultValue={plan.name} 
                        onBlur={e => handleUpdate(plan.id, { name: e.target.value })}
                        className="font-bold text-lg border-none p-0 h-auto focus-visible:ring-0 mb-1"
                      />
                      <div className="flex items-baseline gap-1">
                        <span className="text-primary font-black text-xl">৳</span>
                        <Input 
                          type="number"
                          defaultValue={plan.price} 
                          onBlur={e => handleUpdate(plan.id, { price: parseFloat(e.target.value) || 0 })}
                          className="font-black text-xl text-primary border-none p-0 w-24 h-auto focus-visible:ring-0"
                        />
                        <span className="text-xs font-normal text-muted-foreground">/mo</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(plan.id)} className="text-destructive rounded-full">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase text-muted-foreground">Description</Label>
                    <Input 
                      defaultValue={plan.description} 
                      onBlur={e => handleUpdate(plan.id, { description: e.target.value })}
                      className="h-8 text-xs rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase text-muted-foreground">CTA URL</Label>
                    <Input 
                      defaultValue={plan.callToActionUrl} 
                      onBlur={e => handleUpdate(plan.id, { callToActionUrl: e.target.value })}
                      className="h-8 text-xs rounded-lg"
                    />
                  </div>

                  <div className="space-y-1 flex-1">
                    <Label className="text-[10px] uppercase text-muted-foreground">Features (one per line)</Label>
                    <Textarea 
                      defaultValue={plan.features?.join("\n")} 
                      onBlur={e => handleUpdate(plan.id, { features: e.target.value.split("\n").filter(f => f.trim() !== "") })}
                      className="text-xs min-h-[100px] rounded-lg"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t mt-auto">
                    <Switch 
                      checked={plan.isPopular} 
                      onCheckedChange={(checked) => handleUpdate(plan.id, { isPopular: checked })}
                    />
                    <span className="text-xs font-medium">Highlight Plan</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {plans?.filter(p => p.category === cat).length === 0 && (
             <div className="p-12 border-2 border-dashed rounded-[2rem] text-center bg-muted/20 text-muted-foreground">
               No {cat} plans added yet. Click "Load All Demo Packages" to start.
             </div>
          )}
        </div>
      ))}
    </div>
  );
}
