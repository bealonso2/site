import SignupForm from "./blog/SignupButton";
import { CrestLinkWithText } from "./crest/Crest";
import PageContainer from "./layout/PageContainer";

function InformationWidget({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="collapse w-full rounded-lg hover:bg-base-200 hover:shadow-sm">
      <input type="checkbox" className="peer" />
      <div className="collapse-title">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="prose collapse-content bg-base-100">{children}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <PageContainer className="md:py-24">
      <div className="text-md mx-auto flex max-w-md flex-col justify-center gap-4 md:max-w-2xl md:flex-row">
        <div className="h-min divide-primary-content border-b-2 md:border-b-0 md:border-r-2">
          <div className="p-4">
            <CrestLinkWithText />
          </div>
        </div>
        <div className="flex flex-col items-center md:w-2/3">
          <InformationWidget title="About">
            <p>Hi 👋, I&apos;m Brian.</p>
            <p>
              I am an aerospace stress engineer and engineering tool developer
              based in Raleigh, North Carolina.
            </p>
            <p>
              I document my pursuit of human flourishing to inspire and help
              others lead more fulfilling lives.
            </p>
          </InformationWidget>
          <InformationWidget title="Short Stories">
            <p>
              <a
                href="http://thinking-out-loud.ghost.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find my short stories here.
              </a>
            </p>
          </InformationWidget>
          <InformationWidget title="Projects">
            <p>Outside of work, I am working on:</p>
            <ul>
              <li>
                <a href="/pl-prediction">Premier League Prediction Model</a>
              </li>
              <li>
                <a
                  href="https://github.com/bealonso2/climate-ml-masters"
                  target="_blank"
                >
                  Climate ML Masters
                </a>
              </li>
            </ul>
          </InformationWidget>
          <InformationWidget title="Connect">
            <p>
              Find me on{" "}
              <a href="https://x.com/thebrianalonso" target="_blank">
                X
              </a>{" "}
              and sign up to receive my short stories:
            </p>
            <SignupForm />
            {/* <li>
                <a
                  href="https://youtube.com/@thebrianalonso"
                  target="_blank"
                  className="a-enhanced"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://blog.balonso.com"
                  target="_blank"
                  className="a-enhanced"
                >
                  Blog
                </a>
              </li> */}
          </InformationWidget>
        </div>
        {/* <div className="animate-fadeIn-delay-1 space-y-4 opacity-0 md:my-8">
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
        for the last . If you&apos;re interested in my professional
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
        </div> */}
      </div>
    </PageContainer>
  );
}
