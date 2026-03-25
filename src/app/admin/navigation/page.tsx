"use client";

import { useState } from "react";
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, GripVertical, ExternalLink } from "lucide-react";

/**
 * AdminNavigation Component
 * Manages the dynamic links for the website's navigation menus.
 */
export default function AdminNavigation() {
  const db = useFirestore();
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLocation, setNewLocation] = useState("hosting");

  const linksQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "navigationLinks"), orderBy("displayOrder", "asc"));
  }, [db]);

  const { data: links, isLoading } = useCollection(linksQuery);

  const handleAdd = () => {
    if (!newTitle || !db) return;
    const colRef = collection(db, "navigationLinks");
    addDocumentNonBlocking(colRef, {
      title: newTitle,
      url: newUrl || "#",
      location: newLocation,
      displayOrder: (links?.length || 0) + 1
    });
    setNewTitle("");
    setNewUrl("");
  };

  const handleDelete = (id: string) => {
    if (!db) return;
    deleteDocumentNonBlocking(doc(db, "navigationLinks", id));
  };

  const handleUpdate = (id: string, updates: any) => {
    if (!db) return;
    updateDocumentNonBlocking(doc(db, "navigationLinks", id), updates);
  };

  if (isLoading) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gradient">Navigation Manager</h1>
        <p className="text-muted-foreground">Manage links for Hosting, Reseller, and Domain dropdown menus.</p>
      </div>

      <Card className="rounded-[2rem] shadow-sm border-border/50 bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Add New Link</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="title">Link Title</Label>
            <Input 
              id="title" 
              placeholder="e.g. Domain Registration" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL Path</Label>
            <Input 
              id="url" 
              placeholder="e.g. /domain/register" 
              value={newUrl} 
              onChange={(e) => setNewUrl(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>Menu Category</Label>
            <Select value={newLocation} onValueChange={setNewLocation}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hosting">Hosting Menu</SelectItem>
                <SelectItem value="reseller">Reseller Menu</SelectItem>
                <SelectItem value="domain">Domain Menu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAdd} className="gradient-blue h-10 gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Create Link
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8">
        {["hosting", "reseller", "domain"].map((cat) => (
          <div key={cat} className="space-y-4">
            <h2 className="text-xl font-bold capitalize flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-primary shadow-sm shadow-primary/50" />
              {cat} Dropdown Items
            </h2>
            <div className="grid gap-4">
              {links?.filter(l => l.location === cat).map((link) => (
                <div 
                  key={link.id} 
                  className="bg-white p-5 rounded-[1.5rem] border border-border/50 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow group"
                >
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab opacity-30 group-hover:opacity-100 transition-opacity" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase text-muted-foreground ml-1">Title</Label>
                      <Input 
                        className="h-10 rounded-xl" 
                        defaultValue={link.title} 
                        onBlur={(e) => handleUpdate(link.id, { title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase text-muted-foreground ml-1">URL</Label>
                      <div className="relative">
                        <Input 
                          className="h-10 rounded-xl pr-10" 
                          defaultValue={link.url} 
                          onBlur={(e) => handleUpdate(link.id, { url: e.target.value })}
                        />
                        <ExternalLink className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end pb-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10 rounded-xl w-10 h-10"
                      onClick={() => handleDelete(link.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {links?.filter(l => l.location === cat).length === 0 && (
                <div className="p-12 border-2 border-dashed rounded-[2rem] text-center bg-muted/20">
                  <p className="text-muted-foreground">No links added to the {cat} menu yet.</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Use the "Add New Link" form above to get started.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}