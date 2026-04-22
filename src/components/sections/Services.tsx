"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Building2, FileText, Layers, Command, ListChecks, Link2, Warehouse } from "lucide-react";
import { useRef } from "react";
import SectionLabel from "../SectionLabel";

const services = [
  {
    id: 1,
    icon: Building2,
    title: "Luxury Home Sales",
    description: "We guide premium residential sales across India&apos;s top city markets with tighter positioning, stronger negotiations, and a smoother close.",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=800&auto=format&fit=crop",
    wide: true,
    imageLeft: true,
  },
  {
    id: 2,
    icon: FileText,
    title: "Micro-Market Advisory",
    description: "We help you compare neighbourhoods, builder quality, and live pricing trends before you commit in fast-moving Indian metros.",
    image: null,
    wide: false,
  },
  {
    id: 3,
    icon: Layers,
    title: "Staging And Styling",
    description: "From show-flat styling to listing presentation, we shape homes so they feel premium, current, and easier to sell well.",
    image: null,
    wide: false,
  },
  {
    id: 4,
    icon: Command,
    title: "Investment Strategy",
    description: "We evaluate yields, capital appreciation, developer strength, and entry timing for investors buying in cities like Bengaluru, Pune, and Gurugram.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop",
    wide: true,
    imageLeft: true,
  },
  {
    id: 5,
    icon: ListChecks,
    title: "Legal Due Diligence",
    description: "We coordinate title checks, society paperwork, RERA details, and transaction support so buyers move with more confidence.",
    image: null,
    wide: false,
  },
  {
    id: 6,
    icon: Link2,
    title: "Buyer Matching",
    description: "Qualified buyers are matched to the right layout, locality, and budget band, reducing friction and improving final outcomes.",
    image: null,
    wide: false,
  },
  {
    id: 7,
    icon: Warehouse,
    title: "Rental Asset Management",
    description: "For busy owners and NRI clients, we support leasing, upkeep coordination, and long-term asset performance across key cities.",
    image: null,
    wide: false,
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const [firstService, secondService, thirdService, fourthService, ...remainingServices] = services;
  const FirstIcon = firstService.icon;
  const SecondIcon = secondService.icon;
  const ThirdIcon = thirdService.icon;
  const FourthIcon = fourthService.icon;

  useGSAP(() => {
    gsap.from(".service-card", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
    });

    gsap.from(".services-header > *", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-[#FAF9F6] py-10 sm:py-14 md:py-16">
      <div className="section-container">
        <div className="rounded-[1.5rem] bg-[#EEF2F8] px-3 py-8 sm:rounded-[1.75rem] sm:px-4 sm:py-10 md:px-8 lg:rounded-3xl lg:px-10 lg:py-14">

          {/* Header */}
          <div className="services-header mb-8 text-center sm:mb-10 md:mb-12">
            <div className="mb-3 flex justify-center sm:mb-4">
              <SectionLabel>Services</SectionLabel>
            </div>
            <h2 className="mb-3 text-3xl font-semibold text-rialta-navy sm:text-4xl md:mb-4 md:text-5xl">
              What we do best
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-rialta-navy/55 sm:text-base">
              From first consultation to possession, our services cover premium
              home sales, advisory, and asset management across India&apos;s most
              in-demand neighbourhoods.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">

            {/* Row 1: Wide card (image left) + small card */}
            <div className="service-card flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm sm:flex-row md:col-span-1">
              <div className="h-48 w-full flex-shrink-0 sm:h-auto sm:w-[45%]">
                <img
                  src={firstService.image!}
                  alt={firstService.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 p-4 sm:p-5 lg:p-7">
                <FirstIcon size={28} className="text-rialta-navy/40" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-rialta-navy sm:text-xl">{firstService.title}</h3>
                <p className="text-rialta-navy/55 text-sm leading-relaxed">{firstService.description}</p>
              </div>
            </div>

            <div className="service-card flex flex-col justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-7">
              <SecondIcon size={28} className="text-rialta-navy/40" strokeWidth={1.5} />
              <div>
                <h3 className="mb-2 text-lg font-semibold text-rialta-navy sm:text-xl">{secondService.title}</h3>
                <p className="text-rialta-navy/55 text-sm leading-relaxed">{secondService.description}</p>
              </div>
            </div>

            {/* Row 2: Small card + wide card (image right) */}
            <div className="service-card flex flex-col justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-7">
              <ThirdIcon size={28} className="text-rialta-navy/40" strokeWidth={1.5} />
              <div>
                <h3 className="mb-2 text-lg font-semibold text-rialta-navy sm:text-xl">{thirdService.title}</h3>
                <p className="text-rialta-navy/55 text-sm leading-relaxed">{thirdService.description}</p>
              </div>
            </div>

            <div className="service-card flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm sm:flex-row">
              <div className="h-48 w-full flex-shrink-0 sm:h-auto sm:w-[45%]">
                <img
                  src={fourthService.image!}
                  alt={fourthService.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 p-4 sm:p-5 lg:p-7">
                <FourthIcon size={28} className="text-rialta-navy/40" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-rialta-navy sm:text-xl">{fourthService.title}</h3>
                <p className="text-rialta-navy/55 text-sm leading-relaxed">{fourthService.description}</p>
              </div>
            </div>

            {/* Row 3: Three equal cards */}
            {remainingServices.map((s) => (
              <div
                key={s.id}
                className="service-card flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-7 md:col-span-1"
                style={{ gridColumn: remainingServices.length === 3 ? "span 1" : undefined }}
              >
                <s.icon size={28} className="text-rialta-navy/40" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-rialta-navy sm:text-xl">{s.title}</h3>
                <p className="text-rialta-navy/55 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
