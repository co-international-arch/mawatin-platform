import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppleCardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}

export function AppleCard({ children, className, glass = false }: AppleCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[32px] border transition-all duration-500 ease-out",
        glass
          ? "bg-white/40 backdrop-blur-xl border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          : "bg-white border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      <div className="relative z-10 p-8 sm:p-10">{children}</div>
    </div>
  );
}

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  description,
  icon,
  className,
  colSpan = 1,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
}) {
  const spans = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
  };

  return (
    <AppleCard className={cn(spans[colSpan], "group cursor-pointer", className)}>
      <div className="flex flex-col h-full">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-500">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 leading-relaxed flex-grow">{description}</p>
      </div>
    </AppleCard>
  );
}
