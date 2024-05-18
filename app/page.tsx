"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

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
            <img
              className="dark:hidden"
              src="moon.svg"
              id="moon"
              alt="Moon icon"
            />
            <img
              className="light:hidden"
              src="sun.svg"
              id="sun"
              alt="Sun icon"
            />
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
                <h5 className="date-experience">2018-2022</h5>
                <h4>B.S. Aerospace Engineering</h4>
                <h4>Computer Programming Minor</h4>
                <h4>AIAA President</h4>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="">
        <div className="font-mono fixed bottom-0 left-0 flex h-auto w-full items-end justify-center">
          <span className="flex items-center py-5">
            Follow me on
            <a
              href="https://x.com/thebrianalonso"
              target="_blank"
              className="p-1.5 w-auto"
            >
              <Image
                className=""
                src="/X_logo_2023_original.svg.png"
                alt="link to X account"
                width={16}
                height={16}
              />
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
    </>
  );
}
