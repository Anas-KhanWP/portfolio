"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioConfig } from "@/lib/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

function ProgressBar({
  label,
  index,
  isInView,
}: {
  label: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm text-text-secondary transition-colors group-hover:text-text-primary">
          {label}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.06, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <SectionHeading number="03" title="Skills" />

      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <nav className="flex flex-row flex-wrap gap-2 md:flex-col">
            {portfolioConfig.skills.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveTab(i)}
                className={`rounded-lg px-4 py-3 sm:py-2.5 text-left text-sm transition-all ${
                  activeTab === i
                    ? "border-l-2 border-amber-500 bg-amber-500/5 text-amber-500"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/[0.02]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>
        </div>

        <div ref={ref} className="md:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/[0.04] bg-bg-secondary/50 p-6 md:p-8"
          >
            <h3 className="mb-6 text-lg font-semibold text-amber-500">
              {portfolioConfig.skills[activeTab].name}
            </h3>
            <div className="space-y-4">
              {portfolioConfig.skills[activeTab].items.map((skill, idx) => (
                <ProgressBar
                  key={skill}
                  label={skill}
                  index={idx}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
