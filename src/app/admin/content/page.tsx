
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
import { Save, Image as ImageIcon, Type, FileText, Link2, Palette, ShoppingCart, Share2, CreditCard, Globe, Zap, LogIn, Layout } from "lucide-react";

const DEFAULT_CONTENT: Record<string, string> = {
  "website_logo_url": "",
  "website_favicon_url": "",
  "hero_headline": "Fast, Secure &\nReliable Hosting",
  "hero_subheadline": "Empower your online presence with ultra-fast servers, 99.9% uptime, and premium support. Start your journey with AmarShebaHost today.",
  "hero_image_url": "https://picsum.photos/seed/hosting1/1200/800",
  "hero_signin_url": "#",
  "hero_signup_url": "#",
  "service_hosting_url": "#pricing",
  "service_reseller_url": "#pricing",
  "service_vps_url": "#pricing",
  "service_domain_url": "#pricing",
  "service_bdix_url": "#pricing",
  "social_facebook_url": "#",
  "social_twitter_url": "#",
  "social_instagram_url": "#",
  "social_linkedin_url": "#",
  "payment_methods_image_url": "https://images.unsplash.com/photo-1556742049-0ad745665771?q=80&w=1000&auto=format&fit=crop",
  "privacy_policy_content": "Our privacy policy details...",
  "refund_policy_content": "Our refund policy details..."
};

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
    <div className="p-8 max-w-5xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gradient">Website Content Manager</h1>
        <p className="text-muted-foreground">Manage branding, hero content, buttons, and service links in real-time.</p>
      </div>

      {/* Branding Section */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Site Branding & Icons</CardTitle>
              <CardDescription>Update your logo and favicon.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Main Logo URL</Label>
              <Input 
                value={formData["website_logo_url"]} 
                onChange={(e) => handleUpdate("website_logo_url", e.target.value)} 
                className="rounded-xl h-12" 
                placeholder="https://link-to-your-logo.png" 
              />
              <Button onClick={() => saveBlock("website_logo_url", "Website Logo")} className="gradient-blue w-full rounded-xl">Update Logo</Button>
            </div>
            <div className="space-y-3">
              <Label className="flex items-center gap-2"><Globe className="w-4 h-4" /> Favicon URL</Label>
              <Input 
                value={formData["website_favicon_url"]} 
                onChange={(e) => handleUpdate("website_favicon_url", e.target.value)} 
                className="rounded-xl h-12" 
                placeholder="https://link-to-your-favicon.ico" 
              />
              <Button onClick={() => saveBlock("website_favicon_url", "Website Favicon")} variant="outline" className="w-full rounded-xl">Update Favicon</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auth Links (Sign In / Sign Up) */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Authentication Links</CardTitle>
              <CardDescription>Set the URLs for Sign In and Sign Up buttons (Navbar & Hero).</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-4 border rounded-2xl bg-muted/10">
              <Label className="font-bold">Sign In Button URL</Label>
              <Input 
                value={formData["hero_signin_url"]} 
                onChange={(e) => handleUpdate("hero_signin_url", e.target.value)} 
                placeholder="https://client.amarshebahost.com/login"
                className="rounded-xl"
              />
              <Button onClick={() => saveBlock("hero_signin_url", "Sign In Link")} size="sm" className="w-full rounded-xl gradient-blue">Save Sign In Link</Button>
            </div>
            <div className="space-y-3 p-4 border rounded-2xl bg-muted/10">
              <Label className="font-bold">Sign Up Button URL</Label>
              <Input 
                value={formData["hero_signup_url"]} 
                onChange={(e) => handleUpdate("hero_signup_url", e.target.value)} 
                placeholder="https://client.amarshebahost.com/register"
                className="rounded-xl"
              />
              <Button onClick={() => saveBlock("hero_signup_url", "Sign Up Link")} size="sm" className="w-full rounded-xl gradient-blue">Save Sign Up Link</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Content Section */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Layout className="w-5 h-5" />
            </div>
            <CardTitle>Hero Section Content</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-3">
            <Label className="font-bold">Main Headline</Label>
            <Input 
              value={formData["hero_headline"]} 
              onChange={(e) => handleUpdate("hero_headline", e.target.value)} 
              className="rounded-xl font-bold" 
            />
            <Button onClick={() => saveBlock("hero_headline", "Hero Headline")} size="sm" variant="outline" className="rounded-xl">Save Headline</Button>
          </div>
          <div className="space-y-3">
            <Label className="font-bold">Sub-headline Description</Label>
            <Textarea 
              value={formData["hero_subheadline"]} 
              onChange={(e) => handleUpdate("hero_subheadline", e.target.value)} 
              className="rounded-xl min-h-[100px]" 
            />
            <Button onClick={() => saveBlock("hero_subheadline", "Hero Subheadline")} size="sm" variant="outline" className="rounded-xl">Save Description</Button>
          </div>
          <div className="space-y-3">
            <Label className="font-bold">Hero Image URL</Label>
            <Input 
              value={formData["hero_image_url"]} 
              onChange={(e) => handleUpdate("hero_image_url", e.target.value)} 
              placeholder="https://..."
              className="rounded-xl"
            />
            <Button onClick={() => saveBlock("hero_image_url", "Hero Image")} size="sm" variant="outline" className="rounded-xl">Save Hero Image</Button>
          </div>
        </CardContent>
      </Card>

      {/* Service Purchase Links */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Service Purchase Links</CardTitle>
              <CardDescription>Manage the "Buy Now" links for all service categories.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 p-4 border rounded-2xl bg-muted/10">
            <Label className="font-bold flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" /> Web Hosting Buy Link</Label>
            <Input 
              value={formData["service_hosting_url"]} 
              onChange={(e) => handleUpdate("service_hosting_url", e.target.value)} 
              placeholder="https://..."
              className="rounded-xl"
            />
            <Button onClick={() => saveBlock("service_hosting_url", "Web hosting purchase link")} size="sm" className="w-full rounded-xl gradient-blue">Save Link</Button>
          </div>
          <div className="space-y-3 p-4 border rounded-2xl bg-muted/10">
            <Label className="font-bold flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-500" /> Reseller Hosting Buy Link</Label>
            <Input 
              value={formData["service_reseller_url"]} 
              onChange={(e) => handleUpdate("service_reseller_url", e.target.value)} 
              placeholder="https://..."
              className="rounded-xl"
            />
            <Button onClick={() => saveBlock("service_reseller_url", "Reseller purchase link")} size="sm" className="w-full rounded-xl gradient-blue">Save Link</Button>
          </div>
          <div className="space-y-3 p-4 border rounded-2xl bg-muted/10">
            <Label className="font-bold flex items-center gap-2"><Globe className="w-4 h-4 text-purple-500" /> VPS Hosting Buy Link</Label>
            <Input 
              value={formData["service_vps_url"]} 
              onChange={(e) => handleUpdate("service_vps_url", e.target.value)} 
              placeholder="https://..."
              className="rounded-xl"
            />
            <Button onClick={() => saveBlock("service_vps_url", "VPS purchase link")} size="sm" className="w-full rounded-xl gradient-blue">Save Link</Button>
          </div>
          <div className="space-y-3 p-4 border rounded-2xl bg-muted/10">
            <Label className="font-bold flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-500" /> Domain Register Link</Label>
            <Input 
              value={formData["service_domain_url"]} 
              onChange={(e) => handleUpdate("service_domain_url", e.target.value)} 
              placeholder="https://..."
              className="rounded-xl"
            />
            <Button onClick={() => saveBlock("service_domain_url", "Domain registration link")} size="sm" className="w-full rounded-xl gradient-blue">Save Link</Button>
          </div>
          <div className="space-y-3 p-4 border rounded-2xl bg-muted/10 md:col-span-2">
            <Label className="font-bold flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500" /> BDIX Hosting / VPS Buy Link</Label>
            <Input 
              value={formData["service_bdix_url"]} 
              onChange={(e) => handleUpdate("service_bdix_url", e.target.value)} 
              placeholder="https://..."
              className="rounded-xl"
            />
            <Button onClick={() => saveBlock("service_bdix_url", "BDIX service link")} size="sm" className="w-full rounded-xl gradient-blue">Save Link</Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Banner */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <CardTitle>Footer Payment Banner</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-4">
          <Label className="font-bold">Payment Methods Image URL</Label>
          <div className="flex gap-4">
            <Input 
              value={formData["payment_methods_image_url"]} 
              onChange={(e) => handleUpdate("payment_methods_image_url", e.target.value)} 
              className="rounded-xl h-12" 
              placeholder="https://link-to-payment-icons-banner.png" 
            />
            <Button onClick={() => saveBlock("payment_methods_image_url", "Payment methods image")} className="gradient-blue px-8 rounded-xl">Update</Button>
          </div>
          {formData["payment_methods_image_url"] && (
            <div className="mt-4 p-4 bg-muted/20 rounded-2xl border border-dashed flex items-center justify-center">
              <img src={formData["payment_methods_image_url"]} alt="Payment Preview" className="max-h-24 object-contain" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <CardTitle>Social Media Links</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
            <div key={social} className="space-y-3 p-4 border rounded-2xl bg-muted/10">
              <Label className="capitalize font-bold">{social} Profile Link</Label>
              <Input 
                value={formData[`social_${social}_url`]} 
                onChange={(e) => handleUpdate(`social_${social}_url`, e.target.value)} 
                className="rounded-xl"
                placeholder={`https://${social}.com/yourprofile`}
              />
              <Button onClick={() => saveBlock(`social_${social}_url`, `${social} social link`)} size="sm" variant="outline" className="w-full rounded-xl">Save {social}</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Policies */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <CardTitle>Legal & Policy Content</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="space-y-3">
            <Label className="font-bold">Privacy Policy Text</Label>
            <Textarea 
              value={formData["privacy_policy_content"]} 
              onChange={(e) => handleUpdate("privacy_policy_content", e.target.value)} 
              className="min-h-[200px] rounded-2xl p-4" 
            />
            <Button onClick={() => saveBlock("privacy_policy_content", "Privacy policy text")} className="gradient-blue w-full rounded-xl h-12 font-bold">Save Privacy Policy</Button>
          </div>
          <div className="space-y-3 pt-6 border-t">
            <Label className="font-bold">Refund Policy Text</Label>
            <Textarea 
              value={formData["refund_policy_content"]} 
              onChange={(e) => handleUpdate("refund_policy_content", e.target.value)} 
              className="min-h-[200px] rounded-2xl p-4" 
            />
            <Button onClick={() => saveBlock("refund_policy_content", "Refund policy text")} className="gradient-blue w-full rounded-xl h-12 font-bold">Save Refund Policy</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
