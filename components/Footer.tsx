"use client";

import { portfolioConfig } from "@/lib/portfolio";
import BackToTop from "@/components/ui/BackToTop";

export default function Footer() {
  return (
    <>
      <footer className="relative px-6 py-10 pb-20">
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm md:flex-row">
          <p className="text-text-muted">
            &copy; {new Date().getFullYear()} {portfolioConfig.name}. All rights reserved.
          </p>
          <p className="text-text-muted">
            Built with{" "}
            <span className="text-amber-500">Next.js</span> +{" "}
            <span className="text-amber-500">Framer Motion</span>
          </p>
          <div className="flex items-center gap-6">
            <a
              href={portfolioConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-text-muted transition-colors hover:text-amber-500"
            >
              GitHub
            </a>
            <a
              href={portfolioConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-text-muted transition-colors hover:text-amber-500"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${portfolioConfig.socials.email}`}
              className="px-3 py-2 text-text-muted transition-colors hover:text-amber-500"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
