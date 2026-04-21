"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, Search } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax effect for the image
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
    })
    .from(".hero-label", {
      y: 20,
      opacity: 0,
      duration: 1,
    }, "-=0.5")
    .from(".hero-title", {
      y: 40,
      opacity: 0,
      duration: 1.2,
    }, "-=0.8")
    .from(".hero-sub", {
      y: 30,
      opacity: 0,
      duration: 1,
    }, "-=0.9")
    .from(".hero-image-container", {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
    }, "-=1.2");
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-[110vh] overflow-hidden flex flex-col items-center justify-start pt-32 pb-20">
      {/* Background Image with Parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6191dae10c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-rialta-navy/40" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12">
        <div className="nav-item text-2xl font-bold tracking-tight text-white">Rialta</div>
        <div className="flex items-center gap-6">
          <button className="nav-item text-white hover:text-rialta-tan transition-colors">
            <Search size={24} />
          </button>
          <button className="nav-item text-white hover:text-rialta-tan transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-6 mt-20">
        <span className="hero-label block text-xs font-semibold uppercase tracking-[0.4em] mb-6 opacity-80">
          Trusted Property Expertise
        </span>
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
          Elevated Real Estate Experience
        </h1>
        <p className="hero-sub text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed">
          Explore curated properties with our expert support and a smooth journey from search to closing.
        </p>
      </div>

      {/* The House Image Container in the prompt looks like it's a floating element or full width. 
          In the screenshot it looks like the hero layout has a house image slightly offset or at the bottom.
          I'll stick to a full-bleed feel but with a controlled container below. */}
      <div className="hero-image-container relative z-10 w-full max-w-6xl px-6 mt-16 rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
          alt="Luxury Mansion"
          className="w-full aspect-[16/9] object-cover"
        />
      </div>
    </section>
  );
}
