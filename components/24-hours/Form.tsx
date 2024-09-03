"use client";

import { useState } from "react";

export default function DNWYLForm({
  countries,
  formSubmitCallback,
  postLifeIsTimeData,
  className,
}: {
  countries: string[];
  formSubmitCallback: (
    birthday: any,
    lifespan: any,
    yearsRemaining: any,
    timeMessage: any,
    eachHour: any,
    currentTime: any,
  ) => void;
  postLifeIsTimeData: (birthday: any, sex: string, country: string) => any;
  className?: string;
}) {
  // State for form fields
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex] = useState("both");
  const [location, setLocation] = useState("world");

  // Function to handle form submission
  const formFunction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const birthday = {
      year: parseInt(birthDate.substring(0, 4)),
      month: parseInt(birthDate.substring(5, 7)),
      day: parseInt(birthDate.substring(8, 10)),
    };
    // Request the life expectancy data from the API
    postLifeIsTimeData(birthday, sex, location)
      .then((response: any) => {
        formSubmitCallback(
          birthday,
          response.years_at_death,
          response.years_remaining,
          response.time_message,
          response.each_hour_of_life,
          response.current_time,
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // Handle input changes
  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBirthDate(event.target.value);
  };
  const handleSexChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSex(event.target.value);
  };
  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setLocation(event.target.value);
  };

  // Date picker to consume birth date which can't be before 1900 or after today ref:
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
  return (
    <form className={`my-3 text-center ${className}`} onSubmit={formFunction}>
      <div className="mb-5 flex w-full flex-col items-center gap-4 md:flex-row">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your birth date?</span>
          </div>
          <input
            id="datePickerId"
            className="input input-bordered w-full max-w-xs"
            type="date"
            name="bday"
            min="1900-01-01"
            max={new Date().toISOString().split("T")[0]}
            value={birthDate}
            onChange={handleBirthDateChange}
            required
          />
        </label>
        {/*  Drop down list with options Both, Female, Male  */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Filter data by sex:</span>
          </div>
          <select
            title="Sex selection for life expectancy data calculation"
            className="select select-bordered w-full max-w-xs"
            value={sex}
            onChange={handleSexChange}
            aria-label="Sex selection for life expectancy data calculation"
          >
            <option value="both">Both</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>
        {/*  Drop down list with options World, Country  */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Filter data by location:</span>
          </div>
          <select
            title="Location selection for life expectancy data calculation"
            className="select select-bordered w-full max-w-xs"
            value={location}
            onChange={handleLocationChange}
            aria-label="Location selection for life expectancy data calculation"
          >
            <option value="world">World</option>
            {countries.map((country: string) => (
              <option key={country} value={country.toLowerCase()}>
                {country}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="btn-primary-content btn">
        Calculate!
      </button>
    </form>
  );
}
