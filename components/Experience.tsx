"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioConfig } from "@/lib/portfolio";

function TimelineItem({
  exp,
  index,
}: {
  exp: (typeof portfolioConfig.experience)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-start gap-8 md:gap-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <motion.div
        className={`hidden h-px flex-1 bg-gradient-to-r from-transparent to-white/10 md:block ${
          !isLeft ? "rotate-180" : ""
        }`}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      <motion.div
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-bg-primary"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-accent" />
      </motion.div>

      <motion.div
        className="flex-1 rounded-xl border border-white/5 bg-bg-secondary p-6"
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-accent">
          <span>{exp.period}</span>
        </div>
        <h3 className="text-lg font-semibold">{exp.role}</h3>
        <p className="text-sm text-text-secondary">{exp.company}</p>
        <ul className="mt-3 space-y-1.5">
          {exp.description.map((desc, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {desc}
            </li>
          ))}
        </ul>
        {exp.tech && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/[0.03] px-2 py-0.5 text-xs text-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl px-6 py-20 md:py-32"
    >
      <h2 className="section-heading">
        Experience<span className="text-accent">.</span>
      </h2>

      <div className="relative flex flex-col gap-12">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-white/5 md:left-1/2 md:-translate-x-px" />

        {portfolioConfig.experience.map((exp, i) => (
          <TimelineItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
