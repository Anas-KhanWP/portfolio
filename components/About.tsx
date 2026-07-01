"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioConfig } from "@/lib/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

function AnimatedCounter({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <span className="block font-mono text-3xl font-bold text-amber-500 md:text-4xl">
        {count}+
      </span>
      <span className="mt-1 block text-xs text-text-muted uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <SectionHeading number="01" title="About" />

      <div className="mb-16 grid gap-8 md:grid-cols-5 md:gap-12">
        <div className="md:col-span-2">
          {portfolioConfig.bio.map((paragraph, i) => (
            <motion.p
              key={i}
              className="text-text-secondary leading-relaxed md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {i === 0 && (
                <span className="float-left mr-2 font-serif text-5xl font-bold text-amber-500 leading-none md:text-6xl">
                  I
                </span>
              )}
              {paragraph}
            </motion.p>
          ))}
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/[0.04] bg-bg-secondary/50 p-8">
            <AnimatedCounter value={7} label="Years Exp." />
            <AnimatedCounter value={50} label="Projects" />
            <AnimatedCounter value={15} label="Technologies" />
          </div>
        </div>
      </div>
    </section>
  );
}
