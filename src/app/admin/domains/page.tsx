
"use client";

import { useState } from "react";
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, GripVertical } from "lucide-react";

/**
 * AdminDomains Component
 * Manages domain extension pricing shown on the home page search.
 */
export default function AdminDomains() {
  const db = useFirestore();
  const [newTld, setNewTld] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const pricesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "domainPrices"), orderBy("displayOrder", "asc"));
  }, [db]);

  const { data: prices, isLoading } = useCollection(pricesQuery);

  const handleAdd = () => {
    if (!newTld || !newPrice || !db) return;
    const colRef = collection(db, "domainPrices");
    addDocumentNonBlocking(colRef, {
      tld: newTld.startsWith('.') ? newTld : `.${newTld}`,
      price: newPrice,
      displayOrder: (prices?.length || 0) + 1
    });
    setNewTld("");
    setNewPrice("");
  };

  const handleDelete = (id: string) => {
    if (!db) return;
    deleteDocumentNonBlocking(doc(db, "domainPrices", id));
  };

  const handleUpdate = (id: string, updates: any) => {
    if (!db) return;
    updateDocumentNonBlocking(doc(db, "domainPrices", id), updates);
  };

  if (isLoading) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gradient">Domain Price Manager</h1>
        <p className="text-muted-foreground">Manage extension prices shown under the search bar on the homepage.</p>
      </div>

      <Card className="rounded-[2rem] shadow-sm border-border/50 bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Add Extension</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="tld">Extension (e.g. .com)</Label>
            <Input 
              id="tld" 
              placeholder=".com" 
              value={newTld} 
              onChange={(e) => setNewTld(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (e.g. $9.99/yr)</Label>
            <Input 
              id="price" 
              placeholder="$9.99/yr" 
              value={newPrice} 
              onChange={(e) => setNewPrice(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <Button onClick={handleAdd} className="gradient-blue h-10 gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Add Price
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-primary shadow-sm shadow-primary/50" />
          Active Prices
        </h2>
        <div className="grid gap-4">
          {prices?.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-5 rounded-[1.5rem] border border-border/50 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow group"
            >
              <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab opacity-30 group-hover:opacity-100 transition-opacity" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase text-muted-foreground ml-1">TLD</Label>
                  <Input 
                    className="h-10 rounded-xl" 
                    defaultValue={item.tld} 
                    onBlur={(e) => handleUpdate(item.id, { tld: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase text-muted-foreground ml-1">Price</Label>
                  <Input 
                    className="h-10 rounded-xl" 
                    defaultValue={item.price} 
                    onBlur={(e) => handleUpdate(item.id, { price: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 self-end pb-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:bg-destructive/10 rounded-xl w-10 h-10"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          {prices?.length === 0 && (
            <div className="p-12 border-2 border-dashed rounded-[2rem] text-center bg-muted/20">
              <p className="text-muted-foreground">No domain prices added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
