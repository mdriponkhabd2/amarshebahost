
"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";

export function About() {
  const db = useFirestore();
  const aboutPlaceholder = PlaceHolderImages.find(img => img.id === "about-support");

  const contentQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "websiteContentBlocks"));
  }, [db]);

  const { data: blocks } = useCollection(contentQuery);

  const getBlockValue = (key: string, defaultValue: string) => {
    return blocks?.find(b => b.id === key)?.value || defaultValue;
  };

  const headline = getBlockValue("about_headline", "Reliable Web Hosting\nBorn in Bangladesh");
  const desc1 = getBlockValue("about_desc_1", "AmarShebaHost was founded with a single mission: to provide high-quality, world-class hosting solutions at affordable prices for the Bangladeshi market. We understand the local ecosystem better than anyone else.");
  const desc2 = getBlockValue("about_desc_2", "With our servers located in strategic global data centers and a local support team ready to assist you in Bengali and English, we ensure your online journey is smooth, secure, and successful.");
  const imageUrl = getBlockValue("about_image_url", aboutPlaceholder?.imageUrl || "");

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="About Us"
              className="relative w-full h-auto rounded-[2rem] shadow-2xl object-cover"
            />
          ) : (
            <div className="relative w-full h-[500px] bg-muted rounded-[2rem] flex items-center justify-center">
              <Headphones className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-4xl font-bold mb-8 leading-tight whitespace-pre-line">
            {headline}
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            {desc1}
          </p>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            {desc2}
          </p>
          
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-sm font-medium">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm font-medium">Local Support</div>
            </div>
          </div>
          
          <Button size="lg" className="gradient-blue shadow-lg px-8">
            Learn More About Us
          </Button>
        </div>
      </div>
    </section>
  );
}
