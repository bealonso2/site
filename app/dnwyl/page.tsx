// Import .main.css file
import "@/app/dnwyl/main.css";
import DNWYLContainer from "@/components/dnwyl/Container";

// URL:
const url = "https://n9y1gnbx8d.execute-api.us-east-1.amazonaws.com/Prod";

// Function to populate life expectancy location dropdown
async function populateLocationDropdown() {
  // Get the location data from the api
  const response = await fetch(`${url}/life_expectancy_data`);
  const { countries } = await response.json();

  // Get .countries from the response and add them to dropdown
  // @ts-ignore
  return [...new Set(countries)].sort();
}

// Function to make a post request to the API
async function postLifeIsTimeData(birthday: any, sex: string, country: string) {
  "use server";
  // Request the life expectancy data from the API
  const response = await fetch(`${url}/life_is_time`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      birthday: {
        year: birthday.year,
        month: birthday.month,
        day: birthday.day,
      },
      sex: sex,
      country: country,
    }),
  });

  return response.json();
}

async function calculateSignificantEvent(
  remainingLife: {
    birthday: { year: number; month: number; day: number };
    lifespan: number;
  },
  eventName: string,
  eventDate: string
) {
  "use server";
  const response = await fetch(`${url}/significant_events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      birthday: {
        year: remainingLife.birthday.year,
        month: remainingLife.birthday.month,
        day: remainingLife.birthday.day,
      },
      years_at_death: remainingLife.lifespan,
      events: [{ name: eventName, date: eventDate }],
    }),
  });
  return await response.json();
}

export default async function Page() {
  const countries = await populateLocationDropdown();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-12 pb-24">
      <div>
        <h1 className="text-3xl font-semibold">Do Not Waste Your Life</h1>
        <div className="py-3 space-y-5 max-w-2xl">
          {/* Thinking about moving this stuff to the onboarding part of the app.
              Collapsed in some way when you get to the main page. */}
          <h2 className="text-xl font-medium mt-5">
            What if your life was 24 hours long?
          </h2>
          <p>
            Often, we are trapped into thinking that we have a lot of time left
            on this Earth. Life is short. Really short. This idea, inspired by{" "}
            <a
              href="https://www.youtube-nocookie.com/embed/JAX0XPkmVc0"
              target="_blank"
            >
              John Mayer and his discussion of the time on his 'Born and Raised'
              album
            </a>
            , is yet another example of the power that accepting mortality has
            on your life and how you chose to spend your remaining hours.
          </p>
          <p>
            Use this calculator to zoom out and view you life as if it were 24
            hours long. Enter your birth date below to see how much time you
            have left on this Earth. How much time do you have left?
          </p>
        </div>
        <DNWYLContainer
          countries={countries}
          postLifeIsTimeData={postLifeIsTimeData}
          calculateSignificantEvent={calculateSignificantEvent}
        />
      </div>
    </div>
  );
}
