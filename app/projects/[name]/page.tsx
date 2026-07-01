"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { GitHubRepoDetail } from "@/lib/types";
import { renderHTML } from "@/lib/utils";

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
    day: "numeric",
  });
}

interface Props {
  params: Promise<{ name: string }>;
}

export default function ProjectDetailPage({ params }: Props) {
  const { name } = use(params);
  const [repo, setRepo] = useState<GitHubRepoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/github/repos/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setRepo(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20 md:py-32">
        <div className="animate-pulse space-y-6">
          <div className="h-5 w-24 rounded bg-white/5" />
          <div className="h-10 w-2/3 rounded bg-white/5" />
          <div className="h-5 w-full rounded bg-white/5" />
          <div className="h-5 w-4/5 rounded bg-white/5" />
          <div className="mt-8 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-white/5" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error || !repo) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20 md:py-32 text-center">
        <h1 className="text-2xl font-bold">Repository not found</h1>
        <Link
          href="/projects"
          className="mt-4 inline-flex items-center gap-2 text-sm text-amber-500 hover:underline"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
          </svg>
          Back to projects
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-amber-500"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
          </svg>
          All Projects
        </Link>

        <div className="rounded-2xl border border-white/[0.04] bg-bg-secondary/50 p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-2xl font-bold md:text-3xl">{repo.name}</h1>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 rounded-lg border border-amber-500/20 px-4 py-3 sm:py-2 text-sm text-amber-500 transition-all hover:bg-amber-500/5 hover:border-amber-500/40"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
            </a>
          </div>

          {repo.description && (
            <p
              className="mt-2 text-text-secondary"
              dangerouslySetInnerHTML={renderHTML(repo.description, "")}
            />
          )}

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: languages[repo.language] || "#666" }} />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 10-1.5 0v.878a.25.25 0 01-.25.25h-3a.25.25 0 01-.25-.25v-.878a2.25 2.25 0 10-1.5 0zM3.5 3.5a.75.75 0 01.75-.75 2.25 2.25 0 012.121 1.5h4.258a2.25 2.25 0 012.121-1.5.75.75 0 010 1.5 2.25 2.25 0 00-1.5 2.122v.878a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V6.372c0-.2.066-.386.18-.533A2.25 2.25 0 007 5.372v.878a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V5.372c0-.2.066-.386.18-.533A2.25 2.25 0 003.5 3.5z" />
              </svg>
              {repo.forks_count}
            </span>
            <span>{repo.open_issues_count} issues</span>
            <span>Updated {formatDate(repo.updated_at)}</span>
          </div>

          {repo.topics && repo.topics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {repo.topics.map((topic) => (
                <span key={topic} className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-500">
                  {topic}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-text-muted">
            {repo.license && <span>License: {repo.license.name}</span>}
            <span>Default branch: {repo.default_branch}</span>
            <span>Created: {formatDate(repo.created_at)}</span>
          </div>
        </div>

        {repo.homepage && (
          <div className="mt-4">
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-amber-500 hover:underline"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Live Demo: {repo.homepage}
            </a>
          </div>
        )}

        {repo.readme && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 rounded-2xl border border-white/[0.04] bg-bg-secondary/50 p-6 md:p-8"
          >
            <div className="prose prose-invert max-w-none prose-headings:text-text-primary prose-a:text-amber-500 prose-strong:text-text-primary prose-code:text-amber-400 prose-pre:bg-transparent prose-pre:p-0 prose-img:rounded-lg prose-img:mx-auto prose-hr:border-white/[0.04] [&_pre]:border-0">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
              >
                {repo.readme}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
