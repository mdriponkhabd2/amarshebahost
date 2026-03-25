
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
import { Save, Image as ImageIcon, Type, FileText, Link2, Palette, ShoppingCart, Share2, CreditCard } from "lucide-react";

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
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gradient">Website Content Manager</h1>
        <p className="text-muted-foreground">Manage branding, social links, policies, and payment icons.</p>
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
              <CardDescription>Logo, Favicon and Payment Icons.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input value={formData["website_logo_url"]} onChange={(e) => handleUpdate("website_logo_url", e.target.value)} className="rounded-xl" placeholder="https://your-logo-link.png" />
              <Button onClick={() => saveBlock("website_logo_url", "Logo URL")} size="sm" className="gradient-blue rounded-lg">Save Logo</Button>
            </div>
            <div className="space-y-2">
              <Label>Payment Methods Image URL</Label>
              <Input value={formData["payment_methods_image_url"]} onChange={(e) => handleUpdate("payment_methods_image_url", e.target.value)} className="rounded-xl" placeholder="https://link-to-payment-icons.png" />
              <Button onClick={() => saveBlock("payment_methods_image_url", "Payment methods image")} size="sm" className="gradient-blue rounded-lg">Save Payment Icons</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <CardTitle>Social Media Links</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
            <div key={social} className="space-y-2">
              <Label className="capitalize">{social} URL</Label>
              <Input 
                value={formData[`social_${social}_url`]} 
                onChange={(e) => handleUpdate(`social_${social}_url`, e.target.value)} 
                className="rounded-xl"
                placeholder={`https://${social}.com/yourprofile`}
              />
              <Button onClick={() => saveBlock(`social_${social}_url`, `${social} social link`)} size="sm" variant="outline" className="rounded-lg">Save {social}</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Policies */}
      <Card className="rounded-[2.5rem] shadow-sm border-border/50 bg-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <CardTitle>Policy Pages</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Privacy Policy Content</Label>
            <Textarea value={formData["privacy_policy_content"]} onChange={(e) => handleUpdate("privacy_policy_content", e.target.value)} className="min-h-[150px] rounded-xl" />
            <Button onClick={() => saveBlock("privacy_policy_content", "Privacy policy text")} size="sm" className="gradient-blue rounded-lg">Save Privacy Policy</Button>
          </div>
          <div className="space-y-2">
            <Label>Refund Policy Content</Label>
            <Textarea value={formData["refund_policy_content"]} onChange={(e) => handleUpdate("refund_policy_content", e.target.value)} className="min-h-[150px] rounded-xl" />
            <Button onClick={() => saveBlock("refund_policy_content", "Refund policy text")} size="sm" className="gradient-blue rounded-lg">Save Refund Policy</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
