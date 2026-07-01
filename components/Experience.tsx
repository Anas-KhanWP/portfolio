"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioConfig } from "@/lib/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

function TimelineItem({
  exp,
  index,
}: {
  exp: (typeof portfolioConfig.experience)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = index % 2 === 0;
  const isCurrent = exp.period.toLowerCase().includes("present");

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-start gap-6 md:gap-10 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <motion.div
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-amber-500/30 bg-bg-primary"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
      >
        <div
          className={`h-3 w-3 rounded-full ${
            isCurrent ? "bg-amber-500 animate-pulse" : "bg-amber-500/50"
          }`}
        />
      </motion.div>

      <motion.div
        className={`flex-1 rounded-xl border p-6 transition-all ${
          isCurrent
            ? "border-amber-500/20 bg-amber-500/[0.03] shadow-[0_0_30px_rgba(245,158,11,0.05)]"
            : "border-white/[0.04] bg-bg-secondary/50"
        }`}
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-500">
          {exp.period}
        </span>
        <h3 className="mt-3 text-lg font-semibold">{exp.role}</h3>
        <p className="text-sm text-amber-400/80">{exp.company}</p>
        <ul className="mt-3 space-y-1.5">
          {exp.description.map((desc, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500/50" />
              {desc}
            </li>
          ))}
        </ul>
        {exp.tech && exp.tech.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/[0.02] px-2 py-0.5 text-xs text-text-muted"
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
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <SectionHeading number="04" title="Experience" />

      <div className="relative flex flex-col gap-10 md:gap-14">
        <div className="absolute left-5 top-2 bottom-2 w-px md:left-1/2 md:-translate-x-px">
          <div className="h-full w-full bg-gradient-to-b from-amber-500/30 via-amber-500/10 to-transparent" />
        </div>

        {portfolioConfig.experience.map((exp, i) => (
          <TimelineItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
