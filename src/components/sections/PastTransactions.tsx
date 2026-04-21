"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SectionLabel from "../SectionLabel";

const transactions = [
  {
    id: 1,
    title: "Family Haven",
    price: "$690,000",
    description: "A thoughtfully designed family duplex near schools and key community amenities. Planned for modern family living, it offers efficient layouts, durable materials, and long-term comfort.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop",
    status: "Sold"
  },
  {
    id: 2,
    title: "Urban Loft",
    price: "$760,000",
    description: "A modern urban loft featuring striking double-height ceilings and expansive industrial-style windows. Crafted for city living, the space balances openness with clearly defined zones.",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2000&auto=format&fit=crop",
    status: "Sold"
  }
];

export default function PastTransactions() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".transaction-card", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".transaction-grid",
        start: "top 70%",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 bg-[#FAF9F6]">
      <div className="section-container mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <SectionLabel>Past Transactions</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-medium text-rialta-navy leading-tight">
            A snapshot of closed deals highlighting pricing accuracy, market timing, and trusted client relationships.
          </h2>
        </div>
        <button className="btn-premium whitespace-nowrap">
          View All
        </button>
      </div>

      <div className="section-container">
        <div className="transaction-grid grid grid-cols-1 md:grid-cols-2 gap-12">
          {transactions.map((item) => (
            <div key={item.id} className="transaction-card group">
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden mb-8">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-8 right-8 px-5 py-2 bg-white/95 backdrop-blur text-xs font-bold uppercase tracking-[0.1em] rounded-full text-rialta-navy shadow-lg z-10">
                  {item.status}
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-medium text-rialta-navy">{item.title}</h3>
                <div className="text-2xl font-bold text-rialta-navy">{item.price}</div>
              </div>
              <p className="text-rialta-navy/60 text-lg leading-relaxed max-w-xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
