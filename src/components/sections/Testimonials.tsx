
import { Star } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const reviews = [
  {
    name: "Ahmed Karim",
    role: "E-commerce Owner",
    content: "Switching to AmarShebaHost was the best decision for my online store. The loading speed improved significantly, and the support team is incredible!",
    image: PlaceHolderImages.find(img => img.id === "user-1"),
    rating: 5,
  },
  {
    name: "Sumaiya Akhter",
    role: "Professional Blogger",
    content: "Affordable, reliable, and super easy to use. I love the local support in Bengali. Highly recommended for anyone starting their blog.",
    image: PlaceHolderImages.find(img => img.id === "user-2"),
    rating: 5,
  },
  {
    name: "Tanvir Hasan",
    role: "Agency Founder",
    content: "We host over 20 client websites with them. Their uptime is unmatched and the control panel is very user-friendly.",
    image: PlaceHolderImages.find(img => img.id === "user-3"),
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-accent/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg">Trusted by thousands of businesses across Bangladesh.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-border/50 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg italic text-foreground mb-8">"{review.content}"</p>
              </div>
              <div className="flex items-center gap-4 border-t pt-6">
                <Image 
                  src={review.image?.imageUrl || ""} 
                  alt={review.name}
                  width={48}
                  height={48}
                  className="rounded-full shadow-inner"
                />
                <div>
                  <div className="font-bold text-base">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
