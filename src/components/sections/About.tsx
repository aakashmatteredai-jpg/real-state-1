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
    <section id="about" ref={container} className="bg-[#FAF9F6] py-10 sm:py-14 md:py-16">
      <div className="section-container">
        <div className="overflow-hidden rounded-[1.5rem] bg-[#EEF2F8] pt-6 pb-4 sm:rounded-[1.75rem] sm:pt-8 sm:pb-6 lg:rounded-3xl lg:pt-14 lg:pb-10">

          {/* Top grid — padded */}
          <div className="mb-6 grid grid-cols-1 items-center gap-6 px-3 sm:mb-8 sm:px-4 md:px-8 lg:mb-14 lg:grid-cols-2 lg:gap-16 lg:px-10">

            {/* Left: text + CTAs */}
            <div className="about-content">
              <SectionLabel>About Rialta India</SectionLabel>
              <h2 className="mb-4 text-[2rem] font-semibold leading-tight text-rialta-navy sm:text-4xl md:mb-6 md:text-5xl">
                Local insight for India&apos;s premium home buyers and sellers
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-rialta-navy/60 sm:text-base">
                Founded in 2011, Rialta has grown into a trusted advisory for
                premium residential transactions across Mumbai, Bengaluru,
                Gurugram, Hyderabad, Pune, Goa, and other fast-moving urban
                markets. Our team combines brokerage experience with pricing,
                design, and documentation expertise.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-rialta-navy/60 sm:mb-10 sm:text-base">
                We believe Indian real estate should feel less opaque and more
                intentional, with better neighbourhood context, cleaner
                negotiations, and advice that matches the way families,
                founders, and investors actually make decisions.
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-4">
                <button className="w-full rounded-full border border-rialta-navy/30 px-5 py-3 text-sm font-medium text-rialta-navy transition-colors hover:bg-rialta-navy/5 sm:w-auto sm:px-6">
                  Explore Homes
                </button>
                <button className="btn-premium group flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm sm:w-auto sm:px-6">
                  Book Consultation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: stats */}
            <div className="stats-grid grid grid-cols-2 gap-2.5 sm:gap-4">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label} className="stat-card rounded-2xl bg-white p-4 text-center shadow-sm sm:p-6 md:p-8">
                  <p className="mb-2 text-[2.2rem] font-semibold leading-none text-rialta-navy sm:text-5xl">{s.value}</p>
                  <p className="text-xs text-rialta-navy/50 sm:text-sm">{s.label}</p>
                </div>
              ))}
              <div className="stat-card col-span-2 rounded-2xl bg-white p-4 text-center shadow-sm sm:p-6 md:p-8">
                <p className="mb-2 text-[2.2rem] font-semibold leading-none text-rialta-navy sm:text-5xl">{stats[2].value}</p>
                <p className="text-xs text-rialta-navy/50 sm:text-sm">{stats[2].label}</p>
              </div>
            </div>
          </div>

          {/* Marquee — bleeds edge to edge, no horizontal padding */}
          <div
            ref={marqueeRef}
            className="w-full cursor-default overflow-hidden px-3 sm:px-4 md:px-8 lg:px-0"
          >
            <div
              ref={marqueeInnerRef}
              className="flex w-max gap-2.5 sm:gap-5"
              style={{ willChange: "transform" }}
            >
              {allCards.map((t, i) => (
                <div
                  key={i}
                  className="flex w-[232px] flex-shrink-0 flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:w-[280px] sm:gap-5 sm:p-6 lg:w-[320px] lg:p-7"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                    />
                    <div>
                      <p className="font-semibold text-rialta-navy text-sm">{t.name}</p>
                      <p className="text-rialta-navy/40 text-xs">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-rialta-navy/60">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
