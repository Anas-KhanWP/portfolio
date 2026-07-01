"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { BlogPost } from "@/lib/types";
import { portfolioConfig } from "@/lib/portfolio";

interface BlogProps {
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const DEVTO_USERNAME = "anaskhanwp";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-white/5 bg-bg-secondary p-6 transition-all hover:border-accent/30 hover:bg-white/[0.03]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <h3 className="mb-2 font-semibold text-text-primary transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm text-text-secondary">
        {post.description}
      </p>
      <div className="flex items-center gap-3 text-xs text-text-secondary">
        <span>{formatDate(post.published_at)}</span>
        <span>·</span>
        <span>{post.tags.slice(0, 2).join(", ")}</span>
      </div>
    </motion.a>
  );
}

export default function Blog({ posts, setPosts }: BlogProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBlogPosts = useCallback(async () => {
    try {
      const res = await fetch(
        `https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=4`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      const articles: BlogPost[] = data.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (article: any) => ({
          title: article.title,
          url: article.url,
          description: article.description,
          published_at: article.published_at,
          tags: article.tag_list || [],
          image: article.cover_image,
        })
      );

      if (articles.length > 0) {
        setPosts(articles);
      } else {
        setPosts(portfolioConfig.blogFallback);
      }
    } catch {
      setPosts(portfolioConfig.blogFallback);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [setPosts]);

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <h2 className="section-heading">
        Blog<span className="text-accent">.</span>
      </h2>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-white/5 bg-bg-secondary p-6"
            >
              <div className="mb-4 h-5 w-3/4 rounded bg-white/5" />
              <div className="mb-2 h-4 w-full rounded bg-white/5" />
              <div className="mb-4 h-4 w-2/3 rounded bg-white/5" />
              <div className="h-3 w-28 rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-xl border border-white/5 bg-bg-secondary p-12 text-center">
          <p className="text-text-secondary">
            No blog posts yet. Coming soon!
          </p>
        </div>
      ) : (
        <>
          {error && (
            <p className="mb-4 text-sm text-text-secondary">
              Could not reach Dev.to. Showing fallback articles.
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <BlogCard key={post.url} post={post} index={i} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
