import crypto from "crypto";

const SECRET = process.env.GHOST_WEBHOOK_SECRET as string;
const body = JSON.stringify({
  event: "post.published",
});

// Compute HMAC hash using the secret and the raw request body
const hmac = crypto.createHmac("sha256", SECRET).update(body).digest("hex");
const signature = `sha256=${hmac}`;

console.log(`Signature: ${signature}`);
console.log(`Body: ${body}`);
