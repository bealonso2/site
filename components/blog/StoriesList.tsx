import { config } from "@/config";
import { unstable_cache } from "next/cache";

const fetchPosts = unstable_cache(
  async () => {
    try {
      const res = await fetch(
        `${config.ghost_url}/ghost/api/content/posts/?key=${process.env.GHOST_CONTENT_API_KEY}&include=tags`,
      );
      const data = await res.json();
      return data.posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  },
  ["posts"],
  { revalidate: false, tags: ["posts"] },
);

export const StoriesList = async () => {
  // Fetch the stories
  const posts = await fetchPosts();
  const postsFiltered = posts.filter(
    (post: any) =>
      post.tags && post.tags.some((tag: any) => tag.name === "Short Stories"),
  );

  console.log(postsFiltered.length);
  if (!postsFiltered.length) {
    return (
      <p>
        <a href={config.ghost_url} target="_blank" rel="noopener noreferrer">
          Find my short stories here.
        </a>
      </p>
    );
  }

  // Return the stories
  return (
    <ul>
      {postsFiltered
        .sort(
          (a: any, b: any) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime(),
        )
        .slice(0, 5)
        .map((post: any, index: number) => (
          <li key={post.id}>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
            {index === 0 && " - New!"}
          </li>
        ))}
    </ul>
  );
};
