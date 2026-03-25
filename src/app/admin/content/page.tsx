
"use client";

import { useState, useEffect } from "react";
import { useFirestore, useCollection, useMemoFirebase, setDocumentNonBlocking } from "@/firebase";
import { collection, query, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, Image as ImageIcon, Type, FileText } from "lucide-react";

/**
 * AdminContent Component
 * Manages the text and image URLs for Hero and About sections.
 */
export default function AdminContent() {
  const db = useFirestore();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const contentQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "websiteContentBlocks"));
  }, [db]);

  const { data: blocks, isLoading } = useCollection(contentQuery);

  // Sync Firestore data to local state once loaded
  useEffect(() => {
    if (blocks) {
      const data: Record<string, string> = {};
      blocks.forEach((block) => {
        data[block.id] = block.value;
      });
      setFormData(data);
    }
  }, [blocks]);

  const handleUpdate = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const saveBlock = (key: string, description: string) => {
    if (!db) return;
    const blockRef = doc(db, "websiteContentBlocks", key);
    setDocumentNonBlocking(blockRef, {
      value: formData[key] || "",
      description,
      key,
      contentType: "plaintext",
      id: key
    }, { merge: true });
  };

  if (isLoading) return <div className="p-12 text-center">Loading Content...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gradient">Website Content Manager</h1>
        <p className="text-muted-foreground">Update the main text and image URLs for your landing page sections.</p>
      </div>

      {/* Hero Section Management */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Manage the main introduction area of your site.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Main Headline</Label>
              <Input 
                value={formData["hero_headline"] || ""} 
                onChange={(e) => handleUpdate("hero_headline", e.target.value)}
                placeholder="e.g. Fast, Secure & Reliable Hosting"
                className="rounded-xl h-12"
              />
              <Button onClick={() => saveBlock("hero_headline", "Hero main headline")} size="sm" className="gradient-blue gap-2 rounded-lg">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Hero Image URL</Label>
              <div className="flex gap-2">
                <Input 
                  value={formData["hero_image_url"] || ""} 
                  onChange={(e) => handleUpdate("hero_image_url", e.target.value)}
                  placeholder="https://..."
                  className="rounded-xl h-12"
                />
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
              <Button onClick={() => saveBlock("hero_image_url", "Hero section image")} size="sm" className="gradient-blue gap-2 rounded-lg">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Sub-headline Description</Label>
            <Textarea 
              value={formData["hero_subheadline"] || ""} 
              onChange={(e) => handleUpdate("hero_subheadline", e.target.value)}
              placeholder="Empower your online presence..."
              className="rounded-xl min-h-[100px]"
            />
            <Button onClick={() => saveBlock("hero_subheadline", "Hero section description text")} size="sm" className="gradient-blue gap-2 rounded-lg">
              <Save className="w-4 h-4" /> Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About Section Management */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>About Section</CardTitle>
              <CardDescription>Update your company history and mission details.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>About Section Headline</Label>
              <Input 
                value={formData["about_headline"] || ""} 
                onChange={(e) => handleUpdate("about_headline", e.target.value)}
                placeholder="e.g. Reliable Web Hosting Born in Bangladesh"
                className="rounded-xl h-12"
              />
              <Button onClick={() => saveBlock("about_headline", "About us section headline")} size="sm" className="gradient-blue gap-2 rounded-lg">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
            <div className="space-y-2">
              <Label>About Image URL</Label>
              <div className="flex gap-2">
                <Input 
                  value={formData["about_image_url"] || ""} 
                  onChange={(e) => handleUpdate("about_image_url", e.target.value)}
                  placeholder="https://..."
                  className="rounded-xl h-12"
                />
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
              <Button onClick={() => saveBlock("about_image_url", "About us section image")} size="sm" className="gradient-blue gap-2 rounded-lg">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Main Paragraph</Label>
            <Textarea 
              value={formData["about_desc_1"] || ""} 
              onChange={(e) => handleUpdate("about_desc_1", e.target.value)}
              placeholder="AmarShebaHost was founded..."
              className="rounded-xl min-h-[100px]"
            />
            <Button onClick={() => saveBlock("about_desc_1", "About us paragraph 1")} size="sm" className="gradient-blue gap-2 rounded-lg">
              <Save className="w-4 h-4" /> Save
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Secondary Paragraph</Label>
            <Textarea 
              value={formData["about_desc_2"] || ""} 
              onChange={(e) => handleUpdate("about_desc_2", e.target.value)}
              placeholder="With our servers located..."
              className="rounded-xl min-h-[100px]"
            />
            <Button onClick={() => saveBlock("about_desc_2", "About us paragraph 2")} size="sm" className="gradient-blue gap-2 rounded-lg">
              <Save className="w-4 h-4" /> Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
