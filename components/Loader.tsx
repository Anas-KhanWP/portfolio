"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { portfolioConfig } from "@/lib/portfolio";

export default function Loader() {
  const initials = portfolioConfig.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const [imgError, setImgError] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = `Hello, I'm ${portfolioConfig.name}`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08080c]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.08),transparent_70%)]" />

      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute h-36 w-36 rounded-full border border-amber-500/10 md:h-44 md:w-44"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute h-28 w-28 rounded-full border border-amber-500/20 md:h-36 md:w-36"
          animate={{ rotate: -360, scale: [1, 1.08, 1] }}
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <motion.div
          layoutId="hero-photo"
          className="relative z-10 h-24 w-24 overflow-hidden rounded-full border-2 border-amber-500 md:h-28 md:w-28"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ boxShadow: "0 0 30px rgba(245,158,11,0.15)" }}
        >
          {imgError ? (
            <div className="flex h-full w-full items-center justify-center bg-bg-secondary text-3xl font-bold text-text-secondary md:text-4xl">
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
      </div>

      <div className="mt-8 h-6">
        <motion.p
          className="font-mono text-sm text-amber-500/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {typedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-0.5 ml-0.5 h-4 bg-amber-500"
          />
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}
