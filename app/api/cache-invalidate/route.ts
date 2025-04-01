import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const CACHE_INVALIDATION_SECRET = process.env.CACHE_INVALIDATION_SECRET;

export async function POST(request: NextRequest) {
  // Verify authorization
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${CACHE_INVALIDATION_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse request body
  const { tag } = await request.json();
  if (!tag || typeof tag !== "string") {
    return NextResponse.json(
      { error: "Invalid or missing cache tag" },
      { status: 400 },
    );
  }

  // Invalidate the cache tag
  revalidateTag(tag);

  // Hard code revalidate pl-prediction routes
  if (tag === "football-data") {
    revalidatePath("/(secondary)/pl-prediction");
  }

  return NextResponse.json(
    { message: `Cache tag '${tag}' successfully invalidated` },
    { status: 200 },
  );
}
