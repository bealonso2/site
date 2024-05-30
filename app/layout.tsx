import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const links = [
  {
    name: "X",
    url: "https://x.com/thebrianalonso",
  },
  {
    name: "Blog",
    url: "https://blog.balonso.com",
  },
  {
    name: "Projects",
    links: [
      {
        name: "Random Footballer",
        url: "https://randomfootballer.com",
      },
      {
        name: "Do Not Waste Your Life",
        url: "https://donotwasteyourlife.com",
      },
    ],
  },
  {
    name: "Products",
    links: [
      {
        name: "LuckyLink",
        url: "https://luckylink.app",
      },
      {
        name: "EarthWallet",
        url: "https://earthwallet.app",
      },
    ],
  },
];

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
      <body className={inter.className}>
        <header className="navbar bg-neutral text-neutral-content">
          <div className="navbar-start">
            <a href="/" className="btn btn-ghost text-xl">
              Brian Alonso
            </a>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1">
              {links.map((link) => (
                <li key={link.name}>
                  {link.links ? (
                    <details>
                      <summary>{link.name}</summary>
                      <ul>
                        {link.links.map((sublink) => (
                          <li key={sublink.name}>
                            <a href={sublink.url} target="_blank">
                              {sublink.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <a href={link.url} target="_blank">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-shrink md:navbar-end">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="light"
              />

              {/* sun icon */}
              <svg
                className="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
          <div className="navbar-end md:hidden">
            <div className="dropdown relative">
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
                    <ul className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box absolute right-0">
                      {links.map((link) => (
                        <li key={link.name}>
                          {link.links ? (
                            <details>
                              <summary>{link.name}</summary>
                              <ul>
                                {link.links.map((sublink) => (
                                  <li key={sublink.name}>
                                    <a href={sublink.url} target="_blank">
                                      {sublink.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : (
                            <a href={link.url} target="_blank">
                              {link.name}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
        </header>
        {children}
        <footer className="">
          <div className="font-mono fixed bottom-0 left-0 flex h-auto w-full items-end justify-center">
            <span className="flex items-center py-5">
              Follow me on
              <a
                href="https://x.com/thebrianalonso"
                target="_blank"
                className="p-1.5 w-auto"
              >
                <svg
                  width="16"
                  height="16"
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
              and
              <a
                href="https://github.com/bealonso2"
                target="_blank"
                className="p-1.5 w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <title>Link to GitHub account</title>
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
