"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { BlogPost } from "@/lib/types";
import { portfolioConfig } from "@/lib/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

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

function BlogCard({
  post,
  index,
  featured,
}: {
  post: BlogPost;
  index: number;
  featured?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-xl border transition-all hover:border-amber-500/20 ${
        featured
          ? "border-white/[0.04] bg-bg-secondary/50 md:col-span-2"
          : "border-white/[0.04] bg-bg-secondary/50"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="p-6">
        <h3
          className={`font-semibold text-text-primary transition-colors group-hover:text-amber-400 ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          {post.title}
        </h3>
        <p
          className={`mt-2 text-text-secondary ${
            featured ? "line-clamp-3" : "line-clamp-2"
          } text-sm`}
        >
          {post.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-xs text-text-muted">
            {formatDate(post.published_at)}
          </span>
          {post.tags.slice(0, featured ? 4 : 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs text-amber-500"
            >
              {tag}
            </span>
          ))}
        </div>
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const articles: BlogPost[] = data.map((article: any) => ({
        title: article.title,
        url: article.url,
        description: article.description,
        published_at: article.published_at,
        tags: article.tag_list || [],
        image: article.cover_image,
      }));

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
      <SectionHeading number="05" title="Blog" />

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-white/[0.04] bg-bg-secondary/50 p-6"
            >
              <div className="mb-4 h-5 w-3/4 rounded bg-white/5" />
              <div className="mb-2 h-4 w-full rounded bg-white/5" />
              <div className="mb-4 h-4 w-2/3 rounded bg-white/5" />
              <div className="h-3 w-28 rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.04] bg-bg-secondary/50 p-12 text-center">
          <p className="text-text-secondary">No blog posts yet. Coming soon!</p>
        </div>
      ) : (
        <>
          {error && (
            <p className="mb-4 text-sm text-text-muted">
              Could not reach Dev.to. Showing fallback articles.
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <BlogCard
                key={post.url}
                post={post}
                index={i}
                featured={i === 0 && posts.length >= 3}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
