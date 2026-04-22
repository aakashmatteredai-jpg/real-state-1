"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import SectionLabel from "../SectionLabel";

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "16:00"];
const weekdayLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function toISODate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function parseISODate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function buildAvailableDates() {
  const labelFormatter = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);

    return {
      value: toISODate(date),
      label: labelFormatter.format(date),
    };
  });
}

type BookingForm = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
};

type BookingConfirmation = {
  name: string;
  dateLabel: string;
  time: string;
};

type SocialIconProps = {
  size?: number;
  className?: string;
};

function InstagramIcon({ size = 16, className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      <rect x="4.25" y="4.25" width="15.5" height="15.5" rx="4.25" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7.25" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ size = 16, className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      <circle cx="6.5" cy="7" r="1.2" fill="currentColor" stroke="none" />
      <path d="M6.5 10.5V18" />
      <path d="M11.5 18v-4.25a2.75 2.75 0 0 1 5.5 0V18" />
      <path d="M11.5 10.5V18" />
    </svg>
  );
}

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [availableDates] = useState(() => buildAvailableDates());
  const availableDateMap = new Map(
    availableDates.map((date) => [date.value, date.label])
  );
  const [formData, setFormData] = useState<BookingForm>(() => ({
    fullName: "",
    email: "",
    phone: "",
    date: availableDates[0]?.value ?? "",
    time: timeSlots[1],
  }));
  const [viewMonth, setViewMonth] = useState(() => {
    const initialDate = parseISODate(availableDates[0]?.value ?? toISODate(new Date()));
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null
  );

  const monthLabel = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(viewMonth);

  const firstWeekday = (viewMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(
    viewMonth.getFullYear(),
    viewMonth.getMonth() + 1,
    0
  ).getDate();
  const calendarCells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

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
        y: 72,
        opacity: 0,
        duration: 1,
      })
        .from(
          ".booking-info > *",
          {
            y: 24,
            opacity: 0,
            duration: 0.62,
            stagger: 0.08,
          },
          "-=0.6"
        )
        .from(
          ".booking-form-block",
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
            stagger: 0.07,
          },
          "-=0.52"
        );
    },
    { scope: container }
  );

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function handleDateChange(dateValue: string) {
    setFormData((current) => ({
      ...current,
      date: dateValue,
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

    setConfirmation({
      name: formData.fullName.trim(),
      dateLabel: availableDateMap.get(formData.date) ?? formData.date,
      time: formData.time,
    });
    setError("");
  }

  return (
    <section id="contact" ref={container} className="bg-[#f4ede4] py-14 sm:py-18 md:py-24 lg:py-28">
      <div className="section-container">
        <div className="contact-shell mx-auto max-w-6xl rounded-[2rem] bg-[#f7f1e8] p-2 shadow-[0_30px_80px_rgba(32,24,16,0.12)] sm:rounded-[2.2rem] sm:p-3 md:rounded-[2.6rem] md:p-4">
          <div className="grid gap-3 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="booking-info rounded-[1.6rem] bg-[#efe5d8] p-5 text-[#27231e] sm:rounded-[1.8rem] sm:p-6 md:rounded-[2.1rem] md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[linear-gradient(135deg,#c8893d,#6f4d26)] text-lg font-semibold text-white shadow-md">
                  R
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#27231e]">
                    Rialta Concierge
                  </p>
                  <p className="text-sm text-[#6e655d]">
                    Your strategic property advisory team
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <SectionLabel className="mb-4 text-[#6f655b]">
                  Book Appointment
                </SectionLabel>
                <h2 className="max-w-xs text-[1.95rem] font-semibold leading-[0.98] tracking-[-0.05em] text-[#23201c] sm:text-[2.2rem] md:text-[2.75rem]">
                  Book your free appointment
                </h2>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#6c6259] md:text-[0.95rem]">
                  Need expert property advice tailored to your goals? Pick a
                  convenient slot and we will confirm everything for you.
                </p>
              </div>

              <div className="mt-6 space-y-3 text-sm text-[#544c45] sm:mt-7">
                <div className="flex items-center gap-2.5">
                  <Clock3 size={16} className="text-[#7f7469]" />
                  <span>Mon to Sat, 09:00 to 17:00</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin size={16} className="text-[#7f7469]" />
                  <span>Mumbai, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CalendarDays size={16} className="text-[#7f7469]" />
                  <span>Free first appointment</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 sm:mt-8">
                <a
                  aria-label="Instagram"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c7b8] bg-white/75 text-[#615850] transition-colors hover:border-[#27231e] hover:text-[#27231e]"
                >
                  <InstagramIcon size={16} />
                </a>
                <a
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c7b8] bg-white/75 text-[#615850] transition-colors hover:border-[#27231e] hover:text-[#27231e]"
                >
                  <LinkedInIcon size={16} />
                </a>
                <a
                  aria-label="WhatsApp"
                  href="https://wa.me/912249688200"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c7b8] bg-white/75 text-[#615850] transition-colors hover:border-[#27231e] hover:text-[#27231e]"
                >
                  <MessageCircle size={16} />
                </a>
                <a
                  aria-label="Email"
                  href="mailto:bookings@rialta.in"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c7b8] bg-white/75 text-[#615850] transition-colors hover:border-[#27231e] hover:text-[#27231e]"
                >
                  <Mail size={16} />
                </a>
              </div>
            </aside>

            <div className="rounded-[1.6rem] bg-white p-5 text-rialta-navy sm:rounded-[1.8rem] sm:p-6 md:rounded-[2.1rem] md:p-8">
              <div className="booking-form-block flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#2a2622]">
                    Select Date &amp; Time
                  </p>
                  <p className="mt-1 text-sm text-[#81776d]">
                    Choose a slot that works for you.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setViewMonth(
                        (current) =>
                          new Date(current.getFullYear(), current.getMonth() - 1, 1)
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5ddd3] text-[#6f665d] transition-colors hover:border-[#2a2622] hover:text-[#2a2622]"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="min-w-32 text-center text-sm font-medium text-[#3f3933]">
                    {monthLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setViewMonth(
                        (current) =>
                          new Date(current.getFullYear(), current.getMonth() + 1, 1)
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5ddd3] text-[#6f665d] transition-colors hover:border-[#2a2622] hover:text-[#2a2622]"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="booking-form-block mt-6 sm:mt-7">
                <div className="grid grid-cols-7 gap-1.5 pb-3 sm:gap-2">
                  {weekdayLabels.map((label) => (
                    <span
                      key={label}
                      className="text-center text-xs font-medium uppercase tracking-[0.18em] text-[#b2a89d]"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {calendarCells.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} className="h-10 rounded-xl sm:h-12 sm:rounded-2xl" />;
                    }

                    const date = new Date(
                      viewMonth.getFullYear(),
                      viewMonth.getMonth(),
                      day
                    );
                    const dateValue = toISODate(date);
                    const isSelected = formData.date === dateValue;
                    const isAvailable = availableDateMap.has(dateValue);

                    return (
                      <button
                        key={dateValue}
                        type="button"
                        onClick={() => isAvailable && handleDateChange(dateValue)}
                        className={`h-10 rounded-xl text-sm font-medium transition-all sm:h-12 sm:rounded-2xl ${
                          isSelected
                            ? "bg-[#2a2622] text-white shadow-lg shadow-[#2a2622]/15"
                            : isAvailable
                              ? "border border-[#e6ddd2] bg-[#f7f2ea] text-[#2f2a25] hover:border-[#2a2622]"
                              : "bg-transparent text-[#d1c7bc]"
                        }`}
                        disabled={!isAvailable}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="booking-form-block mt-6 rounded-[1.35rem] bg-[#f8f4ed] p-3 sm:mt-8 sm:rounded-[1.7rem] sm:p-4">
                <p className="text-sm font-semibold text-[#2d2824]">
                  Available Time
                </p>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-4 sm:gap-3 xl:grid-cols-7">
                  {timeSlots.map((time) => {
                    const isSelected = formData.time === time;

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleTimeChange(time)}
                        className={`rounded-[0.9rem] px-3 py-2.5 text-sm font-medium transition-all sm:rounded-[1rem] sm:py-3 ${
                          isSelected
                            ? "bg-[#2a2622] text-white shadow-lg shadow-[#2a2622]/15"
                            : "border border-[#e2d8cc] bg-white text-[#615850] hover:border-[#2a2622] hover:text-[#2a2622]"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <form className="mt-6 space-y-4 sm:mt-8" onSubmit={handleSubmit}>
                <div className="booking-form-block grid gap-3 md:grid-cols-3">
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="rounded-[1rem] border border-[#e2d8cc] bg-[#fbf8f3] px-4 py-3.5 text-sm text-rialta-navy placeholder:text-rialta-navy/32 focus:border-rialta-navy/35 focus:outline-none"
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="rounded-[1rem] border border-[#e2d8cc] bg-[#fbf8f3] px-4 py-3.5 text-sm text-rialta-navy placeholder:text-rialta-navy/32 focus:border-rialta-navy/35 focus:outline-none"
                  />
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="rounded-[1rem] border border-[#e2d8cc] bg-[#fbf8f3] px-4 py-3.5 text-sm text-rialta-navy placeholder:text-rialta-navy/32 focus:border-rialta-navy/35 focus:outline-none"
                  />
                </div>

                {error ? (
                  <p className="booking-form-block rounded-[1rem] border border-[#d88963]/30 bg-[#fff3ea] px-4 py-3 text-sm text-[#a34d25]">
                    {error}
                  </p>
                ) : null}

                <button className="booking-form-block flex w-full items-center justify-center gap-2 rounded-[1.15rem] bg-[#2a2622] px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-rialta-tan">
                  Book Appointment
                  <ArrowRight size={17} />
                </button>
              </form>

              {confirmation ? (
                <div className="booking-form-block mt-5 rounded-[1.3rem] border border-emerald-300/35 bg-emerald-50 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 text-emerald-700"
                    />
                    <div>
                      <p className="text-sm font-semibold text-rialta-navy">
                        Appointment reserved for {confirmation.name}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-rialta-navy/62">
                        We have pencilled you in for {confirmation.dateLabel} at{" "}
                        {confirmation.time}. Our team will confirm the meeting
                        shortly.
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
