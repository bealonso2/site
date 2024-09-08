import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "../../globals.css";

const RobotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
});

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

export default function Resume({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-base-200" data-theme="light">
      <body className={`${RobotoFlex.className} bg-base-100 font-light`}>
        {children}
      </body>
    </html>
  );
}
