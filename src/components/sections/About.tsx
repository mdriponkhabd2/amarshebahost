
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export function About() {
  const aboutImage = PlaceHolderImages.find(img => img.id === "about-support");

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
          <Image
            src={aboutImage?.imageUrl || ""}
            alt={aboutImage?.description || "About Us"}
            width={600}
            height={500}
            className="relative rounded-[2rem] shadow-2xl object-cover"
            data-ai-hint="customer support"
          />
        </div>
        
        <div>
          <h2 className="text-4xl font-bold mb-8 leading-tight">
            Reliable Web Hosting <br />
            <span className="text-primary">Born in Bangladesh</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            AmarShebaHost was founded with a single mission: to provide high-quality, world-class hosting solutions at affordable prices for the Bangladeshi market. We understand the local ecosystem better than anyone else.
          </p>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            With our servers located in strategic global data centers and a local support team ready to assist you in Bengali and English, we ensure your online journey is smooth, secure, and successful.
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
