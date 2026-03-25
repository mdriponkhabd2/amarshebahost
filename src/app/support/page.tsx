
"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone, LifeBuoy, FileText, HelpCircle } from "lucide-react";

/**
 * SupportPage Component
 * Provides various support options for customers.
 */
export default function SupportPage() {
  const supportOptions = [
    {
      title: "Submit a Ticket",
      description: "Need technical help? Open a support ticket and our team will get back to you.",
      icon: LifeBuoy,
      action: "Open Ticket",
      url: "https://host.amarshebahost.com/submitticket.php",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Knowledge Base",
      description: "Browse our extensive documentation and tutorials for quick answers.",
      icon: FileText,
      action: "Read Docs",
      url: "https://host.amarshebahost.com/knowledgebase.php",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "WhatsApp Support",
      description: "Get instant help via WhatsApp from our local support agents.",
      icon: MessageSquare,
      action: "Chat Now",
      url: "https://wa.me/8801977679962",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">How can we help you?</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We are here to help you 24/7. Choose an option below to get in touch with our experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, idx) => (
              <Card key={idx} className="rounded-[2.5rem] border-none shadow-xl hover-lift bg-white overflow-hidden">
                <CardHeader className="pt-10 pb-6 text-center">
                  <div className={`w-16 h-16 ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm`}>
                    <option.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-10 text-center space-y-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {option.description}
                  </p>
                  <Button 
                    className="w-full h-12 rounded-xl font-bold gradient-blue"
                    onClick={() => window.open(option.url, "_blank")}
                  >
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-border/50 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Prefer to talk? You can reach us through the following channels. Our average response time for calls is less than 2 minutes.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone Support</div>
                    <div className="font-bold">+880 1977-679962</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email Support</div>
                    <div className="font-bold">support@amarshebahost.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent/30 rounded-[2rem] p-8 text-center border-2 border-dashed border-primary/20">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Check our FAQ section for instant answers to common questions about hosting and billing.
              </p>
              <Button variant="outline" className="rounded-xl px-8 border-2">
                Visit FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
