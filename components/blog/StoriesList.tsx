import { config } from "@/config";
import { titleCase } from "title-case";
import { parseStringPromise } from "xml2js";

async function fetchPosts() {
  const res = await fetch(`${config.ghost_url}/sitemap-posts.xml`, {
    next: { revalidate: 3600 }, // Re-fetch every hour
  });

  if (!res.ok) throw new Error("Failed to fetch sitemap");

  const xml = await res.text();
  const result = await parseStringPromise(xml);

  return result.urlset.url.map((entry: any) => ({
    url: entry.loc[0],
    lastmod: entry.lastmod ? entry.lastmod[0] : null,
  }));
}

function getPostTitleFromUrl(url: string) {
  // Strip the base URL and trailing slash
  url = url.replace(config.ghost_url, "");
  url = url.replace(/\/$/, "");

  // Make the url title case
  url = url.replace(/-/g, " ");
  return titleCase(url);
}

export const StoriesList = async () => {
  const posts = await fetchPosts();

  if (!posts.length) {
    return (
      <p>
        <a href={config.ghost_url} target="_blank" rel="noopener noreferrer">
          Find my short stories here.
        </a>
      </p>
    );
  }

  // Sort the posts by last modified date
  posts.sort((a: any, b: any) => {
    if (!a.lastmod) return 1;
    if (!b.lastmod) return -1;
    return new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime();
  });

  // Return the stories
  return (
    <ul>
      {posts.slice(0, 5).map((post: any, index: number) => (
        <li key={post.url}>
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            {getPostTitleFromUrl(post.url)}
          </a>
          {index === 0 && " - New!"}
        </li>
      ))}
    </ul>
  );
};
