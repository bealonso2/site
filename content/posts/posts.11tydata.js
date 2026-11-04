// Every file in content/posts/ is a post: rendered with the post layout and included in
// collections.posts (so it's on /all/ and in the feed). Its URL is the `permalink:` in its
// front matter, written by `npm run publish`.
export default {
  layout: "post.liquid",
  tags: ["posts"],
};
