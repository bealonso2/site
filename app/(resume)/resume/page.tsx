import { generateMetadata } from "@/utils/metadata";
import "./styles.css";

export const metadata = generateMetadata({
  title: "Brian Alonso Resume",
  description:
    "The resume of Brian Alonso, a stress engineer and software developer proficient in python.",
  keywords: "Brian Alonso, python, stress analysis, programming",
  canonicalPath: "resume",
});

export default function About() {
  return (
    <>
      {/* Add a button to download the page as a pdf */}
      <header className="no-print flex flex-row justify-between p-4">
        <h1 className="m-0">
          <a href="/" target="_blank">
            Brian Alonso
          </a>
        </h1>
        {/* TODO: Automatically print resume and upload to S3 as a post-build step */}
        <a
          href="https://resume.s3.amazonaws.com/Brian%20Alonso%20Resume.pdf"
          className="self-center"
          download="Brian Alonso Resume.pdf"
        >
          Download as PDF
        </a>
      </header>
      <hr className="no-print" />
      <main className="flex min-h-screen flex-col items-stretch justify-between p-6 sm:p-12">
        <article className="prose mx-auto max-w-screen-md text-xs prose-headings:my-0.5 prose-h2:mt-2 prose-h3:mt-1.5 prose-p:m-0 prose-ul:m-0 sm:text-base">
          <div className="flex flex-row justify-between">
            <h1 className="m-0 self-center">Brian Alonso</h1>
            <div className="flex flex-col">
              <span className="font-semibold">Raleigh, North Carolina</span>
              <span className="flex flex-row flex-wrap justify-between gap-2">
                <a href="https://balonso.com">Website</a>
                <span className="hidden sm:inline"> | </span>
                <a href="mailto:alonsobrian2@gmail.com">Email</a>
                <span className="hidden sm:inline"> | </span>
                <a href="https://github.com/bealonso2">GitHub</a>
              </span>
            </div>
          </div>
          <hr className="mb-2 mt-1" />
          <p>
            Experienced engineer skilled in Python, scientific computing, and
            aerospace structural analysis, leading the development of
            engineering tools and AWS automation, with a strong track record of
            collaborating within teams to solve complex technical challenges.
          </p>
          <h2>Skills</h2>
          <p>
            Proficient in Python programming for scientific computing, data
            analysis, and automation using Boto3, Jupyter, Matplotlib, NumPy,
            Pandas, SciKit-Learn, and SciPy.
          </p>
          <h2>Experience</h2>
          <h3>Engineering Tool Developer and Aerospace Structures Engineer</h3>
          <h4>
            January 2022 - Present | Collier Aerospace | Raleigh, North Carolina
          </h4>
          <h5 className="font-semibold">Lead Engineering Tool Developer</h5>
          <ul>
            <li>
              Leading new development, maintenance, and managing contributions
              to a large python codebase from the entire engineering team using
              Git and Azure DevOps.
            </li>
            <li>
              Automating the use of the AWS Cloud for batch processing of large
              finite element models and HyperX analysis databases with Boto3,
              EC2, and S3.
            </li>
          </ul>
          <h5 className="font-semibold">Aerospace Structural Analysis</h5>
          <p>
            Lead a module-level test analysis effort for a commercial space
            launch vehicle. This required managing engineers and communicating
            results and structural integrity requirements with stakeholders.
          </p>
          <h2>Education</h2>
          <h3>B.S. Aerospace Engineering</h3>
          <h4>August 2018 - May 2022 | North Carolina State University</h4>
          <div className="flex flex-row flex-wrap justify-start gap-2">
            <span>Computer Programming Minor</span>
            <span className="hidden sm:inline">|</span>
            <span>GPA: 3.98</span>
            <span className="hidden sm:inline">|</span>
            <span>AIAA Chair: 2021-2022</span>
          </div>
          <h2>Projects</h2>
          <h3>
            <a href="https://balonso.com/pl-prediction">
              Premier League Forecasting
            </a>
          </h3>
          <p>
            Developed a machine learning model using SciKit-Learn to predict the
            final standings of the 2024-2025 Premier League season. Forecasts
            are updated weekly on AWS using ECS, Docker, and SQLite.
          </p>
          <h3>2021-2022 AIAA Design Build Fly Competition</h3>
          <p>
            Developed a MatLab program to perform Multidisciplinary Design
            Optimization on a remote-controlled aircraft. This resulted in a 6th
            out of 127 place finish in the proposal round of the competition.
          </p>
        </article>
      </main>
    </>
  );
}
