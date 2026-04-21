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
    <div className={cn("flex items-center gap-2 mb-6", className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-rialta-tan" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rialta-navy/60">
        {children}
      </span>
    </div>
  );
}
