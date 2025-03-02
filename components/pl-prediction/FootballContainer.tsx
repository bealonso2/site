"use client";

import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import TableControls from "./FootballControls";
import FootballTable from "./FootballTable";
import { PremierLeagueLogoSvg } from "./PremierLeagueSvg";
import TabNavigation from "./TabNavigation";

export default function FootballContainer({
  avgFinishData,
  supplementalData,
  seasonToDates,
  teamToCrest,
}: {
  avgFinishData: any;
  supplementalData: any;
  seasonToDates: any;
  teamToCrest: any;
}) {
  // Get the most recent season
  const seasons = Object.keys(seasonToDates).sort(
    (a, b) => Number(b) - Number(a),
  );
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
    avgFinishData[simulationUUID],
  );
  const [supplementalDataState, setSupplementalData] = useState<any>(
    supplementalData[simulationUUID],
  );
  // // Use the search params to determine the active view
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   var seasonParam = searchParams.get("season");
  //   seasonParam && setSeasonWithChecks(seasonParam);
  //   var dateParam = searchParams.get("forecast");
  //   dateParam && setDate(dateParam);
  // }, [searchParams]);

  // Update the season (state) safely
  const setSeasonWithChecks = (newSeason: string) => {
    // Get the dates from the season
    const datesAndUUIDs = seasonToDates[newSeason];
    if (!datesAndUUIDs) {
      console.log("No dates found for season: ", newSeason);
      return;
    }

    // Set the season
    setSeason(newSeason);
  };

  // Update the dates list (state) and date when the season changes
  useEffect(() => {
    if (!seasonToDates[season]) {
      console.log("No dates found for season: ", season);
      return;
    }

    // Set the dates list
    const datesList = Object.keys(seasonToDates[season]);
    setDates(datesList);

    // Set the date to the latest date
    setDate(datesList[0]);
  }, [season, seasonToDates]);

  // Update the uuid (state) when the date or season changes
  useEffect(() => {
    if (!seasonToDates[season] || !seasonToDates[season][date]) {
      console.log("No simulation found for date: ", date);
      return;
    }

    const uuid = seasonToDates[season][date];
    setSimulationUUID(uuid);
  }, [date, season, seasonToDates]);

  // Update data when the uuid changes
  useEffect(() => {
    setAvgFinishDataState(avgFinishData[simulationUUID] || {});
    setSupplementalData(supplementalData[simulationUUID] || {});
  }, [simulationUUID, avgFinishData, supplementalData]);

  return (
    <PageContainer className="mx-auto max-w-screen-lg">
      <div className="mb-10 flex flex-row justify-between gap-10">
        <h1 className="mt-auto text-3xl font-semibold">
          Premier League Prediction
        </h1>
        <div className="hidden sm:block">
          <PremierLeagueLogoSvg />
        </div>
      </div>
      {/* Links to other pages related to the project */}
      <TabNavigation />
      <FootballTable
        avgFinishData={avgFinishDataState}
        supplementalData={supplementalDataState}
        teamToCrest={teamToCrest}
      />
      <TableControls
        date={date}
        dates={dates}
        season={season}
        seasons={seasons}
        setDate={setDate}
        setSeason={setSeasonWithChecks}
      />
    </PageContainer>
  );
}
