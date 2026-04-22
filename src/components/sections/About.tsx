"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import SectionLabel from "../SectionLabel";

const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "40+", label: "Cities Covered" },
  { value: "500+", label: "Properties Sold" },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Mitchell Ventures",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    text: "Rialta made the entire buying journey effortless. Their deep market knowledge and white-glove service perfectly aligned with what we needed.",
  },
  {
    name: "James Harlow",
    role: "Harlow Group",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    text: "Since working with Rialta, every property transaction feels transformed. Their attention isn't just aesthetic — it enhances outcomes every time.",
  },
  {
    name: "Priya Nair",
    role: "Nair Real Assets",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    text: "Rialta delivered beyond expectations. Their innovative approach and dedication made the entire experience truly exceptional. Highly recommended.",
  },
  {
    name: "Tom Brennan",
    role: "Brennan Estates",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    text: "A game-changing experience from start to finish. Rialta turned our vision into reality with precision, creativity, and deep market expertise.",
  },
  {
    name: "Leila Osman",
    role: "Osman Property Group",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    text: "Working with Rialta felt like having a trusted partner every step of the way. Professional, attentive, and genuinely invested in our success.",
  },
];

// Duplicate for seamless infinite loop
const allCards = [...testimonials, ...testimonials];

export default function About() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    gsap.from(".about-content > *", {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
    });

    gsap.from(".stat-card", {
      scale: 0.92,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 75%",
      },
    });
  }, { scope: container });

  // Infinite marquee scroll
  useEffect(() => {
    const inner = marqueeInnerRef.current;
    if (!inner) return;

    // Width of one set of cards (half the total, since we duplicated)
    const totalWidth = inner.scrollWidth / 2;

    animRef.current = gsap.to(inner, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    // Pause on hover
    const el = marqueeRef.current;
    const pause = () => animRef.current?.pause();
    const resume = () => animRef.current?.play();
    el?.addEventListener("mouseenter", pause);
    el?.addEventListener("mouseleave", resume);

    return () => {
      el?.removeEventListener("mouseenter", pause);
      el?.removeEventListener("mouseleave", resume);
      animRef.current?.kill();
    };
  }, []);

  return (
    <section ref={container} className="py-16 bg-[#FAF9F6]">
      <div className="section-container">
        <div className="bg-[#EEF2F8] rounded-3xl pt-14 pb-10 overflow-hidden">

          {/* Top grid — padded */}
          <div className="px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-14">

            {/* Left: text + CTAs */}
            <div className="about-content">
              <SectionLabel>About Rialta</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-semibold text-rialta-navy leading-tight mb-6">
                A Boutique Approach to Property Sales
              </h2>
              <p className="text-rialta-navy/60 text-base leading-relaxed mb-4">
                Founded in 2012, Rialta has established itself as a leader in
                premium residential and commercial real estate. Our curated team
                of agents, analysts, and advisors brings deep expertise to every
                transaction.
              </p>
              <p className="text-rialta-navy/60 text-base leading-relaxed mb-10">
                We believe real estate should not only be transactional but
                transformative — reflecting the identity and ambitions of each
                client we serve.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 border border-rialta-navy/30 rounded-full text-rialta-navy text-sm font-medium hover:bg-rialta-navy/5 transition-colors">
                  Explore Properties
                </button>
                <button className="btn-premium flex items-center gap-2 group px-6 py-3 rounded-full text-sm">
                  Get In Touch
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: stats */}
            <div className="stats-grid grid grid-cols-2 gap-4">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label} className="stat-card bg-white rounded-2xl p-8 text-center shadow-sm">
                  <p className="text-5xl font-semibold text-rialta-navy mb-2">{s.value}</p>
                  <p className="text-rialta-navy/50 text-sm">{s.label}</p>
                </div>
              ))}
              <div className="stat-card col-span-2 bg-white rounded-2xl p-8 text-center shadow-sm">
                <p className="text-5xl font-semibold text-rialta-navy mb-2">{stats[2].value}</p>
                <p className="text-rialta-navy/50 text-sm">{stats[2].label}</p>
              </div>
            </div>
          </div>

          {/* Marquee — bleeds edge to edge, no horizontal padding */}
          <div
            ref={marqueeRef}
            className="w-full overflow-hidden cursor-default"
          >
            <div
              ref={marqueeInnerRef}
              className="flex gap-5 w-max"
              style={{ willChange: "transform" }}
            >
              {allCards.map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[320px] bg-white rounded-2xl p-7 shadow-sm flex flex-col gap-5"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-rialta-navy text-sm">{t.name}</p>
                      <p className="text-rialta-navy/40 text-xs">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-rialta-navy/60 text-sm leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}