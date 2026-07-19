"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10"
    >
      {/* 3D Grid Effect */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      />
      
      {/* Floating Orbs */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]"
      />
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-[120px]"
      />
      
      {/* Neural Network Nodes */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"
      />
    </div>
  );
}
