"use client";

import React from "react";

/**
 * FloatingNeonWhatsApp renders a fixed neon button at the bottom right
 * corner of the screen linking to WhatsApp Business. The neon glow
 * intensifies on hover to draw the user's attention.
 */
export default function FloatingNeonWhatsApp() {
  return (
    <a
      href="https://wa.me/541126693072"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Business"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Outer glow */}
      <span className="absolute inset-0 rounded-full blur-2xl bg-primary/30 group-hover:bg-primary/50 transition duration-300" />
      {/* Button */}
      <span className="relative inline-flex items-center justify-center p-3 rounded-full bg-primary text-secondary font-semibold shadow-lg ring-2 ring-white/50 group-hover:scale-105 transition duration-300">
        <img src="/images/whatsapp-logo.png" alt="WhatsApp Business" className="h-6 w-6" />
      </span>
    </a>
  );
}