// npm run check:links   (also runs at the end of every `npm run build`)
//
// Checks every link, image and stylesheet in the built site (_site/) that points within
// the site: the page or file must exist, and a #section must exist on that page.
// Links to other websites aren't checked.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const SITE = path.resolve(import.meta.dirname, "..", "_site");
if (!existsSync(SITE)) {
  console.error("✗ No _site/ folder. Run  npm run build  first.");
  process.exit(1);
}

const htmlFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });

const decode = (text) =>
  text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const idsCache = new Map();
const idsIn = (file) => {
  if (!idsCache.has(file)) {
    const html = readFileSync(file, "utf8");
    idsCache.set(file, new Set([...html.matchAll(/\s(?:id|name)=["']?([^"'\s>]+)/g)].map((m) => decode(m[1]))));
  }
  return idsCache.get(file);
};

// "/blog/" → _site/blog/index.html, "/css/style.css" → _site/css/style.css
function targetFile(urlPath, fromFile) {
  const resolved = urlPath.startsWith("/")
    ? path.join(SITE, decodeURIComponent(urlPath))
    : path.join(path.dirname(fromFile), decodeURIComponent(urlPath));
  if (existsSync(resolved) && statSync(resolved).isDirectory()) return path.join(resolved, "index.html");
  return resolved;
}

const problems = [];
const pages = htmlFiles(SITE);
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const page = "/" + path.relative(SITE, file).replace(/index\.html$/, "");
  for (const [, raw] of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    const url = decode(raw.trim());
    if (/^(https?:|mailto:|tel:|data:)/i.test(url)) continue;
    if (url.startsWith("//")) {
      problems.push(`${page} → ${url}  (starts with //, so browsers treat it as another website; use one /)`);
      continue;
    }
    const [beforeHash, hash] = url.split("#");
    const urlPath = beforeHash.split("?")[0];
    const target = urlPath ? targetFile(urlPath, file) : file;
    if (!existsSync(target)) {
      problems.push(`${page} → ${url}  (no such page or file)`);
    } else if (hash && target.endsWith(".html") && !idsIn(target).has(decodeURIComponent(hash))) {
      problems.push(`${page} → ${url}  (no #${hash} on that page)`);
    }
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} broken link${problems.length === 1 ? "" : "s"} in the built site:`);
  for (const problem of [...new Set(problems)].sort()) console.error(`  ${problem}`);
  process.exit(1);
}
console.log(`✓ All links within the site work (${pages.length} pages checked).`);
