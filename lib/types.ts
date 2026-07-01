export interface PortfolioConfig {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  photo: string;
  resumeUrl?: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
    devto?: string;
  };
  skills: SkillCategory[];
  experience: Experience[];
  blogFallback: BlogPost[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  tech?: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  pushed_at: string;
  watchers_count: number;
  open_issues_count: number;
  default_branch: string;
  license: { spdx_id: string; name: string } | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubRepoDetail extends GitHubRepo {
  readme?: string;
}

export interface BlogPost {
  title: string;
  url: string;
  description: string;
  published_at: string;
  tags: string[];
  image?: string;
}
