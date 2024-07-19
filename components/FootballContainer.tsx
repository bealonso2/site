"use client";

import { useEffect, useState } from "react";
import TableControls from "./FootballControls";
import FootballTable from "./FootballTable";
import { usePathname, useSearchParams } from "next/navigation";

export default function FootballContainer({
  avgFinishData,
  positionData,
  seasonToDates,
}: {
  avgFinishData: any;
  positionData: any;
  seasonToDates: any;
}) {
  // Get the most recent season
  const seasons = Object.keys(seasonToDates);
  const firstSeason = seasons[0];

  // Get the most recent date associated with the first season
  const firstDates = Object.keys(seasonToDates[firstSeason]);
  const firstDate = firstDates[0];

  // Get the uuid using the most recent date and season
  const firstSimUUID = seasonToDates[firstSeason][firstDate];

  // Set the initial state now that we have the most recent season and date
  const [season, setSeason] = useState<string>(firstSeason);
  const [date, setDate] = useState<string>(firstDate);
  const [simulationUUID, setSimulationUUID] = useState<string>(firstSimUUID);
  const [dates, setDates] = useState<string[]>(firstDates);
  const [avgFinishDataState, setAvgFinishDataState] = useState<any[]>(
    avgFinishData[simulationUUID]
  );
  const [positionDataState, setPositionDataState] = useState<any>(
    positionData[simulationUUID]
  );
  // Use the search params to determine the active view
  const searchParams = useSearchParams();

  useEffect(() => {
    var seasonParam = searchParams.get("season");
    seasonParam && setSeasonAndDates(seasonParam);
    var dateParam = searchParams.get("forecast");
    dateParam && setDateAndUUID(dateParam);
  }, [searchParams]);

  // Update the season (state) and dates list (state) when the season changes
  const setSeasonAndDates = (newSeason: any) => {
    // Get the dates from the season
    const datesAndUUIDs = seasonToDates[newSeason];
    if (!datesAndUUIDs) {
      console.log("No dates found for season: ", newSeason);
      return;
    }

    // Set the season and dates
    setSeason(newSeason);
    const datesList = Object.keys(datesAndUUIDs);
    setDates(datesList);

    // Set the date to the latest date
    setDateAndUUID(datesList[0]);
  };

  // Update the date (state) and uuid when the date changes
  const setDateAndUUID = (date: string) => {
    const uuid = seasonToDates[season][date];
    if (!uuid) {
      console.log("No simulation found for date: ", date);
      return;
    }
    setDate(date);
    setDataAndUUID(uuid);
  };

  // Update uuid (state) and data when the uuid changes
  const setDataAndUUID = (uuid: string) => {
    setSimulationUUID(uuid);
    setAvgFinishDataState(avgFinishData[uuid]);
    setPositionDataState(positionData[uuid]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-12 pb-24">
      <div>
        <h1 className="text-3xl font-semibold">Premier League Prediction</h1>
        <div className="overflow-x-auto py-5">
          <FootballTable
            avgFinishData={avgFinishDataState}
            positionData={positionDataState}
          />
        </div>
        <TableControls
          date={date}
          dates={dates}
          season={season}
          seasons={seasons}
          setDateAndUUID={setDateAndUUID}
          setSeasonAndDates={setSeasonAndDates}
        />
      </div>
    </div>
  );
}
