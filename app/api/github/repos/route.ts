import { NextResponse } from "next/server";
import { GitHubRepo } from "@/lib/types";
import { getRedis } from "@/lib/redis";
import { fetchRepos } from "@/lib/github";

const CACHE_TTL = 3600;

function cacheKey() {
  return `repos:${process.env.GITHUB_USERNAME || "default"}:home:v2`;
}

export async function GET() {
  try {
    const redis = getRedis();
    if (redis) {
      const cached = await redis.get<GitHubRepo[]>(cacheKey());
      if (cached) {
        return NextResponse.json(cached);
      }
    }

    const data = await fetchRepos(6);

    if (redis && data.length > 0) {
      await redis.set(cacheKey(), data, { ex: CACHE_TTL });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
