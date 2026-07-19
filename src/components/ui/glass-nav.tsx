"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./button";

export function GlassNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 flex justify-center w-full px-4 pt-4 sm:pt-6",
        scrolled ? "pointer-events-none" : "pointer-events-auto"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-all duration-300 rounded-full border pointer-events-auto",
          scrolled
            ? "bg-white/70 backdrop-blur-md border-white/40 shadow-sm"
            : "bg-transparent border-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="font-semibold tracking-tight text-slate-900">Mawatin</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/analysis" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Site Analysis
          </Link>
          <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Admin Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex rounded-full">
            Log in
          </Button>
          <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all">
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
