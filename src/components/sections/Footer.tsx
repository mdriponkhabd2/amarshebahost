
"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Globe, Mail, Phone, MapPin } from "lucide-react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";

export function Footer() {
  const db = useFirestore();
  const contentQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "websiteContentBlocks"));
  }, [db]);

  const { data: blocks } = useCollection(contentQuery);

  const getVal = (key: string, def: string) => blocks?.find(b => b.id === key)?.value || def;

  const fb = getVal("social_facebook_url", "#");
  const tw = getVal("social_twitter_url", "#");
  const ig = getVal("social_instagram_url", "#");
  const li = getVal("social_linkedin_url", "#");
  const paymentImg = getVal("payment_methods_image_url", "https://images.unsplash.com/photo-1556742049-0ad745665771?q=80&w=1000&auto=format&fit=crop");

  return (
    <footer id="contact" className="bg-foreground text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">
                AmarSheba<span className="text-primary">Host</span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed">
              Premium web hosting provider in Bangladesh. Empowering thousands of small and large businesses to succeed online.
            </p>
            <div className="flex gap-4">
              <a href={fb} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={tw} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={ig} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={li} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="https://host.amarshebahost.com/knowledgebase.php" className="hover:text-white transition-colors">Knowledge Base</Link></li>
              <li><Link href="https://host.amarshebahost.com/submitticket.php" className="hover:text-white transition-colors">Submit a Ticket</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@amarshebahost.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+880 1977-679962</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span>92 Shahid Faruk Road, near Tony Power, South Jatrabari, Dhaka-1204, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods Section */}
        {paymentImg && (
          <div className="border-t border-white/10 pt-10 pb-6">
            <h5 className="text-xl font-bold mb-6 tracking-wide uppercase opacity-70">We Accepted</h5>
            <div className="relative w-full max-w-4xl h-24 md:h-32">
              <Image 
                src={paymentImg} 
                alt="Accepted Payment Methods" 
                fill 
                className="object-contain object-left"
              />
            </div>
          </div>
        )}

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} AmarShebaHost. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-white/40">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
