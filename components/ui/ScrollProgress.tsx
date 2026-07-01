"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-amber-500"
      style={{ scaleX }}
    />
  );
}
