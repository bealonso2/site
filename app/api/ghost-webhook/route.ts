import crypto from "crypto";
import { revalidateTag } from "next/cache";

const SECRET = process.env.GHOST_WEBHOOK_SECRET as string;
if (!SECRET) {
  throw new Error("Missing GHOST_WEBHOOK_SECRET environment variable");
}

export async function POST(request: Request) {
  const rawBody = await request.text(); // Get raw request body
  const signature = request.headers.get("x-ghost-signature"); // Get signature from Ghost

  // Verify the signature
  if (!signature) {
    return new Response("Missing signature", {
      status: 400,
    });
  }

  // Compute HMAC hash using the secret and the raw request body
  const hmac = crypto
    .createHmac("sha256", SECRET)
    .update(rawBody)
    .digest("hex");
  const expectedSignature = `sha256=${hmac}`;

  if (signature !== expectedSignature) {
    return new Response("Invalid signature", {
      status: 403,
    });
  }

  // Parse the request body
  const body = JSON.parse(rawBody);

  // Verify the event type before invalidating the cache
  if (body.event === "post.published") {
    // Invalidate all data tagged with 'posts' in the cache
    revalidateTag("posts");
  }

  return new Response("Webhook received", {
    status: 200,
  });
}
