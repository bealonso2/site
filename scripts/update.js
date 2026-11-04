// npm run update "content/about.md" ["content/ideas.md" ...]
//
// Marks published pages or posts as edited: sets `updated:` to now, in this computer's
// timezone. Only bump it for changes readers should notice — feed readers may show the
// post as updated. Refuses files that were never published (use `npm run publish`).
import path from "node:path";
import { fail, getField, nowStamp, readDoc, resolveContentFile, setField, writeDoc, CONTENT_DIR } from "./frontmatter.js";

const args = process.argv.slice(2);
if (!args.length) fail('Give the file(s) to mark as edited, e.g.  npm run update "content/about.md"');

// Check every file before changing any, so a typo in one doesn't leave the rest half-done.
const files = args.map((arg) => {
  const file = resolveContentFile(arg);
  const doc = readDoc(file);
  const name = path.relative(CONTENT_DIR, file);
  if (!getField(doc, "date")) fail(`${name} was never published. Run  npm run publish "content/${name}"  first.`);
  return { file, doc, name };
});

const stamp = nowStamp();
for (const { file, doc, name } of files) {
  const previous = getField(doc, "updated");
  setField(doc, "updated", stamp, "date");
  writeDoc(file, doc);
  console.log(`✓ Updated ${name}  (${previous ?? "never"} → ${stamp})`);
}
console.log("  Run  npm run build  to update the site and feed.");
