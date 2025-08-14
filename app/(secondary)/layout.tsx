import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { NavMenu } from "../../components/layout/NavMenu";

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
        url: "/favicon-16x16.png",
        rel: "icon",
        sizes: "16x16",
      },
      {
        url: "/favicon-32x32.png",
        rel: "icon",
        sizes: "32x32",
      },
      {
        url: "/android-chrome-192x192.png",
        rel: "android-chrome",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        rel: "android-chrome",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
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
    <html lang="en" className="bg-base-200" suppressHydrationWarning>
      <body className={`${RobotoFlex.className} font-light`}>
        <header className="navbar px-4">
          <div className="navbar-start">
            <a href="/" className="btn btn-ghost hidden text-xl md:flex">
              Brian Alonso
            </a>
            <a href="/" className="btn btn-ghost text-xl md:hidden">
              BA
            </a>
          </div>
          <div className="navbar-end hidden md:flex">
            <NavMenu className="menu menu-horizontal px-1" />
          </div>
          <div className="navbar-end md:hidden">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary className="">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </summary>
                  <NavMenu className="dropdown-content absolute right-0 z-[1] mt-3 rounded-box bg-base-200 p-2 shadow" />
                </details>
              </li>
            </ul>
          </div>
        </header>
        <div className="bg-base-100">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
