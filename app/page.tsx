"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { GitHubRepo, BlogPost } from "@/lib/types";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoadingRepos(false);
      })
      .catch(() => {
        setLoadingRepos(false);
      });
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <LayoutGroup>
          <Navbar />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Hero />
            <About />
            <Projects repos={repos} loading={loadingRepos} />
            <Skills />
            <Experience />
            <Blog posts={blogPosts} setPosts={setBlogPosts} />
            <Contact />
          </motion.main>
          <Footer />
        </LayoutGroup>
      )}
    </>
  );
}
