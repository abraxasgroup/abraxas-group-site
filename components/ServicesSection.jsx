"use client";

import React from "react";
import CyberCard from "./CyberCard";

/**
 * ServicesSection renders a row of 3D cards summarising the key services
 * offered by Abraxas. Each card uses the CyberCard component to achieve
 * a neon cyber aesthetic with interactive tilt.
 */
export default function ServicesSection() {
  const services = [
    {
      title: "PÁGINAS WEB",
      subtitle: "DISEÑO",
      highlight: "A MEDIDA"
    },
    {
      title: "AUTOMATIZACIÓN",
      subtitle: "WHATSAPP",
      highlight: "API OFICIAL"
    },
    {
      title: "OPTIMIZACIÓN",
      subtitle: "META & SEO",
      highlight: "SIN ESFUERZO"
    }
  ];
  return (
    <section className="py-20 px-4 bg-secondary">
      <h2 className="mb-12 text-center text-3xl font-extrabold">Nuestros Servicios</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((s, idx) => (
          <CyberCard
            key={idx}
            title={s.title}
            subtitle={s.subtitle}
            highlight={s.highlight}
          />
        ))}
      </div>
    </section>
  );
}