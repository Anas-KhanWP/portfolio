"use client";

import { portfolioConfig } from "@/lib/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-text-secondary md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {portfolioConfig.name}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href={portfolioConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={portfolioConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${portfolioConfig.socials.email}`}
            className="transition-colors hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
