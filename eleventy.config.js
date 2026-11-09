import pluginRss from "@11ty/eleventy-plugin-rss";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import site from "./content/_data/site.js";

// "01 Apr, 2026" — Bear's default "d M, Y" format, shown in site.timezone.
const formatOptions = { day: "2-digit", month: "short", year: "numeric" };
const inSiteTimezone = new Intl.DateTimeFormat("en-GB", { ...formatOptions, timeZone: site.timezone });
// YAML reads a date with no time (`2026-10-15`) as midnight UTC. Show those as the
// calendar date written, rather than shifting them to the previous day.
const asWritten = new Intl.DateTimeFormat("en-GB", { ...formatOptions, timeZone: "UTC" });
const isDateOnly = (d) => d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0;

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("content/img");
  eleventyConfig.addPassthroughCopy("content/styles");

  // Footnotes, and heading ids (`## Work` gets id="work") so #links to sections work.
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItFootnote);
    md.use(markdownItAnchor, { slugify: eleventyConfig.getFilter("slugify"), tabIndex: false });
  });

  eleventyConfig.addFilter("bearDate", (value) => {
    const date = new Date(value);
    const format = isDateOnly(date) ? asWritten : inSiteTimezone;
    const parts = Object.fromEntries(format.formatToParts(date).map((p) => [p.type, p.value]));
    return `${parts.day} ${parts.month}, ${parts.year}`;
  });

  // Provides the htmlToAbsoluteUrls and dateToRfc3339 filters used in feed.njk and sitemap.njk.
  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: { input: "content" },
  };
}
