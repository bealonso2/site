import HomePage from "@/components/HomePage";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  twitterImages: [
    {
      path: "/twitter-image.png",
      width: 1200,
      height: 675,
      alt: "Brian Alonso",
    },
  ],
  opengraphImages: [
    {
      path: "/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "Brian Alonso",
    },
  ],
});

export default function Home() {
  return <HomePage />;
}
