"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  number: string;
  title: string;
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="mb-12 md:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <span className="mb-2 block font-mono text-6xl font-bold text-amber-500/5 md:text-8xl">
        {number}
      </span>
      <h2 className="section-heading -mt-10 md:-mt-14">
        {title}
        <span className="text-amber-500">.</span>
      </h2>
    </motion.div>
  );
}
