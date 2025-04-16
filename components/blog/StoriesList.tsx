import { config } from "@/config";
import Parser from "rss-parser";

// Revalidate every day
export const revalidate = 60 * 60 * 24;

async function fetchPosts(): Promise<
  { url: string; lastmod: string; title: string }[]
> {
  const parser: Parser = new Parser({});
  const feedUrl = `${config.bearblog_url}feed/?q=short-stories`;

  const feed = await parser.parseURL(feedUrl);

  if (!feed.items) {
    throw new Error("Failed to fetch posts");
  }

  return feed.items.map((entry: any) => ({
    url: entry.link,
    lastmod: entry.isoDate,
    title: entry.title,
  }));
}

export const StoriesList = async () => {
  const posts = await fetchPosts();

  if (!posts.length) {
    return (
      <p>
        <a href={config.bearblog_url} target="_blank" rel="noopener">
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
          <a href={post.url} target="_blank" rel="noopener">
            {post.title}
          </a>
          {index === 0 && " - New!"}
        </li>
      ))}
    </ul>
  );
};
