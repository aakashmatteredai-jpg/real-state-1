"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax effect on background image
    gsap.to(bgImageRef.current, {
      y: -80,
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
      duration: 0.8,
      stagger: 0.1,
    })
      .from(
        ".hero-label",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        ".hero-title",
        {
          y: 50,
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      )
      .from(
        ".hero-sub",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-screen overflow-hidden flex flex-col"
    >
      {/* Full-bleed background image with parallax */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
      >
        <img
          src="/hero.jpg"
          alt="Luxury House"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        {/* Subtle dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-16 py-8">
        <div className="nav-item text-2xl md:text-3xl font-semibold tracking-tight text-white cursor-pointer">
          Rialta
        </div>
        <button className="nav-item text-white hover:text-yellow-400 transition-colors">
          <Menu size={30} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Hero Content — centered vertically and horizontally */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center text-white px-6 md:px-12 pb-24">
        {/* Label */}
        <div className="hero-label flex items-center justify-center gap-3 mb-6 opacity-90">
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em]">
            Trusted Property Expertise
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        </div>

        {/* Title */}
        <h1 className="hero-title text-[42px] md:text-[64px] lg:text-[84px] font-medium tracking-[-0.02em] leading-[1.05] mb-6 max-w-5xl">
          Elevated Real Estate Experience
        </h1>

        {/* Subtitle */}
        <p className="hero-sub text-[16px] md:text-[20px] text-white/80 max-w-[600px] mx-auto leading-relaxed">
          Explore curated properties with our expert support
          <br className="hidden md:block" />
          and a smooth journey from search to closing.
        </p>
      </div>
    </section>
  );
}