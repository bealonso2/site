"use client";
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
      <main className="flex min-h-screen flex-col items-center justify-between p-12 pb-24">
        <div className="w-full max-w-md md:max-w-xl text-md">
          <div className="my-8 space-y-4">
            <h1 className="text-3xl font-semibold">Hi, I'm Brian.</h1>
            <p>
              I've been a stress engineer and plugin developer at{" "}
              <a
                href="https://collieraerospace.com"
                target="_blank"
                className="a-enhanced"
              >
                Collier Aerospace{" "}
              </a>
              for the last {time}.
            </p>
            <p>
              I live in Raleigh, North Carolina. Keep up with me on{" "}
              <a
                href="https://x.com/thebrianalonso"
                target="_blank"
                className="a-enhanced"
              >
                X
              </a>{" "}
              and{" "}
              <a
                href="https://github.com/bealonso2"
                target="_blank"
                className="a-enhanced"
              >
                GitHub
              </a>
              . Read my long-form thoughts on the climate crisis, personal
              development, and software engineering{" "}
              <a
                href="https://blog.balonso.com"
                target="_blank"
                className="a-enhanced"
              >
                on my blog
              </a>
              .
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="header-experience">Currently</h2>
            <div className="div-experience">
              <h3 className="">
                <a
                  href="https://collieraerospace.com"
                  target="_blank"
                  className="a-enhanced"
                >
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
                <a
                  href="https://www.spiritaero.com"
                  target="_blank"
                  className="a-enhanced"
                >
                  Spirit Aerosystems
                </a>
              </h3>
              <h4>Design Engineer Intern</h4>
              <h5 className="date-experience">2021</h5>
            </div>
            <div className="div-experience">
              <h3 className="">
                <a href="" target="_blank" className="a-enhanced">
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
                <a
                  href="https://mae.ncsu.edu/"
                  target="_blank"
                  className="a-enhanced"
                >
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
      </main>
    </>
  );
}
