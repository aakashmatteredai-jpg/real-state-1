"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { label: "Home", targetId: "home" },
  { label: "Projects", targetId: "transactions" },
  { label: "About Us", targetId: "about" },
  { label: "Contact", targetId: "contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "WhatsApp", href: "https://wa.me/912249688200" },
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  function handleNavigate(targetId: string) {
    setIsMenuOpen(false);

    window.setTimeout(() => {
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.getElementById(targetId);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 220);
  }

  return (
    <section
      id="home"
      ref={container}
      className="relative min-h-screen overflow-hidden flex flex-col"
    >
      {/* Full-bleed background image with parallax */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
      >
        <Image
          src="/hero.jpg"
          alt="Luxury House"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        {/* Subtle dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-16 py-8">
        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className="nav-item cursor-pointer border-0 bg-transparent p-0 text-2xl font-semibold tracking-tight text-white md:text-3xl"
        >
          Rialta
        </button>
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="hero-menu-overlay"
          onClick={() => setIsMenuOpen(true)}
          className="nav-item border-0 bg-transparent p-0 text-white transition-colors hover:text-yellow-400"
        >
          <Menu size={30} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Hero Content — centered vertically and horizontally */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center text-white px-6 md:px-12 pb-24">
        {/* Label */}
        <div className="hero-label flex items-center justify-center gap-3 mb-6 opacity-90">
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em]">
            Luxury Property Advisory In India
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        </div>

        {/* Title */}
        <h1 className="hero-title text-[42px] md:text-[64px] lg:text-[84px] font-medium tracking-[-0.02em] leading-[1.05] mb-6 max-w-5xl">
          Modern homes and smarter deals for Indian city living
        </h1>

        {/* Subtitle */}
        <p className="hero-sub text-[16px] md:text-[20px] text-white/80 max-w-[600px] mx-auto leading-relaxed">
          Explore curated residences across Mumbai, Bengaluru, Gurugram, Goa,
          <br className="hidden md:block" />
          and Hyderabad with calm advisory from shortlist to registry.
        </p>
      </div>

      <div
        id="hero-menu-overlay"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-[120] text-[#151515] transition-opacity duration-500 ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 border-0 bg-black/28 p-0 backdrop-blur-[2px] transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="flex h-full justify-end">
          <div
            role="dialog"
            aria-modal="true"
            className={`relative flex h-full w-full max-w-[410px] flex-col bg-[#faf8f4] px-6 py-6 shadow-[-24px_0_70px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-out md:px-10 md:py-8 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-start justify-end">
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="border-0 bg-transparent p-0 text-lg font-semibold tracking-tight text-[#151515] transition-colors hover:text-rialta-tan"
              >
                Close
              </button>
            </div>

            <div className="mt-6 flex flex-1 flex-col justify-between gap-10 lg:mt-10">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavigate(item.targetId)}
                    className="group block border-0 bg-transparent p-0 text-left text-[clamp(3.25rem,9vw,5.75rem)] font-medium leading-[0.9] tracking-[-0.08em] text-[#202020] transition-colors hover:text-rialta-tan"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="space-y-3 pb-2">
                <p className="text-sm font-semibold leading-tight text-[#151515]">
                  Follow us on:
                </p>
                <div className="flex flex-col items-start gap-1 text-[15px] font-medium text-[#555]">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-[#151515]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
