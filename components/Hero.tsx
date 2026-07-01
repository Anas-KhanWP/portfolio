"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { portfolioConfig } from "@/lib/portfolio";

export default function Hero() {
  const initials = portfolioConfig.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_70%)]" />

      <motion.div
        layoutId="hero-photo"
        className="relative z-10 mb-8 h-28 w-28 overflow-hidden rounded-full border-2 border-accent md:h-36 md:w-36 animate-float"
        initial={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center bg-bg-secondary text-4xl font-bold text-text-secondary md:text-5xl">
            {initials}
          </div>
        ) : (
          <Image
            src={portfolioConfig.photo}
            alt={portfolioConfig.name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </motion.div>

      <motion.h1
        className="relative z-10 max-w-3xl text-center text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {portfolioConfig.name}
      </motion.h1>

      <motion.p
        className="relative z-10 mt-4 bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-center text-lg text-transparent md:text-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {portfolioConfig.title}
      </motion.p>

      <motion.p
        className="relative z-10 mt-3 max-w-xl text-center text-text-secondary leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        {portfolioConfig.tagline}
      </motion.p>

      <motion.div
        className="relative z-10 mt-10 flex gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <a
          href="#projects"
          className="rounded-lg bg-accent px-6 py-3 text-sm font-medium transition-all hover:bg-accent/80 hover:shadow-[0_0_20px_var(--accent-glow)]"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-white/10 px-6 py-3 text-sm font-medium transition-all hover:border-accent/50 hover:bg-accent/10"
        >
          Get in Touch
        </a>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.8, duration: 2, repeat: Infinity }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-text-secondary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
