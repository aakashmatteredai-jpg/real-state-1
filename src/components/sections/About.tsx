"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import SectionLabel from "../SectionLabel";

const stats = [
  { value: "14+", label: "Years In Advisory" },
  { value: "18+", label: "Indian Cities Covered" },
  { value: "₹1,200 Cr+", label: "Closed Deal Value" },
];

const testimonials = [
  {
    name: "Aditi Kapoor",
    role: "Founder, Kapoor Studio",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    text: "Rialta helped us compare South Mumbai options without the usual pressure. Their pricing guidance and builder checks saved us weeks of uncertainty.",
  },
  {
    name: "Rohan Malhotra",
    role: "Director, Malhotra Foods",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    text: "From shortlist to negotiation, the team stayed practical and sharp. We closed our Gurugram home at the right value and with zero chaos.",
  },
  {
    name: "Priya Nair",
    role: "Nair Real Assets",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    text: "Their investor review for Bengaluru rentals was exactly what we needed: realistic yields, better micro-market advice, and cleaner paperwork support.",
  },
  {
    name: "Arjun Menon",
    role: "Product Lead, Fintech",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    text: "Rialta turned a confusing relocation into a smooth move. They understood commute, school zones, and lifestyle needs in a very grounded way.",
  },
  {
    name: "Neha Bansal",
    role: "Partner, Bansal Holdings",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    text: "We use Rialta whenever we need quick clarity on premium residential opportunities. Their team balances numbers, design quality, and legal diligence well.",
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
    <section id="about" ref={container} className="py-16 bg-[#FAF9F6]">
      <div className="section-container">
        <div className="bg-[#EEF2F8] rounded-3xl pt-14 pb-10 overflow-hidden">

          {/* Top grid — padded */}
          <div className="px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-14">

            {/* Left: text + CTAs */}
            <div className="about-content">
              <SectionLabel>About Rialta India</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-semibold text-rialta-navy leading-tight mb-6">
                Local insight for India&apos;s premium home buyers and sellers
              </h2>
              <p className="text-rialta-navy/60 text-base leading-relaxed mb-4">
                Founded in 2011, Rialta has grown into a trusted advisory for
                premium residential transactions across Mumbai, Bengaluru,
                Gurugram, Hyderabad, Pune, Goa, and other fast-moving urban
                markets. Our team combines brokerage experience with pricing,
                design, and documentation expertise.
              </p>
              <p className="text-rialta-navy/60 text-base leading-relaxed mb-10">
                We believe Indian real estate should feel less opaque and more
                intentional, with better neighbourhood context, cleaner
                negotiations, and advice that matches the way families,
                founders, and investors actually make decisions.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 border border-rialta-navy/30 rounded-full text-rialta-navy text-sm font-medium hover:bg-rialta-navy/5 transition-colors">
                  Explore Homes
                </button>
                <button className="btn-premium flex items-center gap-2 group px-6 py-3 rounded-full text-sm">
                  Book Consultation
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
