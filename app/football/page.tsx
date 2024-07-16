"use client";

import { getAveragePositions } from "@/lib/football/data";
import { useEffect, useState } from "react";

const seasons = {
  "2023/24": 2023,
};

const dates = [new Date()];

function ProbabilityTableData(data: number) {
  return <td>{data < 0.01 ? "<0.1%" : `${(data * 100).toFixed(0)}%`}</td>;
}

export default function Football() {
  var [data, setData] = useState<any[]>([]);
  // Get average positions on component mount
  useEffect(() => {
    getAveragePositions().then((results) => {
      console.log(results);
      setData(results);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-12 pb-24">
      <div>
        <h1 className="text-3xl font-semibold">Premier League Prediction</h1>

        <div className="overflow-x-auto py-5">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Team</th>
                <th>Avg. Place</th>
                <th>Finish Bottom 3</th>
                <th>Finish Top 4</th>
                <th>Win Premier League</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hover">
                  <th>{i + 1}</th>
                  <td>{row.team}</td>
                  <td>{row.place}</td>
                  {ProbabilityTableData(row.bottom_3)}
                  {ProbabilityTableData(row.top_4)}
                  {ProbabilityTableData(row.win_premier_league)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dropdown to toggle between seasons */}
        <div className="flex justify-evenly">
          <label className="mr-2">
            Forecast from
            <select className="ml-2">
              {dates.map((date, i) => (
                <option key={i} value={date.toLocaleDateString()}>
                  {date.toLocaleDateString() === new Date().toLocaleDateString()
                    ? "Today"
                    : date.toLocaleDateString()}
                </option>
              ))}
            </select>
          </label>
          <label>
            Season
            <select className="ml-2">
              {Object.keys(seasons).map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
