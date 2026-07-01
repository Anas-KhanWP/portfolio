"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { portfolioConfig } from "@/lib/portfolio";

export default function Loader() {
  const initials = portfolioConfig.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="relative flex items-center justify-center">
        <div className="loader-ring absolute h-32 w-32 md:h-40 md:w-40" />
        <motion.div
          layoutId="hero-photo"
          className="relative z-10 h-24 w-24 overflow-hidden rounded-full border-2 border-accent md:h-32 md:w-32"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
      <motion.p
        className="mt-6 text-sm tracking-widest text-text-secondary uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
}
