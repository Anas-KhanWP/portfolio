import { NextResponse } from "next/server";
import { GitHubRepoDetail } from "@/lib/types";
import { redis } from "@/lib/redis";
import { fetchRepoDetail } from "@/lib/github";

const CACHE_TTL = 3600;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  try {
    const cacheKey = `repos:${process.env.GITHUB_USERNAME || "default"}:${name}`;

    if (redis) {
      const cached = await redis.get<GitHubRepoDetail>(cacheKey);
      if (cached) {
        return NextResponse.json(cached);
      }
    }

    const data = await fetchRepoDetail(name);

    if (!data) {
      return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    }

    if (redis) {
      await redis.set(cacheKey, data, { ex: CACHE_TTL });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch repository" }, { status: 500 });
  }
}
