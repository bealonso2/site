import { Metadata } from "next";

interface MetadataOptions {
  title?: string;
  description?: string;
  keywords?: string;
  baseUrl?: string;
  canonicalPath?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  altText?: string;
}

export function generateMetadata({
  title = "Brian Alonso",
  description = "Stress engineer at Collier Aerospace",
  keywords = "Brian Alonso, aerospace engineer, software developer",
  baseUrl = "https://www.balonso.com",
  canonicalPath = "",
  image,
  imageWidth = 800,
  imageHeight = 600,
  altText = "Brian Alonso",
}: MetadataOptions): Metadata {
  const hasImage = image && image.trim() !== "";
  const canonicalUrl = `${baseUrl}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: hasImage
        ? [
            {
              url: image,
              width: imageWidth,
              height: imageHeight,
              alt: altText,
            },
          ]
        : undefined,
    },
    twitter: {
      card: hasImage ? "summary_large_image" : "summary",
      title,
      description,
      images: hasImage ? [image] : undefined,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
