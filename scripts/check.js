// npm run check   (also runs at the start of every `npm run build`)
//
// Every page and post must have title, permalink, date and updated in its front matter,
// with valid dates, `updated` no earlier than `date`, and no two files sharing a URL.
// New posts get all four from  npm run publish "content/posts/My Post.md".
import path from "node:path";
import { allContentFiles, getField, readDoc, CONTENT_DIR } from "./frontmatter.js";

const problems = [];
const urls = new Map();

for (const file of allContentFiles()) {
  const name = path.relative(CONTENT_DIR, file);
  const doc = readDoc(file);
  const missing = ["title", "permalink", "date", "updated"].filter((key) => !getField(doc, key));
  if (missing.length) {
    const hint = name.startsWith(`posts${path.sep}`) && missing.includes("date") ? `  (run: npm run publish "content/${name}")` : "";
    problems.push(`${name}: missing ${missing.join(", ")}${hint}`);
    continue;
  }

  const date = new Date(getField(doc, "date"));
  const updated = new Date(getField(doc, "updated"));
  if (isNaN(date)) problems.push(`${name}: date isn't a valid date (${getField(doc, "date")})`);
  if (isNaN(updated)) problems.push(`${name}: updated isn't a valid date (${getField(doc, "updated")})`);
  if (updated < date) problems.push(`${name}: updated (${getField(doc, "updated")}) is before date (${getField(doc, "date")})`);

  const url = getField(doc, "permalink");
  if (urls.has(url)) problems.push(`${name}: permalink ${url} is also used by ${urls.get(url)}`);
  urls.set(url, name);
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem${problems.length === 1 ? "" : "s"} in content/:`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log(`✓ ${urls.size} pages and posts have title, permalink, date and updated.`);
