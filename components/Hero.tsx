"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { portfolioConfig } from "@/lib/portfolio";

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(start);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block ml-0.5 h-[1em] w-[2px] bg-amber-500 align-middle"
        />
      )}
    </span>
  );
}

function MagneticButton({
  children,
  href,
  primary,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`inline-block rounded-xl px-6 py-3 text-sm font-medium transition-all ${
        primary
          ? "bg-amber-500 text-black hover:bg-amber-400 hover:shadow-[0_0_25px_var(--accent-glow-strong)]"
          : "border border-white/10 text-text-primary hover:border-amber-500/40 hover:bg-amber-500/5"
      }`}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const initials = portfolioConfig.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const nameLetters = portfolioConfig.name.split("");

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.06),transparent_60%)]"
        style={{ y, opacity }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.04),transparent_50%)]"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
      />

      <motion.div
        layoutId="hero-photo"
        className="relative z-10 mb-8 h-32 w-32 overflow-hidden rounded-full border-2 border-amber-500 md:h-40 md:w-40"
        initial={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        animate={{ boxShadow: "0 0 30px rgba(245,158,11,0.2)" }}
        style={{
          animation: "pulse-glow 3s ease-in-out infinite, breathe 4s ease-in-out infinite",
        }}
      >
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center bg-bg-secondary text-5xl font-bold text-text-secondary md:text-6xl">
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

      <h1 className="relative z-10 flex flex-wrap justify-center gap-x-1 gap-y-0 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
        {nameLetters.map((letter, i) => (
          <motion.span
            key={i}
            className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -30, rotateX: 90 }}
            animate={{ opacity: 1, x: 0, rotateX: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4 + i * 0.04,
              type: "spring",
              stiffness: 120,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="relative z-10 mt-6 font-mono text-xl text-amber-400 md:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <TypewriterText
          text={portfolioConfig.title}
          delay={1.2}
        />
      </motion.p>

      <motion.p
        className="relative z-10 mt-4 max-w-xl text-center text-text-secondary leading-relaxed md:text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        {portfolioConfig.tagline}
      </motion.p>

      <motion.div
        className="relative z-10 mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <MagneticButton href="#projects" primary>
          View Projects
        </MagneticButton>
        <MagneticButton href="#contact">Get in Touch</MagneticButton>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-xs text-text-muted"
        >
          <span>Scroll</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
