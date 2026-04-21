"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Bath, Bed, Maximize, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import SectionLabel from "../SectionLabel";

const properties = [
  {
    id: 1,
    title: "Corner Prestige",
    location: "Silver Palm Villas",
    price: "$1,120,000",
    beds: 5,
    baths: 5,
    area: "3,050 sq ft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    status: "For Sale"
  },
  {
    id: 2,
    title: "Park Serenity",
    location: "Parkside Residences",
    price: "$980,000",
    beds: 3,
    baths: 3,
    area: "2,400 sq ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6191dae10c?q=80&w=2070&auto=format&fit=crop",
    status: "For Sale"
  },
  {
    id: 3,
    title: "Green Contemporary",
    location: "Green District Residences",
    price: "$1,450,000",
    beds: 4,
    baths: 3,
    area: "3,200 sq ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    status: "For Sale"
  }
];

export default function FeaturedProperties() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".property-card", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".property-grid",
        start: "top 75%",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 bg-white">
      <div className="section-container mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <SectionLabel>Featured Properties</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-medium text-rialta-navy leading-tight">
            A curated collection of homes currently represented by Rialta, chosen for their quality, location, and architectural character.
          </h2>
        </div>
        <button className="btn-premium whitespace-nowrap">
          View All
        </button>
      </div>

      <div className="section-container">
        <div className="property-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <div key={prop.id} className="property-card group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6">
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider rounded-full text-rialta-navy shadow-sm">
                  {prop.status}
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-rialta-navy scale-0 group-hover:scale-100 transition-transform duration-500">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
              
              <div className="px-2">
                <div className="text-2xl font-bold text-rialta-navy mb-1">{prop.price}</div>
                <h3 className="text-xl font-medium text-rialta-navy mb-2 group-hover:text-rialta-tan transition-colors">{prop.title}</h3>
                <div className="text-rialta-navy/50 text-sm mb-6 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-rialta-tan" />
                  {prop.location}
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-rialta-navy/60 text-sm">
                    <Bed size={16} /> <span>{prop.beds}</span>
                  </div>
                  <div className="flex items-center gap-2 text-rialta-navy/60 text-sm">
                    <Bath size={16} /> <span>{prop.baths}</span>
                  </div>
                  <div className="flex items-center gap-2 text-rialta-navy/60 text-sm">
                    <Maximize size={16} /> <span>{prop.area}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
