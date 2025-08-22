import { Metadata } from "next";

interface ImageMetadata {
  path: string;
  width: number;
  height: number;
  alt: string;
}

interface MetadataOptions {
  title?: string;
  description?: string;
  keywords?: string;
  baseUrl?: string;
  canonicalPath?: string;
  opengraphImages?: ImageMetadata[];
  twitterImages?: ImageMetadata[];
}

export function generateMetadata({
  title = "Brian Alonso",
  description = "Human Flourishing for the Benefit of Earth",
  keywords = "Brian Alonso, aerospace engineer, software developer",
  baseUrl = "https://pl.balonso.com",
  canonicalPath = "",
  opengraphImages = [],
  twitterImages = [],
}: MetadataOptions): Metadata {
  const canonicalUrl = `${baseUrl}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images:
        opengraphImages.length > 0
          ? opengraphImages.map((image) => ({
              url: `${baseUrl}${image.path}`,
              width: image.width,
              height: image.height,
              alt: image.alt,
            }))
          : undefined,
    },
    twitter: {
      card: twitterImages.length > 0 ? "summary_large_image" : "summary",
      title,
      description,
      images:
        twitterImages.length > 0
          ? twitterImages.map((image) => ({
              url: `${baseUrl}${image.path}`,
              width: image.width,
              height: image.height,
              alt: image.alt,
            }))
          : undefined,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
