"use client";
import { calculateTimeDifference } from "@/lib/home/calculateTimeDifference";
import { useEffect, useState } from "react";
import PageContainer from "./layout/PageContainer";

export default function HomePage({ initialTime }: { initialTime: string }) {
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
    <PageContainer>
      <div className="text-md mx-auto w-full max-w-md md:max-w-xl">
        <div className="animate-fadeIn-delay-1 space-y-4 opacity-0 md:my-8">
          <h1 className="text-3xl font-semibold">Hi, I&apos;m Brian.</h1>
          <p>
            I&apos;ve been an engineering tool developer and stress engineer at{" "}
            <a
              href="https://collieraerospace.com"
              target="_blank"
              className="a-enhanced"
            >
              Collier Aerospace{" "}
            </a>
            for the last {time}. If you&apos;re interested in my professional
            background,{" "}
            <a href="/resume" className="a-enhanced">
              check out my resume
            </a>
            .
          </p>
          <p>
            I live in Raleigh, North Carolina and am documenting my journey on{" "}
            <a
              href="https://x.com/thebrianalonso"
              target="_blank"
              className="a-enhanced"
            >
              X
            </a>{" "}
            and{" "}
            <a
              href="https://youtube.com/@thebrianalonso"
              target="_blank"
              className="a-enhanced"
            >
              YouTube
            </a>
            . Read my long-form thoughts on personal development and climate
            AI/ML{" "}
            <a
              href="https://blog.balonso.com"
              target="_blank"
              className="a-enhanced"
            >
              on my blog
            </a>
            . My why is summarized in{" "}
            <a href="/survival-imperative" className="a-enhanced">
              The Survival Imperative
            </a>
            .
          </p>
          <p>
            I&apos;m currently building:{" "}
            <a
              href="https://github.com/bealonso2/climate-ml-masters"
              target="_blank"
              className="a-enhanced"
            >
              Climate ML Masters
            </a>{" "}
            and the{" "}
            <a
              href="https://playlifeisavideogame.com"
              target="_blank"
              className="a-enhanced"
            >
              Life is a Video Game
            </a>{" "}
            personal development platform.
          </p>
        </div>
        <div className="space-y-4">
          <div className="animate-fadeIn-delay-2 opacity-0">
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
              <h4>Lead Engineering Tool Developer</h4>
              <h5 className="date-experience">2022-Present</h5>
            </div>
          </div>
          <div className="animate-fadeIn-delay-3 opacity-0">
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
              <h4>Airbus A350 Design Engineer Intern</h4>
              <h5 className="date-experience">2021</h5>
            </div>
          </div>
          <div className="animate-fadeIn-delay-4 opacity-0">
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
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
