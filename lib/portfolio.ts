import { PortfolioConfig } from "./types";

export const portfolioConfig: PortfolioConfig = {
  name: "Anas Khan",
  title: "Full Stack Software Engineer",
  tagline:
    "Building AI-powered apps & scalable full-stack solutions. 7+ years freelance + enterprise.",
  photo: "/photo.png",
  resumeUrl: "/resume.pdf",
  bio: [
    "I'm a full-stack software engineer specializing in AI-powered applications. With 7+ years of freelance and enterprise experience, I build everything from custom WordPress and Odoo solutions to modern React/Next.js apps and AI-driven systems.",
    "I bring a versatile stack — Python, JavaScript, PHP/Laravel, and cloud infrastructure — to deliver scalable, high-performance digital products. Whether it's an intelligent automation pipeline or a pixel-perfect frontend, I focus on clean architecture and real business impact.",
  ],
  socials: {
    github: "https://github.com/Anas-KhanWP",
    linkedin: "https://www.linkedin.com/in/anas-khan-mak",
    email: "anaskhanwp@gmail.com",
    devto: "https://dev.to/anaskhanwp",
  },
  skills: [
    {
      name: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Framer Motion",
        "Redux",
      ],
    },
    {
      name: "Backend",
      items: [
        "Python",
        "Node.js",
        "FastAPI",
        "Django",
        "Flask",
        "PHP / Laravel",
        "PostgreSQL",
        "MongoDB",
        "MySQL",
        "Redis",
        "GraphQL",
      ],
    },
    {
      name: "AI / ML",
      items: [
        "OpenAI API",
        "LangChain",
        "Deep Learning",
        "RAG",
        "Hugging Face",
        "Pandas",
        "Prompt Engineering",
      ],
    },
    {
      name: "CMS & ERP",
      items: [
        "WordPress",
        "WooCommerce",
        "Odoo ERP",
        "Custom Plugins",
        "Theme Development",
      ],
    },
    {
      name: "DevOps & Cloud",
      items: [
        "Docker",
        "AWS",
        "Azure",
        "GCP",
        "Vercel",
        "Git",
        "CI/CD",
        "Linux",
      ],
    },
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "ARYtech",
      period: "Sep 2025 — Present",
      description: [
        "Developing and maintaining full-stack web applications using modern JavaScript frameworks",
        "Collaborating with cross-functional teams to deliver high-quality software solutions",
      ],
      tech: ["React", "Next.js", "Python", "TypeScript"],
    },
    {
      role: "Freelance Full-Stack Developer",
      company: "Freelance",
      period: "May 2019 — Present",
      description: [
        "Delivered 50+ projects across WordPress, Odoo, Python, AI/ML, PHP/Laravel, React.js, and Next.js for clients worldwide",
        "Built scalable eCommerce platforms, custom ERP modules, and AI-powered automation tools",
        "Developed custom REST APIs, optimized database performance, and deployed on AWS/Azure/GCP",
      ],
      tech: [
        "React",
        "Next.js",
        "Python",
        "WordPress",
        "Odoo",
        "Laravel",
        "Docker",
        "AWS",
      ],
    },
    {
      role: "AI Engineer",
      company: "ARY SERVICES LIMITED",
      period: "Feb 2025 — Sep 2025",
      description: [
        "Developed AI-driven features and deep learning models for business applications",
        "Built and deployed Python-based microservices for intelligent data processing",
      ],
      tech: ["Python", "Deep Learning", "FastAPI"],
    },
    {
      role: "Junior Python Developer",
      company: "ARY SERVICES LIMITED",
      period: "Oct 2022 — Mar 2025",
      description: [
        "Built REST APIs with FastAPI and Pandas for data processing pipelines",
        "Contributed to backend architecture, database design, and code reviews",
      ],
      tech: ["Python", "FastAPI", "Pandas", "PostgreSQL"],
    },
    {
      role: "Intern",
      company: "ARY SERVICES LIMITED",
      period: "Jun 2022 — Aug 2022",
      description: [
        "Developed web applications using Python and Flask framework",
        "Gained hands-on experience with version control and agile development practices",
      ],
      tech: ["Python", "Flask", "Git"],
    },
  ],
  blogFallback: [
    {
      title: "Building AI-Powered Apps with Next.js and LangChain",
      url: "https://dev.to/anaskhanwp/building-ai-powered-apps",
      description:
        "A practical guide to integrating LLMs into modern web applications.",
      published_at: "2026-06-15",
      tags: ["nextjs", "ai", "langchain"],
    },
    {
      title: "TypeScript Patterns for Scalable React Applications",
      url: "https://dev.to/anaskhanwp/typescript-patterns-react",
      description:
        "Advanced TypeScript patterns I use daily in production React apps.",
      published_at: "2026-05-20",
      tags: ["typescript", "react", "architecture"],
    },
  ],
};
