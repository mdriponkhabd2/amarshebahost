
"use client";

import { useState, useEffect } from "react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection, query, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, Image as ImageIcon, Type, FileText, Link2, Palette, ShoppingCart } from "lucide-react";

const DEFAULT_CONTENT: Record<string, string> = {
  "website_logo_url": "",
  "website_favicon_url": "",
  "hero_headline": "Fast, Secure &\nReliable Hosting",
  "hero_subheadline": "Empower your online presence with ultra-fast servers, 99.9% uptime, and premium support. Start your journey with AmarShebaHost today.",
  "hero_image_url": "https://picsum.photos/seed/hosting1/1200/800",
  "hero_signin_url": "#",
  "hero_signup_url": "#",
  "about_headline": "Reliable Web Hosting\nBorn in Bangladesh",
  "about_desc_1": "AmarShebaHost was founded with a single mission: to provide high-quality, world-class hosting solutions at affordable prices for the Bangladeshi market.",
  "about_desc_2": "With our servers located in strategic global data centers and a local support team ready to assist you in Bengali and English.",
  "about_image_url": "https://picsum.photos/seed/hosting2/800/600",
  "service_hosting_url": "#pricing",
  "service_reseller_url": "#pricing",
  "service_vps_url": "#pricing",
  "service_domain_url": "#pricing",
  "service_bdix_url": "#pricing"
};

/**
 * AdminContent Component
 * Manages branding, Hero, About, and Service CTA links.
 */
