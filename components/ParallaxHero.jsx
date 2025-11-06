"use client";

import React, { useRef } from "react";
import { ReactLenis } from "lenis/react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

// Height for the scrolling section. Adjust to control the speed of the parallax effect.
const SECTION_HEIGHT = 1500;

// List of images used in the parallax sequence. Each entry controls the
// starting and ending translation on the Y axis as the user scrolls.
const HERO_IMAGES = [
  {
    src: "/hero/Meta.abstract.webp",
    alt: "Meta abstracta",
    start: -200,
    end: 200,
    className: "w-1/3"
  },
  {
    src: "/hero/Tech.webp",
    alt: "Tecnología",
    start: 200,
    end: -250,
    className: "mx-auto w-2/3"
  },
  {
    src: "/hero/Virtual.webp",
    alt: "Virtual",
    start: -200,
    end: 200,
    className: "ml-auto w-1/3"
  },
  {
    src: "/hero/WhatsAppvibe.webp",
    alt: "WhatsApp vibe",
    start: 0,
    end: -500,
    className: "ml-24 w-5/12"
  }
];

/**
 * ParallaxHero renders the landing page hero section with a static universe
 * background and multiple images that move at different speeds as the user
 * scrolls. A call‑to‑action sits on top of the parallax effect inviting users
 * to start a conversation on WhatsApp.
 */
export default function ParallaxHero() {
  return (
    <div className="relative overflow-hidden">
      <ReactLenis root options={{ lerp: 0.05 }}>
        {/* Scrolling region containing the background and parallax images */}
        <div
          style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
          className="relative w-full"
        >
          <CenterImage />
          <ParallaxImages />
          {/* Gradient at the bottom to blend into the next section */}
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-secondary" />
        </div>
        {/* Overlay with copy and call to action */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="pointer-events-auto text-4xl md:text-6xl font-extrabold leading-tight">
            Impulsa tu negocio con Abraxas
          </h1>
          <p className="pointer-events-auto mt-4 max-w-xl text-base md:text-lg text-white/80">
            Automatizaciones de WhatsApp, diseño web y optimización Meta para vender más y mejor.
          </p>
          <a
            href="https://wa.me/541126693072"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-secondary font-semibold shadow-lg ring-2 ring-white/20 hover:scale-105 transition-transform"
          >
            Comienza ahora
          </a>
        </div>
      </ReactLenis>
    </div>
  );
}

/**
 * CenterImage renders the central universe background and handles its
 * transform/clip as the user scrolls. The image zooms and fades out
 * gradually for an immersive effect.
 */
function CenterImage() {
  const { scrollY } = useScroll();
  // Control the polygon clip to create a shrinking window
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  // Zoom out effect
  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  // Fade out effect
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );
  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(/hero/Fondo_universo_BG.webp)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    />
  );
}

/**
 * ParallaxImages iterates over the HERO_IMAGES array and renders each image
 * with its own parallax animation. The effect is achieved by translating
 * the images along the Y axis as the page scrolls.
 */
function ParallaxImages() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px] relative z-10">
      {HERO_IMAGES.map(({ src, alt, start, end, className }, index) => (
        <ParallaxImg
          key={index}
          src={src}
          alt={alt}
          start={start}
          end={end}
          className={className}
        />
      ))}
    </div>
  );
}

/**
 * ParallaxImg is a reusable component for individual images in the parallax
 * sequence. It uses Framer Motion hooks to calculate opacity, scale and
 * translation based on scroll position.
 */
function ParallaxImg({ src, alt, start, end, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${-end}px`]
  });
  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;
  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={{ transform, opacity }}
    />
  );
}