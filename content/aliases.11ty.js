// A page with `alias: now` in its front matter is also served at /now/.
// To update /now, write a new dated page and move `alias: now` to it.
export const data = {
  pagination: {
    data: "collections.all",
    size: 1,
    alias: "target",
    before: (pages) => pages.filter((page) => page.data.alias),
  },
  eleventyExcludeFromCollections: true,
  eleventyComputed: {
    title: (data) => data.target.data.title,
    canonical: (data) => data.target.url,
  },
  permalink: (data) => `/${data.target.data.alias}/`,
};

export function render(data) {
  return data.target.content;
}