export default function AdminContent() {
  const db = useFirestore();
  const [formData, setFormData] = useState<Record<string, string>>(DEFAULT_CONTENT);

  const contentQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "websiteContentBlocks"));
  }, [db]);

  const { data: blocks, isLoading } = useCollection(contentQuery);

  useEffect(() => {
    if (blocks) {
      const data: Record<string, string> = { ...DEFAULT_CONTENT };
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
        <p className="text-muted-foreground">Manage your site branding, text, and images.</p>
      </div>

      {/* Branding Section */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Site Branding</CardTitle>
              <CardDescription>Upload your logo and favicon URLs.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Logo URL (Replaces Text Logo)</Label>
              <div className="flex gap-2">
                <Input 
                  value={formData["website_logo_url"]} 
                  onChange={(e) => handleUpdate("website_logo_url", e.target.value)}
                  placeholder="https://.../logo.png"
                  className="rounded-xl h-12"
                />
                {formData["website_logo_url"] && (
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img src={formData["website_logo_url"]} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>
              <Button onClick={() => saveBlock("website_logo_url", "Website Logo Image URL")} size="sm" className="gradient-blue gap-2 rounded-lg">
                <Save className="w-4 h-4" /> Save Logo
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Favicon URL</Label>
              <div className="flex gap-2">
                <Input 
                  value={formData["website_favicon_url"]} 
                  onChange={(e) => handleUpdate("website_favicon_url", e.target.value)}
                  placeholder="https://.../favicon.ico"
                  className="rounded-xl h-12"
                />
                {formData["website_favicon_url"] && (
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img src={formData["website_favicon_url"]} alt="Favicon Preview" className="w-6 h-6 object-contain" />
                  </div>
                )}
              </div>
              <Button onClick={() => saveBlock("website_favicon_url", "Website Favicon URL")} size="sm" className="gradient-blue gap-2 rounded-lg">
                <Save className="w-4 h-4" /> Save Favicon
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Section Management */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Manage text, image, and login/register links.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Main Headline</Label>
              <Input 
                value={formData["hero_headline"]} 
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
                  value={formData["hero_image_url"]} 
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/20 rounded-2xl border border-dashed">
             <div className="space-y-2">
              <Label className="flex items-center gap-2"><Link2 className="w-4 h-4" /> Sign In URL</Label>
              <Input 
                value={formData["hero_signin_url"]} 
                onChange={(e) => handleUpdate("hero_signin_url", e.target.value)}
                placeholder="https://..."
                className="rounded-xl"
              />
              <Button onClick={() => saveBlock("hero_signin_url", "Hero Sign In Link")} size="sm" variant="outline" className="gap-2 rounded-lg">
                <Save className="w-4 h-4" /> Save Sign In URL
              </Button>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Link2 className="w-4 h-4" /> Sign Up URL</Label>
              <Input 
                value={formData["hero_signup_url"]} 
                onChange={(e) => handleUpdate("hero_signup_url", e.target.value)}
                placeholder="https://..."
                className="rounded-xl"
              />
              <Button onClick={() => saveBlock("hero_signup_url", "Hero Sign Up Link")} size="sm" variant="outline" className="gap-2 rounded-lg">
                <Save className="w-4 h-4" /> Save Sign Up URL
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sub-headline Description</Label>
            <Textarea 
              value={formData["hero_subheadline"]} 
              onChange={(e) => handleUpdate("hero_subheadline", e.target.value)}
              placeholder="Empower your online presence..."
              className="rounded-xl min-h-[100px]"
            />
            <Button onClick={() => saveBlock("hero_subheadline", "Hero section description text")} size="sm" className="gradient-blue gap-2 rounded-lg">
              <Save className="w-4 h-4" /> Save Description
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Service Links Management */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Service Buy Links</CardTitle>
              <CardDescription>Manage where the "Buy Now" buttons in the info section lead.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Web Hosting Buy URL</Label>
              <Input 
                value={formData["service_hosting_url"]} 
                onChange={(e) => handleUpdate("service_hosting_url", e.target.value)}
                className="rounded-xl"
              />
              <Button onClick={() => saveBlock("service_hosting_url", "Service Hosting Buy URL")} size="sm" variant="outline" className="rounded-lg">
                <Save className="w-4 h-4 mr-2" /> Save Link
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Reseller Hosting Buy URL</Label>
              <Input 
                value={formData["service_reseller_url"]} 
                onChange={(e) => handleUpdate("service_reseller_url", e.target.value)}
                className="rounded-xl"
              />
              <Button onClick={() => saveBlock("service_reseller_url", "Service Reseller Buy URL")} size="sm" variant="outline" className="rounded-lg">
                <Save className="w-4 h-4 mr-2" /> Save Link
              </Button>
            </div>
            <div className="space-y-2">
              <Label>VPS Hosting Buy URL</Label>
              <Input 
                value={formData["service_vps_url"]} 
                onChange={(e) => handleUpdate("service_vps_url", e.target.value)}
                className="rounded-xl"
              />
              <Button onClick={() => saveBlock("service_vps_url", "Service VPS Buy URL")} size="sm" variant="outline" className="rounded-lg">
                <Save className="w-4 h-4 mr-2" /> Save Link
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Domain Registration Buy URL</Label>
              <Input 
                value={formData["service_domain_url"]} 
                onChange={(e) => handleUpdate("service_domain_url", e.target.value)}
                className="rounded-xl"
              />
              <Button onClick={() => saveBlock("service_domain_url", "Service Domain Buy URL")} size="sm" variant="outline" className="rounded-lg">
                <Save className="w-4 h-4 mr-2" /> Save Link
              </Button>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>BDIX Hosting / RDP Buy URL</Label>
              <Input 
                value={formData["service_bdix_url"]} 
                onChange={(e) => handleUpdate("service_bdix_url", e.target.value)}
                className="rounded-xl"
              />
              <Button onClick={() => saveBlock("service_bdix_url", "Service BDIX Buy URL")} size="sm" variant="outline" className="rounded-lg">
                <Save className="w-4 h-4 mr-2" /> Save Link
              </Button>
            </div>
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
                value={formData["about_headline"]} 
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
                  value={formData["about_image_url"]} 
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
              value={formData["about_desc_1"]} 
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
              value={formData["about_desc_2"]} 
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
