"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mainLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Booking Visit", href: "#contact" },
];

const contactDetails = [
  { label: "Email", value: "bookings@rialta.in", href: "mailto:bookings@rialta.in" },
  { label: "Phone", value: "+91 22496 88200", href: "tel:+912249688200" },
];

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
    <footer className="bg-transparent px-4 md:px-6 lg:px-8">
      <div
        ref={footerRef}
        className="relative -mx-4 overflow-hidden rounded-t-[32px] text-white md:-mx-6 md:rounded-t-[40px] lg:-mx-8"
      >
        <div className="pointer-events-none absolute inset-0 " />

        <div
          ref={imageRef}
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <div className="absolute inset-0">
            <Image
              src="/hero.jpg"
              alt=""
              fill
              sizes="94vw"
              className="object-cover object-top saturate-[0.9] contrast-[1.08]"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/55 via-white/14 to-transparent md:h-32" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[31rem] max-w-[86rem] flex-col px-6 pt-14 pb-8 md:min-h-[35rem] md:px-10 md:pt-16 md:pb-10 lg:min-h-[39rem] lg:px-14 lg:pt-20 lg:pb-12">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-20">
            <div className="max-w-md">
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

              <div className="mt-8 space-y-3 text-sm text-white/82">
                {contactDetails.map((detail) => (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="flex w-fit items-center gap-2 transition-colors duration-200 hover:text-white"
                  >
                    <span className="font-semibold text-white">{detail.label}:</span>
                    <span>{detail.value}</span>
                  </a>
                ))}
              </div>
            </div>

            <div
              ref={colsRef}
              className="lg:justify-self-end"
            >
              <div className="nav-col flex flex-col gap-3">
                <h4 className="text-base font-semibold text-white">
                  Main pages
                </h4>

                <ul className="flex flex-col gap-2.5">
                  {mainLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-base text-white/78 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="mt-14 h-px w-full bg-white/28 md:mt-16" />

            <div
              ref={bottomRef}
              className="flex flex-col gap-3 py-5 text-sm text-white/76 md:flex-row md:items-center md:justify-between md:py-6"
            >
              <span>Copyright © All rights reserved</span>
              <span>Made by Amar KZR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
