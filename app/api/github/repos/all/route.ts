import { NextRequest, NextResponse } from "next/server";
import { GitHubRepo } from "@/lib/types";
import { redis } from "@/lib/redis";
import { fetchAllRepos } from "@/lib/github";

const CACHE_TTL = 3600;

function cacheKey(page: number, perPage: number) {
  return `repos:${process.env.GITHUB_USERNAME || "default"}:page:${page}:${perPage}`;
}

export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const perPage = parseInt(req.nextUrl.searchParams.get("per_page") || "12", 10);

    if (redis) {
      const cached = await redis.get<{ repos: GitHubRepo[]; hasMore: boolean }>(
        cacheKey(page, perPage)
      );
      if (cached) {
        return NextResponse.json(cached);
      }
    }

    const data = await fetchAllRepos(page, perPage);

    if (redis && data.repos.length > 0) {
      await redis.set(cacheKey(page, perPage), data, { ex: CACHE_TTL });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ repos: [], hasMore: false }, { status: 500 });
  }
}
