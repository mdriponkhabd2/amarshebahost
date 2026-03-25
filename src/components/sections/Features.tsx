
import { 
  Zap, 
  ShieldCheck, 
  Headphones, 
  Layout, 
  Lock, 
  Globe 
} from "lucide-react";

const features = [
  {
    title: "High Speed Servers",
    description: "LiteSpeed powered servers with NVMe SSD storage for blazing fast loading times.",
    icon: Zap,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "99.9% Uptime Guarantee",
    description: "Reliable infrastructure ensures your website is always accessible to visitors.",
    icon: Globe,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "24/7 Premium Support",
    description: "Expert local technical support team available around the clock via chat and phone.",
    icon: Headphones,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Free SSL Certificate",
    description: "Keep your data secure and boost your SEO with free Let's Encrypt SSL.",
    icon: Lock,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "DDoS Protection",
    description: "Enterprise-grade protection against advanced cyber threats and attacks.",
    icon: ShieldCheck,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Easy Control Panel",
    description: "Manage your hosting, emails, and databases easily with intuitive cPanel/DirectAdmin.",
    icon: Layout,
    color: "bg-amber-100 text-amber-600",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-6">Why Choose AmarShebaHost?</h2>
          <p className="text-muted-foreground text-lg">
            We provide everything you need to build and grow your online business with confidence and ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-3xl border border-border/50 hover-lift shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-sm`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
