"use client";

import { use, useEffect, useState } from "react";
import BlinkingTick from "./BlinkingTick";
import DNWYLForm from "./Form";

// Create a JS object to store a time (hours, minutes, seconds)
class Time {
  hours: number;
  minutes: number;
  seconds: number;
  constructor(hours: any, minutes: any, seconds: any) {
    this.hours = parseInt(hours);
    this.minutes = parseInt(minutes);
    this.seconds = parseInt(seconds);
  }
}

var significant_events = [];

class RemainingLife {
  years: number;
  lifespan: number;
  birthday: {
    year: number;
    month: number;
    day: number;
  };

  constructor(
    years: any,
    lifespan: any,
    birthdayYear: any,
    birthdayMonth: any,
    birthdayDay: any
  ) {
    this.years = years;
    this.lifespan = lifespan;
    this.birthday = {
      year: parseInt(birthdayYear),
      month: parseInt(birthdayMonth),
      day: parseInt(birthdayDay),
    };
  }
}

// Create a JS object to store each hour data
class EachHour {
  hour: number;
  day: number;
  month: number;
  year: number;
  constructor(hour: any, day: any, month: any, year: any) {
    this.hour = parseInt(hour);
    this.day = parseInt(day);
    this.month = parseInt(month);
    this.year = parseInt(year);
  }
}

// // Function to save off calendar files
// function createCalendarFiles() {
//   // Try to get the user's timezone
//   if (
//     typeof Intl === "undefined" ||
//     typeof Intl.DateTimeFormat === "undefined"
//   ) {
//     timezone = "America/New_York"; // fallback timezone
//   } else {
//     timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   }

//   // See if user is using 24 hour time
//   let timeFormat24Hours = Boolean($(".24hrs").is(":visible"));

//   Object.entries(each_hour).forEach(([key, value]) => {
//     // Create a date from value.year, value.month, value.day
//     let date = new Date(value.year, value.month - 1, value.day, 0, 0, 0, 0);

//     // If the date is in the past, skip it
//     if (date < new Date()) {
//       return;
//     }

//     timeStr = "";
//     if (timeFormat24Hours) {
//       if (key >= 24) {
//         timeStr += (key - 24).toString().padStart(2, "0");
//         timeStr += ":00";
//         timeStr += " + 1";
//       } else {
//         timeStr += key.toString().padStart(2, "0");
//         timeStr += ":00";
//       }
//     } else {
//       if (key == 0 || key == 24 || key == 12) {
//         timeStr += "12";
//       } else if (key > 12 && key < 24) {
//         timeStr += (key - 12).toString();
//       } else {
//         timeStr += key.toString();
//       }
//       timeStr += ":00";
//       if (key < 12) {
//         timeStr += " AM";
//       } else if (key < 24) {
//         timeStr += " PM";
//       } else {
//         timeStr += " AM + 1";
//       }
//     }

//     // Make a copy of date
//     let endDate = new Date(date.getTime());
//     endDate.setHours(23);
//     endDate.setMinutes(59);
//     endDate.setSeconds(59);

//     const data = `BEGIN:VCALENDAR
//   VERSION:2.0
//   PRODID:-//www.donotwasteyourlife.com//NONSGML v1.0//EN
//   BEGIN:VEVENT
//   UID:hour_${key}.ics
//   DTSTAMP:${new Date()
//     .toISOString()
//     .replace(/[-:]/g, "")
//     .replace(/\.\d\d\d/g, "")}Z
//   DTSTART;VALUE=DATE:${date.toISOString().substring(0, 10)}
//   DTEND;VALUE=DATE:${endDate.toISOString().substring(0, 10)}
//   SUMMARY:${timeStr} of my 24 hour day
//   DESCRIPTION:If my life were a 24 hour day, it would be ${timeStr}
//   END:VEVENT
//   END:VCALENDAR`;

//     const blob = new Blob([data], { type: "text/calendar" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `hour_${key}.ics`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   });
// }

