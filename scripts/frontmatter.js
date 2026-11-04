// Small helpers for reading and editing the front matter of files in content/.
// Edits are line-based so everything else in the file (comments, key order, line
// endings) is left exactly as it was.
import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import slugifyText from "@sindresorhus/slugify";

export const CONTENT_DIR = path.resolve(import.meta.dirname, "..", "content");

// Same settings as 11ty's built-in `slugify` filter, so URLs match what the site makes.
export const slugify = (text) => slugifyText(String(text), { decamelize: false });

// Resolve a path given on the command line and make sure it's a page or post in content/.
export function resolveContentFile(arg) {
  if (!arg) fail("Give the file to work on, e.g.  npm run publish \"content/posts/My Post.md\"");
  // npm runs scripts from the project root; INIT_CWD is the folder you ran npm from.
  const file = path.resolve(process.env.INIT_CWD ?? process.cwd(), arg);
  const rel = path.relative(CONTENT_DIR, file);
  if (rel.startsWith("..") || path.isAbsolute(rel)) fail(`${arg} isn't inside content/.`);
  if (rel.startsWith("_")) fail(`${arg} is a template or data file, not a page or post.`);
  if (!/\.(md|liquid)$/.test(file)) fail(`${arg} isn't a .md or .liquid file.`);
  return file;
}

export function readDoc(file) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    fail(`Can't read ${file}.`);
  }
  // Use the first line's ending: some files have a Unix front matter and a Windows body.
  const nl = text[text.indexOf("\n") - 1] === "\r" ? "\r\n" : "\n";
  const lines = text.split(nl);
  if (lines[0] !== "---") return { nl, front: [], body: text, hadFront: false };
  const end = lines.indexOf("---", 1);
  if (end === -1) fail(`${file} starts a front matter block (---) but never closes it.`);
  return { nl, front: lines.slice(1, end), body: lines.slice(end + 1).join(nl), hadFront: true };
}

export function writeDoc(file, doc) {
  const { nl, front, body } = doc;
  const block = ["---", ...front, "---"].join(nl);
  const rest = doc.hadFront ? body : nl + body; // keep a blank line after a newly added block
  writeFileSync(file, block + nl + rest);
}

// The raw value of a top-level key, with YAML quotes removed. Undefined if absent.
export function getField(doc, key) {
  const line = doc.front.find((l) => l.startsWith(`${key}:`));
  if (line === undefined) return undefined;
  const raw = line.slice(key.length + 1).trim();
  if (raw.startsWith('"')) return JSON.parse(raw);
  if (raw.startsWith("'")) return raw.slice(1, -1).replaceAll("''", "'");
  return raw;
}

// Replace a top-level key's value, or add the key after `after` (or at the end).
export function setField(doc, key, value, after) {
  const line = `${key}: ${value}`;
  const index = doc.front.findIndex((l) => l.startsWith(`${key}:`));
  if (index !== -1) {
    doc.front[index] = line;
    return;
  }
  const afterIndex = after ? doc.front.findIndex((l) => l.startsWith(`${after}:`)) : -1;
  doc.front.splice(afterIndex === -1 ? doc.front.length : afterIndex + 1, 0, line);
}

// Quote a string for YAML only when it needs it (e.g. "White Mirror I: Prelude").
export function yamlString(text) {
  const plain = /^[^\s"'#&*!|>%@`{}[\],?:-][^#]*$/.test(text) && !/: |:$|\s$/.test(text);
  return plain ? text : JSON.stringify(text);
}

// Now, in this computer's timezone, with its offset: 2026-11-03T18:45:12-05:00.
export function nowStamp() {
  const now = new Date();
  const pad = (n) => String(Math.abs(n)).padStart(2, "0");
  const offset = -now.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  return (
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
    `T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` +
    `${sign}${pad(Math.trunc(offset / 60))}:${pad(offset % 60)}`
  );
}

// Files listed in .eleventyignore (one path per line, relative to the project root).
const ROOT = path.dirname(CONTENT_DIR);
const ignored = new Set(
  (existsSync(path.join(ROOT, ".eleventyignore")) ? readFileSync(path.join(ROOT, ".eleventyignore"), "utf8") : "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => path.resolve(ROOT, line)),
);

// Every page and post in content/ (not templates or data in _ folders, nor ignored files).
export function allContentFiles(dir = CONTENT_DIR) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("_") || entry.name.startsWith(".") || ignored.has(full)) return [];
    if (entry.isDirectory()) return allContentFiles(full);
    return /\.(md|liquid)$/.test(entry.name) ? [full] : [];
  });
}

export function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}
