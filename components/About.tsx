"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioConfig } from "@/lib/portfolio";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="section-heading">
          About<span className="text-accent">.</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {portfolioConfig.bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-text-secondary leading-relaxed md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
