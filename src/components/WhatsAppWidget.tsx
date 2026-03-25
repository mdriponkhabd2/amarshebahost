
"use client";

import { MessageCircle } from "lucide-react";

/**
 * WhatsAppWidget Component
 * Provides a floating WhatsApp chat button for live support.
 */
export function WhatsAppWidget() {
  const phoneNumber = "8801977679962";
  const message = "Hello AmarShebaHost! I have a question about your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-9 h-9" />
      {/* Tooltip hint */}
      <span className="absolute right-full mr-4 px-4 py-2 bg-white text-black text-sm font-bold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border/50">
        Chat with Support
      </span>
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
    </a>
  );
}