// // Function to display significant events
// function significantEvents() {
//   // Get the significant events section
//   let significantEventsSection = $(".significantEventsContainer");

//   // Clear existing events
//   significantEventsSection.empty();

//   // Loop through each significant event
//   significant_events.forEach((event) => {
//     // Create a div to hold the event
//     let eventDiv = $("<div>");

//     // Add a class to the div
//     eventDiv.addClass("significantEventLine");

//     // Set the z index of the event
//     eventDiv.css("z-index", 7);

//     // Get the percent of the event
//     let percent = parseFloat(event.percent) * 100;

//     // Rotate the event by event.percent
//     eventDiv.css("transform", `rotate(${percent * 3.6}deg)`);

//     // Create a div to hold the event name, date, and time. Display this div as a tooltip
//     let eventNameDiv = $("<span>");

//     // Add a class to the div
//     eventNameDiv.addClass("significantEventTooltip");

//     // Un-rotate the event name div by -event.percent
//     eventNameDiv.css("transform", `rotate(-${percent * 3.6}deg)`);

//     // Set the text of the div
//     eventNameDiv.text(
//       `${event.name} - ${event.date
//         .toString()
//         .substring(0, 10)
//         .replace(/-/g, "/")} ${event.time}`
//     );

//     // Add the event name div to the event div
//     eventDiv.append(eventNameDiv);

//     // Add the event to the DOM
//     significantEventsSection.append(eventDiv);
//   });
// }

//   // Function to export remaining hours to calendar
//   $("#exportToCalendar").on("click", function () {
//     // see if the user has calculated their life expectancy
//     if ($("#timeRemaining").text() == "") {
//       alert("Please calculate your life expectancy first.");
//     } else {
//       createCalendarFiles();
//     }
//   });

//   // Function for events + button
//   $("#addEvent").on("click", function (event) {
//     // Enable the submit button
//     $("#significantEventsForm").find("button").eq(-1).prop("disabled", false);
//     let container = $("#significantEventsFormContainer");

//     // Append a blank event at the end of the container children
//     container.append(
//       // Create a div to hold the event
//       $("<div>")
//         .addClass("significantEvent")
//         .addClass("col")
//         .append(
//           // Create a div to hold the event name
//           $("<div>").addClass("eventName").addClass("py-1").append(
//             // Create an input for the event name
//             $("<input>")
//               .attr("type", "text")
//               .attr("name", "eventName")
//               .attr("placeholder", "Event Name")
//           )
//         )
//         .append(
//           // Create a div to hold the event date
//           $("<div>").addClass("eventDate").addClass("py-1").append(
//             // Create an input for the event date
//             $("<input>").attr("type", "date").attr("name", "eventDate")
//           )
//         )
//     );

//     // Cancel the default action of the button
//     event.preventDefault();
//   });

//   // Function for events submit button
//   $("#significantEventsForm").on("submit", function (event) {
//     // Prevent the default action of the form
//     event.preventDefault();

//     // Get the form
//     let form = $(this).find("form");

//     // Get the form data
//     let formData = form.serializeArray();

//     // Get form data into pairs of eventName and eventDate
//     let eventPairs = [];
//     for (let i = 0; i < formData.length; i += 2) {
//       // Skip empty event names and dates
//       if (formData[i].value == "" || isNaN(Date.parse(formData[i + 1].value))) {
//         continue;
//       }
//       eventPairs.push({
//         name: formData[i].value,
//         date: formData[i + 1].value,
//       });
//     }

//     if (eventPairs.length == 0) {
//       alert(
//         "Please enter at least one event name and date. To calculate significant events."
//       );
//       return;
//     }

//     // Make a request to the server to get the event times
//     $.ajax({
//       url: `${url}/significant_events`,
//       method: "POST",
//       dataType: "json",
//       data: JSON.stringify({
//         birthday: {
//           year: remaining_life.birthday.year,
//           month: remaining_life.birthday.month,
//           day: remaining_life.birthday.day,
//         },
//         years_at_death: remaining_life.lifespan,
//         events: eventPairs,
//       }),
//       dataType: "json",
//     }).then(
//       function (data) {
//         // Set the significant events
//         significant_events = data.events;

