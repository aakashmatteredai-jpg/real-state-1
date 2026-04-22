import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SectionLabel({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex items-center gap-2 text-rialta-navy/60", className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-rialta-tan" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-inherit">
        {children}
      </span>
    </div>
  );
}
