"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioConfig } from "@/lib/portfolio";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-heading">
          Skills<span className="text-accent">.</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {portfolioConfig.skills.map((category, catIdx) => (
            <div
              key={category.name}
              className="rounded-xl border border-white/5 bg-bg-secondary p-6"
            >
              <h3 className="mb-4 text-lg font-semibold text-accent">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: catIdx * 0.2 + idx * 0.05,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
