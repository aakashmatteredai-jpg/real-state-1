"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import SectionLabel from "../SectionLabel";

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".contact-card", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 bg-white overflow-hidden">
      <div className="section-container">
        <div className="contact-card relative bg-rialta-navy rounded-[4rem] p-12 md:p-24 text-white overflow-hidden shadow-2xl">
          {/* Abstract background decorative element */}
          <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-rialta-tan/20 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-rialta-tan/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel className="text-white/80">Connect with us</SectionLabel>
              <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                Ready to find your haven?
              </h2>
              <p className="text-white/60 text-xl leading-relaxed mb-12 max-w-md">
                Our team of experts is ready to guide you through a seamless real estate experience tailored to your vision.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-rialta-tan transition-colors">
                    <Phone size={20} />
                  </div>
                  <span className="text-lg font-medium">+1 (555) 000-RIALTA</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-rialta-tan transition-colors">
                    <Mail size={20} />
                  </div>
                  <span className="text-lg font-medium">hello@rialta.com</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-rialta-tan transition-colors">
                    <MapPin size={20} />
                  </div>
                  <span className="text-lg font-medium">123 Luxury Lane, Beverly Hills, CA</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10">
                <h3 className="text-2xl font-bold mb-6">Send an Inquiry</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Your Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-rialta-tan focus:outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-rialta-tan focus:outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Message</label>
                    <textarea rows={3} className="w-full bg-transparent border-b border-white/20 py-2 focus:border-rialta-tan focus:outline-none transition-colors resize-none" placeholder="I'm interested in..." />
                  </div>
                  <button className="w-full py-4 mt-4 bg-white text-rialta-navy font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-rialta-tan hover:text-white transition-all">
                    Send Message
                    <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