//         // Display the significant events
//         significantEvents();

//         // Finally, remove the significant events section
//         $(this).hide();
//       },
//       function (jqXHR, textStatus, errorThrown) {
//         console.log(jqXHR, textStatus, errorThrown);
//         alert(
//           "There was an error getting the significant events. Please try again later."
//         );
//       }
//     );
//   });

function ShareButton({
  is24HourTime,
  time,
}: {
  is24HourTime: boolean;
  time: Time;
}) {
  // Function for share button
  const shareFunction = () => {
    const hourText = is24HourTime
      ? time.hours.toString().padStart(2, "0")
      : time.hours <= 12
      ? time.hours === 0
        ? 12
        : time.hours
      : time.hours - 12;
    const minuteText = time.minutes.toString().padStart(2, "0");
    const secondText = time.seconds.toString().padStart(2, "0");
    const amPmText = is24HourTime ? "" : time.hours < 12 ? " AM" : " PM";

    // Assemble the tweet text
    const tweetText = `If my life were only a 24-hour day, it would be ${hourText}:${minuteText}:${secondText}${amPmText}. Calculate yours at https://balonso.com/dnwyl.`;

    // Hashtags
    const hashtags = ["myLifeIn24Hours"];

    // Open the tweet in a new tab
    let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&hashtags=${encodeURIComponent(hashtags.join(","))}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <button
      id="share"
      type="button"
      className="btn btn-primary-content w-full sm:w-auto"
      onClick={shareFunction}
    >
      Share on X
    </button>
  );
}

