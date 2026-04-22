"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import SectionLabel from "../SectionLabel";

const introImages = [
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    alt: "Modern Villa External",
  },
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Luxury Poolside",
  },
  {
    url: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Interior Design",
  },
];

export default function Introduction() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + introImages.length) % introImages.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % introImages.length);

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
  }, { scope: container });

  // Build the ordered triple: [left, center, right]
  const indices = [
    (activeIndex - 1 + introImages.length) % introImages.length,
    activeIndex,
    (activeIndex + 1) % introImages.length,
  ];

  return (
    <section ref={container} className="py-32 bg-[#f5f5f3]">
      <div className="section-container text-center mb-20">
        <div className="flex justify-center">
          <SectionLabel>Introduction</SectionLabel>
        </div>
        <h2 className="intro-text text-3xl md:text-5xl font-medium max-w-4xl mx-auto leading-tight text-rialta-navy mt-6">
          Discover a refined approach to real estate where design, data, and
          trust come together to simplify your journey and elevate every
          decision.
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center gap-4 px-6">
        {/* Prev button */}
        <button
          onClick={prev}
          className="absolute left-[calc(50%-340px)] z-10 w-10 h-10 rounded-full bg-rialta-navy text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          aria-label="Previous"
        >
          ‹
        </button>

        {indices.map((imgIdx, pos) => {
          const isCenter = pos === 1;
          return (
            <div
              key={imgIdx}
              className={`
                overflow-hidden rounded-[2rem] transition-all duration-500 ease-out flex-shrink-0
                ${isCenter
                  ? "w-72 md:w-[340px] h-[360px] md:h-[420px] z-10 opacity-100 scale-100"
                  : "w-52 md:w-[260px] h-[280px] md:h-[320px] z-0 opacity-50 scale-95"
                }
              `}
            >
              <img
                src={introImages[imgIdx].url}
                alt={introImages[imgIdx].alt}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}

        {/* Next button */}
        <button
          onClick={next}
          className="absolute right-[calc(50%-340px)] z-10 w-10 h-10 rounded-full bg-rialta-navy text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
}