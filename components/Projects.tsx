"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { GitHubRepo } from "@/lib/types";
import { renderHTML } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";

interface ProjectsProps {
  repos: GitHubRepo[];
  loading: boolean;
}

const languages: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Java: "#B07219",
  HTML: "#E34F26",
  CSS: "#563D7C",
  PHP: "#4F5D95",
  Jupyter: "#DA5B0B",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

function TiltCard({
  repo,
  index,
  featured,
}: {
  repo: GitHubRepo;
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setRotate({
        x: ((y - centerY) / centerY) * -8,
        y: ((x - centerX) / centerX) * 8,
      });
      setGlow({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    },
    []
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={featured ? "md:col-span-2" : ""}
    >
      <Link
        href={`/projects/${repo.name}`}
        className="group relative block overflow-hidden rounded-xl border border-white/[0.04] bg-bg-secondary/50 transition-colors hover:border-amber-500/20"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative p-6"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setRotate({ x: 0, y: 0 });
            setGlow({ x: 50, y: 50 });
          }}
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(245,158,11,0.06), transparent 60%)`,
            }}
          />

          {repo.language && (
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                backgroundColor: languages[repo.language] || "#666",
              }}
            />
          )}

          <div className="mb-3 flex items-center gap-3">
            <svg
              className="h-5 w-5 text-text-muted transition-colors group-hover:text-amber-500"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 11-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
            </svg>
            <h3 className="font-semibold text-text-primary truncate transition-colors group-hover:text-amber-400">
              {repo.name}
            </h3>
          </div>

          <p
            className={`mb-4 text-sm text-text-secondary ${
              featured ? "line-clamp-3" : "line-clamp-2"
            }`}
            dangerouslySetInnerHTML={renderHTML(repo.description, "No description available.")}
          />

          <div className="flex items-center gap-4 text-xs text-text-muted">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: languages[repo.language] || "#666" }}
                />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              {repo.stargazers_count}
            </span>
            <span>{formatDate(repo.updated_at)}</span>
          </div>

          <span className="mt-3 inline-flex items-center gap-1 text-xs text-amber-500/0 transition-all group-hover:text-amber-500/70">
            View Details
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-7-7m7 7l-7 7" />
            </svg>
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-white/[0.04] bg-bg-secondary/50 p-6">
      <div className="mb-4 h-5 w-2/3 rounded bg-white/5" />
      <div className="mb-2 h-4 w-full rounded bg-white/5" />
      <div className="mb-4 h-4 w-4/5 rounded bg-white/5" />
      <div className="flex gap-4">
        <div className="h-3 w-16 rounded bg-white/5" />
        <div className="h-3 w-12 rounded bg-white/5" />
      </div>
    </div>
  );
}

export default function Projects({ repos, loading }: ProjectsProps) {
  const [filter, setFilter] = useState<string>("All");

  const filtered = repos.filter((repo) => {
    if (filter === "All") return true;
    if (filter === "Other") {
      return (
        repo.language &&
        !["Python", "TypeScript", "JavaScript", "PHP"].includes(repo.language)
      );
    }
    return repo.language === filter;
  });

  const filters = ["All", "Python", "TypeScript", "JavaScript", "PHP", "Other"];

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <SectionHeading number="02" title="Projects" />

      {!loading && repos.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => {
            const count =
              f === "All"
                ? repos.length
                : repos.filter((r) => {
                    if (f === "Other")
                      return r.language && !["Python", "TypeScript", "JavaScript", "PHP"].includes(r.language);
                    return r.language === f;
                  }).length;
            if (count === 0 && f !== "All") return null;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                  filter === f
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                    : "text-text-muted border border-white/[0.04] hover:border-white/10 hover:text-text-secondary"
                }`}
              >
                {f}
                <span className="ml-1 text-text-muted">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : repos.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.04] bg-bg-secondary/50 p-12 text-center">
          <p className="text-text-secondary">No public repositories found.</p>
          <a
            href="https://github.com/Anas-KhanWP"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-amber-500 hover:underline"
          >
            View GitHub Profile
          </a>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.04] bg-bg-secondary/50 p-12 text-center">
          <p className="text-text-secondary">No repositories match this filter.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((repo, i) => {
              const mostStars = Math.max(...filtered.map((r) => r.stargazers_count));
              return (
                <TiltCard
                  key={repo.id}
                  repo={repo}
                  index={i}
                  featured={repo.stargazers_count === mostStars && mostStars > 0 && i === 0}
                />
              );
            })}
          </div>
          {repos.length > 0 && (
            <div className="mt-10 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-amber-500/20 px-6 py-3 text-sm font-medium text-amber-500 transition-all hover:bg-amber-500/5 hover:border-amber-500/40"
              >
                View All Projects
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-7-7m7 7l-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
