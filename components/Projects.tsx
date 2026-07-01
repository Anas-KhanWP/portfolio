"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { GitHubRepo } from "@/lib/types";
import { renderHTML } from "@/lib/utils";

interface ProjectsProps {
  repos: GitHubRepo[];
  loading: boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
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
};

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${repo.name}`}
        className="group block rounded-xl border border-white/5 bg-bg-secondary p-6 transition-all hover:border-accent/30 hover:bg-white/[0.03]"
      >
        <div className="mb-3 flex items-center gap-3">
          <svg
            className="h-5 w-5 text-text-secondary transition-colors group-hover:text-accent"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 11-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
          </svg>
          <h3 className="font-semibold text-text-primary truncate group-hover:text-accent">
            {repo.name}
          </h3>
        </div>

        <p
          className="mb-4 line-clamp-2 text-sm text-text-secondary"
          dangerouslySetInnerHTML={renderHTML(repo.description, "No description available.")}
        />

        <div className="flex items-center gap-4 text-xs text-text-secondary">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{
                  backgroundColor: languages[repo.language] || "#666",
                }}
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
      </Link>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-white/5 bg-bg-secondary p-6">
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
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <h2 className="section-heading">
        Projects<span className="text-accent">.</span>
      </h2>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : repos.length === 0 ? (
        <div className="rounded-xl border border-white/5 bg-bg-secondary p-12 text-center">
          <p className="text-text-secondary">
            No public repositories found. Check back soon!
          </p>
          <a
            href="https://github.com/Anas-KhanWP"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-accent hover:underline"
          >
            View GitHub Profile
          </a>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
          {repos.length > 0 && (
            <div className="mt-8 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium transition-all hover:border-accent/50 hover:bg-accent/10"
              >
                View All Projects
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m0 0l-7-7m7 7l-7 7"
                  />
                </svg>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
