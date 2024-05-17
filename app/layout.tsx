import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brian Alonso",
  description: "Stress engineer at Collier Aerospace",
  authors: [{ name: "Brian Alonso", url: "https://alonsodev.co" }],
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        rel: "icon",
        sizes: "16x16",
      },
      {
        url: "/favicon.ico",
        rel: "icon",
        sizes: "32x32",
      },
    ],
    apple: [
      {
        url: "/favicon.ico",
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} day`}>{children}</body>
    </html>
  );
}
