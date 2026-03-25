
"use client";

import { 
  ShieldCheck, 
  RotateCcw, 
  RefreshCcw, 
  Download, 
  Zap, 
  HardDrive, 
  Lock, 
  MessageSquare,
  Clock
} from "lucide-react";

/**
 * WhyChooseUs Component
 * Displays the detailed features and benefits of the hosting service.
 */
const reasons = [
  {
    title: "Money Back Guarantee",
    description: "We have 30 Days moneyback guarantee, so you can try our service without any risk. We'll refund you if you're not satisfied. Your satisfaction is our top priority.",
    icon: RotateCcw,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Free Data Migration",
    description: "You can transfer your web hosting data from your previous hosting company to us. Our team can move your site to us. We offer free website data migration.",
    icon: RefreshCcw,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Softaculous script installer",
    description: "Instantly install scripts such as Wordpress in 3 easy to follow steps. Lots of software including Wordpress more then 451+. Easy to install softaculous tool.",
    icon: Download,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Website Security",
    description: "Stop malware before it gets a chance to infect your site. We scan your site all content daily and automatically remove any detected malware. It's fully free.",
    icon: ShieldCheck,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "99.9% Uptime Guarantee",
    description: "We understand the uptime importance. Our servers are optimized with the latest software and are only hosted within the best datacenters, allowing us to achieve our 99.9% uptime guarantee.",
    icon: Clock,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "High Performance SSD Servers",
    description: "We use only top of the line server hardware, and this reflects in the quality service that we provide. We are using Enterprise NVMe SSD hard drives in a Raid array to give your site that extra speed boost!",
    icon: HardDrive,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Free SSL Certificate",
    description: "Our all web hosting plan Life-time FREE Let's Encrypt SSL certificates with just a few clicks in your cPanel/Directadmin. Secure your customer data and improve SEO ranking by using this limited time offer!",
    icon: Lock,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Live support",
    description: "We provide office hours live chat support via facebook messenger, whatsapp, live chat, Call Support. Speak to our staff live in (GMT+6) 10AM - 9PM, 24/7 Ticket support and they will be happy to help.",
    icon: MessageSquare,
    color: "bg-cyan-100 text-cyan-600",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Why Choose AmarShebaHost?</h2>
          <p className="text-muted-foreground text-lg">
            Experience world-class hosting with features designed for your online success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-[2rem] border border-border/50 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group hover:shadow-xl shadow-sm bg-white"
            >
              <div className={`w-14 h-14 rounded-2xl ${reason.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                <reason.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
