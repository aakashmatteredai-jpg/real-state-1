"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import SectionLabel from "../SectionLabel";

export default function About() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".about-content > *", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
    });

    gsap.from(".about-image-1", {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      },
    });

    gsap.from(".about-image-2", {
      x: 50,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 bg-[#FAF9F6]">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="about-content">
          <SectionLabel>About Rialta</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-medium text-rialta-navy leading-tight mb-8">
            A Boutique Approach to Property Sales
          </h2>
          <p className="text-rialta-navy/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Built on expertise, integrity, and innovation, Rialta represents a modern standard for premium real estate experiences. We focus on quality over quantity to ensure every property gets the attention it deserves.
          </p>
          <button className="btn-premium flex items-center gap-2 group">
            Read More
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative h-[500px] md:h-[700px] w-full">
          <div className="about-image-1 absolute top-0 right-0 w-[85%] h-[85%] rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop" 
              alt="Modern Living Room" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="about-image-2 absolute bottom-0 left-0 w-[55%] h-[55%] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-[#FAF9F6] z-10">
            <img 
              src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2070&auto=format&fit=crop" 
              alt="Modern Kitchen" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
