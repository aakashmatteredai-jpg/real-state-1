"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const houseImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax effect for the house image
    gsap.to(houseImageRef.current, {
      y: -50,
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
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1");
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen bg-rialta-navy overflow-hidden flex flex-col items-center pt-32">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 md:px-16">
        <div className="nav-item text-3xl font-bold tracking-tight text-white cursor-pointer transition-opacity hover:opacity-80">
          Rialta
        </div>
        <div className="flex items-center gap-8">
          <button className="nav-item text-white hover:text-rialta-tan transition-colors">
            <Menu size={32} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white w-full px-6 md:px-12 mb-16 pt-10">
        <div className="hero-label flex items-center justify-center gap-3 mb-8 opacity-80">
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em]">
            Trusted Property Expertise
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
        </div>
        
        <h1 className="hero-title text-4xl md:text-5xl lg:text-[76px] font-medium tracking-tight leading-tight mb-8">
          Elevated Real Estate Experience
        </h1>
        
        <p className="hero-sub text-base md:text-[20px] text-white/80 max-w-[550px] mx-auto leading-relaxed">
          Explore curated properties with our expert support<br className="hidden md:block"/> and a smooth journey from search to closing.
        </p>
      </div>

      {/* Primary House Image Container - Matching Screenshot 2 */}
      <div ref={houseImageRef} className="hero-image-container relative z-10 w-full mt-auto">
        <div className="w-full aspect-[4/3] md:aspect-[21/9]">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Pool House"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
