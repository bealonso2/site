"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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

class SignificantEvent {
  name: string;
  date: string;
  percent: number;
  time: string;

  constructor(name: string, date: string, percent: number, time: string) {
    this.name = name;
    this.date = date;
    this.percent = percent;
    this.time = time;
  }
}

// // Function to save off calendar files
// function createCalendarFiles(
//   each_hour: Record<number, EachHour>,
//   timeFormat24Hours: boolean
// ) {
//   Object.entries(each_hour).forEach(([key, value]) => {
//     // Create a date from value.year, value.month, value.day
//     let date = new Date(value.year, value.month - 1, value.day, 0, 0, 0, 0);

//     // If the date is in the past, skip it
//     if (date < new Date()) {
//       return;
//     }

//     // Get the hour from the key
//     const hour = parseInt(key);

//     // Create a string for the time
//     var timeStr = "";

//     // Populate the time string based on the time format
//     if (timeFormat24Hours) {
//       if (hour == 24) {
//         timeStr += (hour - 24).toString().padStart(2, "0");
//         timeStr += ":00";
//         timeStr += " + 1";
//       } else {
//         timeStr += key.toString().padStart(2, "0");
//         timeStr += ":00";
//       }
//     } else {
//       if (hour == 0 || hour == 24 || hour == 12) {
//         timeStr += "12";
//       } else if (hour > 12 && hour < 24) {
//         timeStr += (hour - 12).toString();
//       } else {
//         timeStr += key.toString();
//       }
//       timeStr += ":00";
//       if (hour < 12) {
//         timeStr += " AM";
//       } else if (hour < 24) {
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
//     VERSION:2.0
//     PRODID:-//balonso.com/dnwyl//NONSGML v1.0//EN
//     BEGIN:VEVENT
//     UID:hour_${key}
//     DTSTAMP:${new Date()
//       .toISOString()
//       .replace(/[-:]/g, "")
//       .replace(/\.\d\d\d/g, "")}Z
//     DTSTART;VALUE=DATE:${date.toISOString().substring(0, 10).replace(/-/g, "")}
//     DTEND;VALUE=DATE:${endDate.toISOString().substring(0, 10).replace(/-/g, "")}
//     SUMMARY:${timeStr
//       .replace(/,/g, "\\,")
//       .replace(/;/g, "\\;")
//       .replace(/\\/g, "\\\\")} of my 24 hour day
//     DESCRIPTION:If my life were a 24 hour day, it would be ${timeStr
//       .replace(/,/g, "\\,")
//       .replace(/;/g, "\\;")
//       .replace(/\\/g, "\\\\")}
//     END:VEVENT
//     END:VCALENDAR`;

//     const blob = new Blob([data], { type: "text/calendar" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `hour_${key}.ics`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   });
// }

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
    const tweetText = `If my life were only a 24-hour day, it would be ${hourText}:${minuteText}:${secondText}${amPmText}. Calculate yours at https://balonso.com/24-hours.`;

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

function SignificantEventDiv({
  removeFunction,
  calculateAndSet,
}: {
  removeFunction: any;
  calculateAndSet: any;
}) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    calculateAndSet(eventName, eventDate);
  }, [eventName, eventDate]);

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <input
        className="py-1 max-w-xs w-full"
        type="text"
        name="eventName"
        placeholder="Event Name"
        autoComplete="off"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        className="py-1 max-w-xs w-full"
        type="date"
        name="eventDate"
        autoComplete="off"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <button
        className="btn btn-sm btn-primary-content py-1 max-w-xs w-full"
        type="button"
        onClick={removeFunction}
      >
        Remove
      </button>
    </div>
  );
}

export default function DNWYLContainer({
  countries,
  postLifeIsTimeData,
  calculateSignificantEvent,
}: {
  countries: string[];
  postLifeIsTimeData: any;
  calculateSignificantEvent: any;
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [time, setTime] = useState(new Time(0, 0, 0));
  const [remainingLife, setRemainingLife] = useState(
    new RemainingLife(0, 0, 0, 0, 0)
  );
  const [is24HourTime, setIs24HourTime] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [inspirationalRemark, setInspirationalRemark] = useState("");
  const [eachHour, setEachHour] = useState<Record<number, EachHour>>({});
  const [significantEvents, setSignificantEvents] = useState<string[]>([]);
  const [significantEventsData, setSignificantEventsData] = useState<
    Map<string, SignificantEvent>
  >(new Map());

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

  const handleSignificantEventDelete = (uuid: string) => {
    setSignificantEvents(significantEvents.filter((i) => i !== uuid));
    significantEventsData.delete(uuid);
    setSignificantEventsData(significantEventsData);
  };

  const calculateAndSetSignificantEvents = async (
    uuid: string,
    eventName: string,
    eventDate: string
  ) => {
    if (eventName === "" || isNaN(Date.parse(eventDate))) {
      return;
    }
    try {
      const data = await calculateSignificantEvent(
        {
          birthday: {
            year: remainingLife.birthday.year,
            month: remainingLife.birthday.month,
            day: remainingLife.birthday.day,
          },
          lifespan: remainingLife.lifespan,
        },
        eventName,
        eventDate
      );
      const firstEvent = data.events[0];
      setSignificantEventsData((prevMap) => {
        const newMap = new Map(prevMap); // Create a shallow copy of the previous Map
        newMap.set(
          uuid,
          new SignificantEvent(
            firstEvent.name,
            firstEvent.date,
            firstEvent.percent,
            firstEvent.time
          )
        );
        return newMap; // Return the new Map to update the state
      });
    } catch (error) {
      console.error("Error fetching significant event data:", error);
    }
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
              You have {Math.floor(remainingLife.years)} years left of your
              estimated {Math.ceil(remainingLife.lifespan)} year life.
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
              <div className="significantEventsContainer">
                {Array.from(significantEventsData.entries()).map(
                  ([index, event]) => (
                    <div
                      key={index}
                      className="significantEventLine"
                      style={{
                        zIndex: 7,
                        transform: `rotate(${event.percent * 360 * 2}deg)`,
                      }}
                    >
                      <span
                        className="significantEventTooltip"
                        style={{
                          transform: `rotate(-${event.percent * 360 * 2}deg)`,
                        }}
                      >
                        {event.name}:{" "}
                        {new Date(event.date).toLocaleDateString()} {event.time}
                      </span>
                    </div>
                  )
                )}
              </div>
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
          <div id="significantEventsForm" className="space-y-4">
            <h4 className="text-lg font-semibold">
              What are some significant events in your life?
            </h4>
            <p className="">
              Enter some events that you want to visualize on your 24 hour life.
              These will be displayed on the clock.
            </p>
            <form className="flex flex-col items-center">
              <div
                id="significantEventsFormContainer"
                className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
              >
                {significantEvents.map((i) => (
                  <SignificantEventDiv
                    key={i}
                    removeFunction={() => handleSignificantEventDelete(i)}
                    calculateAndSet={(eventName: string, eventDate: string) =>
                      calculateAndSetSignificantEvents(i, eventName, eventDate)
                    }
                  />
                ))}
              </div>
              <button
                type="button"
                id="addEvent"
                className="btn btn-primary-content my-3 max-w-xs w-full"
                onClick={() => {
                  setSignificantEvents([...significantEvents, uuidv4()]);
                }}
              >
                Add Event{" "}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
