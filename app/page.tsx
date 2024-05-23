"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
    themeChange(false); // Initialize theme change
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Prevent mismatch during SSR by only rendering after mounting
  if (!mounted) {
    return null;
  }

  return (
    <div>
      {theme === "light" && (
        <button
          data-set-theme="dark"
          onClick={() => handleThemeChange("dark")}
          className="w-6 h-6"
        >
          <svg
            width="21px"
            height="21px"
            viewBox="0 0 21 21"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <title>Sun icon</title>
            <g
              id="Page-3"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              opacity="0.900000036"
            >
              <g
                id="iPhone-8-Copy-15"
                transform="translate(-302.000000, -48.000000)"
                fill="#221F26"
              >
                <g
                  id="Group-3-Copy"
                  transform="translate(312.677062, 58.357694) rotate(-15.000000) translate(-312.677062, -58.357694) translate(302.677062, 48.357694)"
                >
                  <circle id="Oval-3-Copy" cx="10" cy="10" r="10"></circle>
                </g>
              </g>
            </g>
          </svg>
        </button>
      )}
      {theme === "dark" && (
        <button
          data-set-theme="light"
          onClick={() => handleThemeChange("light")}
          className="w-6 h-6"
        >
          <svg
            viewBox="0 0 24 25"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <title>Moon icon</title>
            <g
              id="Page-3"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Desktop-Copy-8"
                transform="translate(-160.000000, -105.000000)"
                fill="#FFFFFF"
              >
                <g
                  id="Group-3-Copy"
                  transform="translate(171.248050, 117.896900) rotate(-15.000000) translate(-171.248050, -117.896900) translate(160.748050, 105.896900)"
                >
                  <path
                    d="M16.715257,0.9618689 C13.3362372,2.56661875 11,6.01048066 11,10 C11,15.504356 15.447222,19.9700076 20.9445607,19.9998496 C18.7472743,22.4549343 15.5540718,24 12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 C13.6739195,0 15.267788,0.342739111 16.715257,0.9618689 Z"
                    id="Combined-Shape"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
      )}
    </div>
  );
};

// Function to calculate time difference
const calculateTimeDifference = () => {
  const countUpDate = new Date("Jan 25, 2022 09:00:00").getTime();
  const distance = new Date().getTime() - countUpDate;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${days} days, ${hours} hour${
    hours === 1 ? "" : "s"
  }, ${minutes} minute${minutes === 1 ? "" : "s"}, and ${seconds} second${
    seconds === 1 ? "" : "s"
  }`;
};

export default function Home({ initialTime }: { initialTime: string }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    // Call the function immediately upon component mount
    setTime(calculateTimeDifference());

    // Update the count up every 1 second
    const interval = setInterval(() => {
      setTime(calculateTimeDifference());
    }, 1000);

    // Clean up the interval
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-12 pb-24 lg:p-24">
        <div className="z-10 w-full max-w-md lg:max-w-4xl justify-between font-mono text-sm flex flex-col lg:flex-row">
          <div className="flex items-start justify-center w-full lg:mt-24">
            <ThemeSwitcher />
          </div>
          <div className="w-full">
            <div className="my-8 space-y-4">
              <h1 className="text-3xl font-bold">Hi, I'm Brian.</h1>
              <p>
                I've been a stress engineer and plugin developer at{" "}
                <a href="https://collieraerospace.com" target="_blank">
                  Collier Aerospace{" "}
                </a>
                for the last {time}.
              </p>
              <p>
                I live in Raleigh, North Carolina. Keep up with me on{" "}
                <a href="https://x.com/thebrianalonso" target="_blank">
                  X
                </a>{" "}
                and{" "}
                <a href="https://github.com/bealonso2" target="_blank">
                  GitHub
                </a>
                . Read my long-form thoughts on the climate crisis, personal
                development, and software engineering{" "}
                <a href="https://blog.balonso.com">on my blog</a>.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="header-experience">Currently</h2>
              <div className="div-experience">
                <h3 className="">
                  <a href="https://collieraerospace.com" target="_blank">
                    Collier Aerospace
                  </a>
                </h3>
                <h4>Stress Engineer</h4>
                <h4>Plugin Developer</h4>
                <h5 className="date-experience">2022-Present</h5>
              </div>
              <h2 className="header-experience">Previously</h2>
              <div className="div-experience">
                <h3 className="">
                  <a href="https://www.spiritaero.com" target="_blank">
                    Spirit Aerosystems
                  </a>
                </h3>
                <h4>Design Engineer Intern</h4>
                <h5 className="date-experience">2021</h5>
              </div>
              <div className="div-experience">
                <h3 className="">
                  <a href="https://liquidrocketry.com/" target="_blank">
                    Liquid Rocketry Lab
                  </a>
                </h3>
                <h4>Principal Structures Engineer</h4>
                <h5 className="date-experience">2020-2022</h5>
                <h4>Structures Engineer</h4>
                <h5 className="date-experience">2018-2020</h5>
              </div>
              <h2 className="header-experience">Education</h2>
              <div className="div-experience">
                <h3>
                  <a href="https://mae.ncsu.edu/" target="_blank">
                    North Carolina State University
                  </a>
                </h3>
                <h4></h4>
                <h5 className="date-experience">2018-2022</h5>
                <h4>B.S. Aerospace Engineering</h4>
                <h4>Computer Programming Minor</h4>
                <h4>AIAA President</h4>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
