"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioConfig } from "@/lib/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

const { socials } = portfolioConfig;

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <SectionHeading number="06" title="Contact" />

      <motion.div
        ref={ref}
        className="grid gap-6 md:grid-cols-3"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 rounded-2xl border border-white/[0.04] bg-bg-secondary/50 p-8 text-center transition-all hover:border-amber-500/20 hover:bg-amber-500/[0.03]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-transform group-hover:scale-110">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider">GitHub</p>
            <p className="mt-1 text-sm font-medium text-text-primary">
              {socials.github.split("/").pop()}
            </p>
          </div>
        </motion.a>

        <motion.a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 rounded-2xl border border-white/[0.04] bg-bg-secondary/50 p-8 text-center transition-all hover:border-amber-500/20 hover:bg-amber-500/[0.03]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-transform group-hover:scale-110">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider">LinkedIn</p>
            <p className="mt-1 text-sm font-medium text-text-primary">
              {socials.linkedin.split("/").pop()}
            </p>
          </div>
        </motion.a>

        <motion.button
          onClick={copyEmail}
          className="group flex flex-col items-center gap-4 rounded-2xl border border-white/[0.04] bg-bg-secondary/50 p-8 text-center transition-all hover:border-amber-500/20 hover:bg-amber-500/[0.03] cursor-pointer"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-transform group-hover:scale-110">
            {copied ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider">
              {copied ? "Copied!" : "Email"}
            </p>
            <p className="mt-1 text-sm font-medium text-text-primary">
              {socials.email}
            </p>
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
