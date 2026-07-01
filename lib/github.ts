import { GitHubRepo, GitHubRepoDetail } from "./types";

const GITHUB_API = "https://api.github.com";

function getHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

function username() {
  return process.env.GITHUB_USERNAME || "Anas-KhanWP";
}

export async function fetchRepos(count = 6): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username()}/repos?sort=updated&per_page=${count}&type=owner`,
      { headers: getHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    return repos.filter((r) => !r.private);
  } catch {
    return [];
  }
}

export async function fetchAllRepos(
  page = 1,
  perPage = 12
): Promise<{ repos: GitHubRepo[]; hasMore: boolean }> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username()}/repos?sort=updated&per_page=${perPage}&page=${page}&type=owner`,
      { headers: getHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return { repos: [], hasMore: false };

    const link = res.headers.get("link");
    const hasMore = link ? link.includes('rel="next"') : false;

    const repos: GitHubRepo[] = await res.json();
    return { repos: repos.filter((r) => !r.private), hasMore };
  } catch {
    return { repos: [], hasMore: false };
  }
}

export async function fetchRepoDetail(
  repo: string
): Promise<GitHubRepoDetail | null> {
  try {
    const [repoRes, readmeRes] = await Promise.all([
      fetch(`${GITHUB_API}/repos/${username()}/${repo}`, {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      }),
      fetch(`${GITHUB_API}/repos/${username()}/${repo}/readme`, {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      }),
    ]);

    if (!repoRes.ok) return null;

    const detail: GitHubRepoDetail = await repoRes.json();

    if (detail.private) return null;
    if (readmeRes.ok) {
      const readme = await readmeRes.json();
      detail.readme = Buffer.from(readme.content, "base64").toString("utf-8");
    }

    return detail;
  } catch {
    return null;
  }
}

export async function fetchUser() {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username()}`, {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
