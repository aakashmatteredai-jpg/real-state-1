"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import SectionLabel from "../SectionLabel";

const cityMarkets = ["Mumbai", "Bengaluru", "Gurugram", "Hyderabad", "Goa"];
const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

function buildUpcomingDates() {
  const formatter = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);

    const value = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    return {
      value,
      label: formatter.format(date),
    };
  });
}

type BookingForm = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
};

type BookingConfirmation = {
  name: string;
  dateLabel: string;
  time: string;
};

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [availableDates] = useState(() => buildUpcomingDates());
  const [formData, setFormData] = useState<BookingForm>(() => ({
    fullName: "",
    email: "",
    phone: "",
    date: availableDates[0]?.value ?? "",
    time: timeSlots[0],
    notes: "",
  }));
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".contact-shell", {
        y: 80,
        opacity: 0,
        duration: 1.05,
      })
        .from(
          ".booking-info > *",
          {
            y: 26,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.65"
        )
        .from(
          ".booking-form-block",
          {
            y: 22,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.55"
        );
    },
    { scope: container }
  );

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function handleDateChange(date: string) {
    setFormData((current) => ({
      ...current,
      date,
    }));
  }

  function handleTimeChange(time: string) {
    setFormData((current) => ({
      ...current,
      time,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please complete your name, email, and phone before booking.");
      return;
    }

    const selectedDate =
      availableDates.find((date) => date.value === formData.date)?.label ??
      formData.date;

    setConfirmation({
      name: formData.fullName.trim(),
      dateLabel: selectedDate,
      time: formData.time,
    });
    setError("");
  }

  return (
    <section id="contact" ref={container} className="bg-[#f7f2ea] py-24 md:py-28">
      <div className="section-container">
        <div className="contact-shell relative overflow-hidden rounded-[2.75rem] bg-[#0b1230] p-4 shadow-[0_35px_90px_rgba(15,21,48,0.18)] md:p-6">
          <div className="pointer-events-none absolute -left-16 top-14 h-48 w-48 rounded-full bg-[#d9a469]/12 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-white/6 blur-3xl" />

          <div className="relative z-10 grid gap-4 xl:grid-cols-[0.94fr_1.06fr]">
            <div className="booking-info rounded-[2.2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 text-white md:p-10">
              <SectionLabel className="text-white/65">
                Book Appointment
              </SectionLabel>

              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] md:text-6xl">
                    Book a free appointment with Rialta.
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                    Pick your slot, share your details, and our team will
                    confirm everything for you. No payment is needed to reserve
                    your first conversation.
                  </p>
                </div>

                <div className="rounded-[1.9rem] border border-white/12 bg-white/7 p-5 text-sm leading-relaxed text-white/72">
                  Share your preferred date and time, and we will set up a free
                  consultation to understand your plans and guide the next step.
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/42">
                    Active across
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cityMarkets.map((city) => (
                      <span
                        key={city}
                        className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/72"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 pt-2 sm:grid-cols-3 xl:grid-cols-1">
                  <div className="flex items-center gap-3 text-white/78">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                      <Phone size={18} />
                    </div>
                    <span className="text-sm md:text-base">+91 22 4968 8200</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/78">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                      <Mail size={18} />
                    </div>
                    <span className="text-sm md:text-base">bookings@rialta.in</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/78">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                      <MapPin size={18} />
                    </div>
                    <span className="text-sm md:text-base">
                      Suite 804, BKC, Mumbai
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.2rem] bg-[#f4efe7] p-8 text-rialta-navy md:p-10">
              <div className="booking-form-block">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rialta-navy/45">
                    Appointment Details
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-rialta-navy">
                    Reserve your free appointment
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-rialta-navy/58">
                    Share the basics, pick a convenient slot, and our team will
                    confirm the meeting right away.
                  </p>
                </div>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="booking-form-block grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-rialta-navy/42">
                      Full name
                    </span>
                    <input
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Aarav Mehta"
                      className="w-full rounded-[1.2rem] border border-[#d6d0c4] bg-white px-4 py-3.5 text-rialta-navy placeholder:text-rialta-navy/30 focus:border-rialta-navy/35 focus:outline-none"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-rialta-navy/42">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="aarav@example.in"
                      className="w-full rounded-[1.2rem] border border-[#d6d0c4] bg-white px-4 py-3.5 text-rialta-navy placeholder:text-rialta-navy/30 focus:border-rialta-navy/35 focus:outline-none"
                    />
                  </label>
                </div>

                <label className="booking-form-block block space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-rialta-navy/42">
                    Phone
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-[1.2rem] border border-[#d6d0c4] bg-white px-4 py-3.5 text-rialta-navy placeholder:text-rialta-navy/30 focus:border-rialta-navy/35 focus:outline-none"
                  />
                </label>

                <div className="booking-form-block rounded-[1.8rem] border border-[#ddd6ca] bg-white px-5 py-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-rialta-navy/46">
                    <CalendarDays size={16} />
                    Choose date
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {availableDates.map((date) => {
                      const isActive = date.value === formData.date;

                      return (
                        <button
                          key={date.value}
                          type="button"
                          onClick={() => handleDateChange(date.value)}
                          className={`rounded-[1.2rem] border px-3 py-4 text-sm font-medium transition-all ${
                            isActive
                              ? "border-rialta-navy bg-rialta-navy text-white shadow-lg shadow-rialta-navy/12"
                              : "border-[#d6d0c4] bg-[#f8f3eb] text-rialta-navy/70 hover:border-rialta-navy/28 hover:bg-white"
                          }`}
                        >
                          {date.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="booking-form-block rounded-[1.8rem] border border-[#ddd6ca] bg-white px-5 py-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-rialta-navy/46">
                    <Clock3 size={16} />
                    Choose time
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {timeSlots.map((time) => {
                      const isActive = time === formData.time;

                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleTimeChange(time)}
                          className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
                            isActive
                              ? "border-rialta-navy bg-rialta-navy text-white shadow-lg shadow-rialta-navy/12"
                              : "border-[#d6d0c4] bg-[#f8f3eb] text-rialta-navy/70 hover:border-rialta-navy/28 hover:bg-white"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="booking-form-block block space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-rialta-navy/42">
                    Notes
                  </span>
                  <textarea
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Tell us your city, budget range, or anything we should prepare before the call."
                    className="w-full resize-none rounded-[1.4rem] border border-[#d6d0c4] bg-white px-4 py-4 text-rialta-navy placeholder:text-rialta-navy/30 focus:border-rialta-navy/35 focus:outline-none"
                  />
                </label>

                {error ? (
                  <p className="booking-form-block rounded-[1.2rem] border border-[#d88963]/30 bg-[#fff3ea] px-4 py-3 text-sm text-[#a34d25]">
                    {error}
                  </p>
                ) : null}

                <button className="booking-form-block flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-rialta-navy px-6 py-4 text-base font-semibold text-white transition-all hover:bg-rialta-tan">
                  Book Appointment
                  <ArrowRight size={18} />
                </button>
              </form>

              {confirmation ? (
                <div className="booking-form-block mt-6 rounded-[1.6rem] border border-emerald-300/35 bg-emerald-50 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={22}
                      className="mt-0.5 text-emerald-700"
                    />
                    <div>
                      <p className="text-base font-semibold text-rialta-navy">
                        Appointment reserved for {confirmation.name}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-rialta-navy/62">
                        We have pencilled you in for {confirmation.dateLabel} at{" "}
                        {confirmation.time}. A Rialta advisor will confirm the
                        appointment shortly.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