export default function DNWYLContainer({
  countries,
  postLifeIsTimeData,
}: {
  countries: string[];
  postLifeIsTimeData: any;
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [time, setTime] = useState(new Time(0, 0, 0));
  const [remaining_life, setRemainingLife] = useState(
    new RemainingLife(0, 0, 0, 0, 0)
  );
  const [is24HourTime, setIs24HourTime] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [inspirationalRemark, setInspirationalRemark] = useState("");
  const [eachHour, setEachHour] = useState<Record<number, EachHour>>({});

  const formSubmitCallback = (
    birthday: any,
    lifespan: any,
    yearsRemaining: any,
    timeMessage: any,
    eachHour: { [x: number]: { day: any; month: any; year: any } },
    currentTime: any
  ) => {
    // Store the remaining life data
    setRemainingLife(
      new RemainingLife(
        yearsRemaining,
        lifespan,
        birthday.year,
        birthday.month,
        birthday.day
      )
    );
    setTime(
      new Time(currentTime.hours, currentTime.minutes, currentTime.seconds)
    );

    // Set the greeting and inspirational remark
    setGreeting(timeMessage.greeting);
    setInspirationalRemark(timeMessage.inspirationalRemark);

    // Flatten the each hour data
    const eachHourData = Object.entries(eachHour).reduce(
      (acc, [key, value]) => {
        const keyInt = parseInt(key);
        acc[keyInt] = new EachHour(keyInt, value.day, value.month, value.year);
        return acc;
      },
      {} as Record<number, EachHour>
    );

    // Store every hour of life
    setEachHour(eachHourData);

    // Indicate that the form has been submitted
    setIsFormSubmitted(true);
  };

  return (
    <>
      <DNWYLForm
        className={isFormSubmitted ? "hidden" : "max-w-2xl"}
        countries={countries}
        formSubmitCallback={formSubmitCallback}
        postLifeIsTimeData={postLifeIsTimeData}
      />
      <div className={isFormSubmitted ? "my-3 max-w-2xl" : "hidden"}>
        <div id="calculationInfo" className="my-3">
          <h2 id="timeOfDayMessage" className="font-semibold text-2xl">
            Good {greeting}!
          </h2>
          {/*  Kind of want to consider moving this down under the clock at some point  */}
          <div className="my-2">
            <h3 id="timeRemaining" className="font-medium text-xl">
              You have {Math.floor(remaining_life.years)} years left of your
              estimated {Math.ceil(remaining_life.lifespan)} year life.
            </h3>
            <div>
              <p>{inspirationalRemark}</p>
            </div>
          </div>
        </div>
        <div>
          <div id="result" className="my-10">
            <div className="clock">
              {/* Rotate the hands to the "current" time */}
              <div
                className="hourHand"
                style={{
                  transform: `rotate(${(time.hours / 12) * 360}deg)`,
                }}
              ></div>
              <div
                className="minuteHand"
                style={{
                  transform: `rotate(${(time.minutes / 60) * 360}deg)`,
                }}
              ></div>
              <div
                className="secondHand"
                style={{
                  transform: `rotate(${(time.seconds / 60) * 360}deg)`,
                }}
              ></div>
              <div className="center"></div>
              <div className="digitalTime">
                <span>
                  <strong>
                    {is24HourTime
                      ? time.hours.toString().padStart(2, "0")
                      : time.hours <= 12
                      ? time.hours === 0
                        ? 12
                        : time.hours
                      : time.hours - 12}
                  </strong>
                  <BlinkingTick />
                  {time.minutes.toString().padStart(2, "0")}
                  <BlinkingTick />
                  <small>
                    {time.seconds.toString().padStart(2, "0")}
                    <span
                      className={is24HourTime ? "hidden" : ""}
                      style={{ whiteSpace: "pre" }}
                    >
                      {time.hours >= 12 ? " PM" : " AM"}
                    </span>
                  </small>
                </span>
              </div>
              <ul id="eachHour">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <li key={hour}>
                    <div className="hourDiv">
                      <span>{hour}</span>

                      <div
                        className="significantEventTooltip"
                        key={hour}
                        style={{ zIndex: 19 }}
                      >
                        {
                          // Display the date for each hour.
                          Array.from({ length: 25 }, (_, i) => i).map((i) => {
                            if (i % 12 === hour % 12) {
                              var value = eachHour[i];
                              if (value) {
                                return (
                                  <div key={i}>
                                    Hour {value.hour}:{" "}
                                    {new Date(
                                      value.year,
                                      value.month - 1,
                                      value.day
                                    ).toLocaleDateString()}
                                  </div>
                                );
                              }
                            }
                          })
                        }
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="significantEventsContainer"></div>
            </div>
            <div className="my-10 space-y-5">
              {/*  Button to toggle between 12 and 24 hour time  */}
              <div className="form-control">
                <label className="label cursor-pointer flex flex-row justify-center gap-4">
                  <span className="label-text">24 Hour Time</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    onClick={() => setIs24HourTime(!is24HourTime)}
                    defaultChecked={!is24HourTime}
                  />
                  <span className="label-text">12 Hour Time</span>
                </label>
              </div>
              <div className="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
                <ShareButton is24HourTime={is24HourTime} time={time} />
                <button
                  className="btn btn-primary-content w-full sm:w-auto"
                  onClick={
                    // Function to alert the user that the feature is not yet implemented
                    () => alert("This feature is coming soon.")
                  }
                >
                  Export to Calendar
                </button>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-lg-6 align-self-center">
              <div className="text-justify">
                <div className="row">
                  <div
                    id="significantEventsForm"
                    className="col align-self-center"
                  >
                    <h4>What are some significant events in your life?</h4>
                    <p>
                      Enter some events that you want to visualize on your 24 hour
                      life. These will be displayed on the clock.
                    </p>
                    <form>
                      <div
                        id="significantEventsFormContainer"
                        className="row"
                      ></div>
                      <button
                        type="button"
                        id="addEvent"
                        className="btn btn-dark my-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-plus-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                        </svg>
                      </button>
                      <button
                        id="submitEvents"
                        type="submit"
                        className="btn btn-dark my-2"
                        disabled
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div> */}
        </div>
      </div>
    </>
  );
}
