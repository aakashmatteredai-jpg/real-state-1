"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SectionLabel from "../SectionLabel";

const introImages = [
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    alt: "Modern Villa External",
  },
  {
    url: "https://images.unsplash.com/photo-1600607687940-4e524cb35a36?q=80&w=2070&auto=format&fit=crop",
    alt: "Luxury Poolside",
  },
  {
    url: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=2070&auto=format&fit=crop",
    alt: "Interior Design",
  },
];

export default function Introduction() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".intro-text", {
      y: 40,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });

    gsap.from(".intro-card", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".intro-grid",
        start: "top 75%",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 bg-white">
      <div className="section-container text-center mb-24">
        <div className="flex justify-center">
          <SectionLabel>Introduction</SectionLabel>
        </div>
        <h2 className="intro-text text-3xl md:text-5xl font-medium max-w-4xl mx-auto leading-tight text-rialta-navy">
          Discover a refined approach to real estate where design, data, and trust come together to simplify your journey and elevate every decision.
        </h2>
      </div>

      <div className="intro-grid max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        {introImages.map((img, index) => (
          <div 
            key={index} 
            className={`intro-card overflow-hidden rounded-[3rem] shadow-xl ${
              index === 1 ? "md:h-[600px] -translate-y-8" : "md:h-[500px]"
            }`}
          >
            <img 
              src={img.url} 
              alt={img.alt} 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
