"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = {
  "Main pages": ["Home", "Homes", "Advisory", "About", "Book Visit"],
  "Other pages": ["Neighbourhoods", "Journal", "NRI Desk", "Privacy policy", "Contact"],
  "Follow us": ["LinkedIn", "Instagram", "YouTube", "X", "WhatsApp"],
};

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 82%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        logoRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
        .fromTo(
          taglineRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.38"
        )
        .fromTo(
          colsRef.current?.querySelectorAll(".nav-col") ?? [],
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.12 },
          "-=0.4"
        )
        .fromTo(
          bottomRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.15"
        )
        .fromTo(
          imageRef.current,
          { y: 56, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0.15
        );

      gsap.to(imageRef.current, {
        y: -34,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-white px-4 pt-10 md:px-6 md:pt-12 lg:px-8">
      <div
        ref={footerRef}
        className="relative -mx-4 overflow-hidden rounded-t-[32px] bg-[#8bb8d5] text-white md:-mx-6 md:rounded-t-[40px] lg:-mx-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_48%)]" />

        <div className="relative z-10 mx-auto max-w-[86rem] px-6 pt-14 md:px-10 md:pt-16 lg:px-14 lg:pt-20">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-16">
            <div className="max-w-sm">
              <div ref={logoRef}>
                <span className="text-[2.1rem] font-semibold tracking-[-0.05em] text-white md:text-[2.6rem]">
                  Rialta
                </span>
              </div>

              <p
                ref={taglineRef}
                className="mt-5 max-w-xs text-base leading-relaxed text-white/80 md:text-[1.05rem]"
              >
                Luxury property advisory for buyers, sellers, and investors
                across India&apos;s most dynamic city markets.
              </p>
            </div>

            <div
              ref={colsRef}
              className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:justify-items-end"
            >
              {Object.entries(navLinks).map(([heading, links]) => (
                <div key={heading} className="nav-col flex flex-col gap-3">
                  <h4 className="text-base font-semibold text-white">
                    {heading}
                  </h4>

                  <ul className="flex flex-col gap-2.5">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-base text-white/74 transition-colors duration-200 hover:text-white"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 h-px w-full bg-white/28 md:mt-16" />

          <div
            ref={bottomRef}
            className="flex flex-col gap-3 py-5 text-sm text-white/72 md:flex-row md:items-center md:justify-between md:py-6"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span>Copyright © All rights reserved</span>
              <span className="opacity-40">·</span>
              <a href="#" className="transition-colors hover:text-white">
                Privacy policy
              </a>
            </div>

            <span>Made by Amar KZR</span>
          </div>
        </div>

        <div
          ref={imageRef}
          className="pointer-events-none relative z-0 mt-10 w-full md:mt-12"
          aria-hidden="true"
        >
          <div className="relative w-full aspect-[3872/2592]">
            <div className="absolute bottom-2 left-[6%] h-16 w-28 rounded-full bg-white/35 blur-2xl md:h-20 md:w-36" />
            <div className="absolute bottom-0 left-1/2 h-20 w-[42%] -translate-x-1/2 rounded-full bg-white/30 blur-3xl md:h-24" />
            <div className="absolute bottom-4 right-[8%] h-14 w-24 rounded-full bg-white/28 blur-2xl md:h-16 md:w-32" />

            <div className="absolute inset-x-0 bottom-0 mx-auto h-full w-full overflow-hidden rounded-t-[96px] md:rounded-t-[140px] lg:rounded-t-[180px]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#8bb8d5]/10 via-transparent to-white/8" />

              <div className="absolute inset-0">
                <Image
                  src="/hero.jpg"
                  alt=""
                  fill
                  sizes="94vw"
                  className="object-cover object-center saturate-[0.9] contrast-[1.08]"
                />
              </div>

              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#8bb8d5] via-[#8bb8d5]/10 to-transparent md:h-28" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#8bb8d5] via-[#8bb8d5]/56 to-transparent md:h-32" />
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#8bb8d5]/55 to-transparent md:w-10" />
              <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#8bb8d5]/55 to-transparent md:w-10" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
