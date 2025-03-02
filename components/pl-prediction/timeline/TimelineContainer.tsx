"use client";

import PageContainer from "@/components/layout/PageContainer";
import TabNavigation from "@/components/pl-prediction/TabNavigation";
import { useMemo, useState } from "react";
import { PremierLeagueLogoSvg } from "../PremierLeagueSvg";
import TableTimeline from "./TableTimeline";
import TableControls from "./TimelineControls";

interface AvgFinishData {
  team: string;
  place: number;
  bottom_3: number;
  top_4: number;
  win_premier_league: number;
}

function normalizePlace(place: number, max: number, min: number) {
  // Normalize the place to a value between 1 and 20
  return ((place - min) / (max - min)) * 19 + 1;
}

export default function TimelineContainer({
  avgFinishData,
  seasonToDates,
  teamToCrestAndColor: teamToCrest,
}: {
  avgFinishData: Map<string, AvgFinishData[]>;
  seasonToDates: any;
  teamToCrestAndColor: any;
}) {
  // Get the most recent season
  const seasons = Object.keys(seasonToDates).sort(
    (a, b) => Number(b) - Number(a),
  );
  const firstSeason = seasons[0];

  // Set the initial season
  const [season, setSeason] = useState<string>(firstSeason);

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

  // Update dates when the season changes
  const datesAndUUIDs = seasonToDates[season];

  // Build a map of uuids to positions
  const uuidToPositions = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(avgFinishData).map(([uuid, data]) => [
          uuid,
          data.map(({ team, place }: { team: string; place: number }) => ({
            team,
            crest: teamToCrest[team].crest,
            primaryColor: teamToCrest[team].primaryColor,
            place,
          })),
        ]),
      ),
    [avgFinishData, teamToCrest],
  );

  // Get unique teams for the current season
  const teams = new Set<string>(
    Object.values(uuidToPositions)
      .flat()
      .map(({ team }) => team),
  );

  // Find max and min place for each date/simulation uuid
  const maxMinPlacePerUUID = Object.fromEntries(
    Object.entries(datesAndUUIDs as Map<string, string>).map(([date, uuid]) => {
      const places =
        uuidToPositions[uuid]?.map(({ place }: { place: number }) => place) ||
        [];
      return [
        uuid,
        {
          maxPlace: Math.max(...places),
          minPlace: Math.min(...places),
        },
      ];
    }),
  );

  // Flatten data
  const flatData = Object.entries(datesAndUUIDs as Map<string, string>)
    .reverse()
    .flatMap(
      ([date, uuid]) =>
        uuidToPositions[uuid]?.map(
          ({
            team,
            place,
            crest,
          }: {
            team: string;
            place: number;
            crest: string;
          }) => ({
            date: date,
            place: normalizePlace(
              place,
              maxMinPlacePerUUID[uuid].maxPlace,
              maxMinPlacePerUUID[uuid].minPlace,
            ),
            team: team,
            crest: crest,
          }),
        ) || [],
    );

  // Map teams to their data
  const teamData = Object.fromEntries(
    Array.from(teams).map((team) => [
      team,
      flatData
        .filter((data) => data.team === team)
        .map(({ date, place }) => ({ date, place })),
    ]),
  );

  // Normalize

  console.log("maxMinPlacePerUUID", maxMinPlacePerUUID);

  // Build the traces from the team data
  const dataPerTeam = Object.entries(teamData)
    .map(
      ([team, data]) =>
        ({
          x: data.map(({ date }) => date),
          y: data.map(({ place }) => place),
          name: team,
          crestUrl: teamToCrest[team].crest,
          primaryColor: teamToCrest[team].primaryColor,
        }) as {
          x: string[];
          y: number[];
          name: string;
          crestUrl: string;
          primaryColor: string;
        },
    )
    .sort((a, b) => b.y[b.y.length - 1] - a.y[a.y.length - 1]);

  return (
    <PageContainer className="mx-auto max-w-screen-xl">
      <div className="mb-10 flex flex-row justify-between gap-10">
        <h1 className="mt-auto text-3xl font-semibold">Table Timeline</h1>
        <div className="hidden sm:block">
          <PremierLeagueLogoSvg />
        </div>
      </div>

      {/* Links to other pages related to the project */}
      <TabNavigation />

      {/* 
        Cool things to do with hover/how to display the data:
        - Teams on the side. Hover on the team to isolate their data.
        - Dates on the X axis. Hover over the middle of the chart to see the table at that date.
      */}
      <TableTimeline teamData={dataPerTeam} />
      <TableControls
        season={season}
        seasons={seasons}
        setSeason={setSeasonWithChecks}
      />
    </PageContainer>
  );
}
