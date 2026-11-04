// npm run publish "content/posts/My Post.md"
//
// Publishes a post (or locks in a page) by writing its front matter:
//   title:     kept if set, otherwise the filename ("My Post")
//   permalink: kept if set, otherwise the slugified title (/my-post/)
//   date:      now, in this computer's timezone
//   updated:   same as date
// Refuses if the file already has a `date:` (it's already published; use `npm run update`).
// The feed and lists pick the post up on the next `npm run build`.
import path from "node:path";
import {
  allContentFiles,
  fail,
  getField,
  nowStamp,
  readDoc,
  resolveContentFile,
  setField,
  slugify,
  writeDoc,
  yamlString,
  CONTENT_DIR,
} from "./frontmatter.js";

const file = resolveContentFile(process.argv[2]);
const doc = readDoc(file);
const name = path.relative(CONTENT_DIR, file);

const published = getField(doc, "date");
if (published) fail(`${name} is already published (date: ${published}). Use  npm run update  to mark it edited.`);

const title = getField(doc, "title") || path.basename(file).replace(/\.(md|liquid)$/, "");
const permalink = getField(doc, "permalink") || `/${slugify(title)}/`;
if (permalink === "//") fail(`Can't make a URL from the title "${title}". Add a permalink: to ${name}.`);

const taken = allContentFiles().find(
  (other) => other !== file && getField(readDoc(other), "permalink") === permalink,
);
if (taken) fail(`${permalink} is already used by ${path.relative(CONTENT_DIR, taken)}. Change the title or add a different permalink: to ${name}.`);

const stamp = nowStamp();
if (!getField(doc, "title")) setField(doc, "title", yamlString(title));
if (!getField(doc, "permalink")) setField(doc, "permalink", permalink, "title");
setField(doc, "date", stamp, "permalink");
setField(doc, "updated", stamp, "date");
writeDoc(file, doc);

console.log(`✓ Published ${name}`);
console.log(`  title:     ${title}`);
console.log(`  permalink: ${permalink}`);
console.log(`  date:      ${stamp}`);
const isPost = name.startsWith(`posts${path.sep}`);
if (isPost && !getField(doc, "tags")) {
  console.log("  ! No tags: it will be on /all/ and in the feed, but not on /blog/ or /short-stories/.");
}
if (!isPost) console.log("  (Pages are always built; this just locks in the title, URL and dates.)");
console.log("  Run  npm run build  to update the site and feed.");
