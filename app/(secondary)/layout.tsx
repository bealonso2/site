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
        <footer className="footer items-center bg-base-200 p-4">
          <nav className="grid-flow-col gap-4 place-self-center">
            <a href="https://x.com/thebrianalonso" target="_blank">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1200 1227"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Link to X account</title>
                <path
                  d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            {/* <a href="https://youtube.com/@thebrianalonso" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a> */}
            <a href="https://github.com/bealonso2" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <title>Link to GitHub account</title>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
