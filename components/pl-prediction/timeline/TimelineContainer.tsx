"use client";

import PageContainer from "@/components/layout/PageContainer";
import TabNavigation from "@/components/pl-prediction/TabNavigation";
import dynamic from "next/dynamic";
import { Data } from "plotly.js";
import { useMemo, useState } from "react";
import { PremierLeagueLogoSvg } from "../PremierLeagueSvg";
import TableControls from "./TimelineControls";

// Dynamically import Plotly.js without SSR
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface AvgFinishData {
  team: string;
  place: number;
  bottom_3: number;
  top_4: number;
  win_premier_league: number;
}

export default function TimelineContainer({
  avgFinishData,
  seasonToDates,
  teamToCrest,
}: {
  avgFinishData: Map<string, AvgFinishData[]>;
  seasonToDates: any;
  teamToCrest: any;
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
            crest: teamToCrest[team],
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
            place: place,
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

  // Build the traces from the team data
  const traces = Object.entries(teamData).map(([team, data]) => ({
    x: data.map(({ date }) => date),
    y: data.map(({ place }) => place),
    name: team,
    type: "scatter",
    mode: "lines",
    hoverinfo: "none", // No tooltip on hover
  }));

  // Max and min trace dates
  const maxDate = Math.max(
    ...traces.map((trace) => new Date(trace.x[trace.x.length - 1]).getTime()),
  );
  const minDate = Math.min(
    ...traces.map((trace) => new Date(trace.x[0]).getTime()),
  );

  // Set default images to last data point
  const plotImages = traces.map((trace) => ({
    source: teamToCrest[trace.name], // Image URL
    x:
      (Date.parse(trace.x[trace.x.length - 1]) - minDate) / (maxDate - minDate), // Normalized X-axis position
    y: trace.y[trace.y.length - 1],
    xref: "paper", // "paper" makes it use normalized [0,1] range
    yref: "y",
    sizex: 0.75,
    sizey: 0.75,
    xanchor: "center",
    yanchor: "middle",
    layer: "above",
  }));

  //   // Images for all data points
  //   const all = traces.flatMap((trace) =>
  //     trace.x.map((xValue, index) => ({
  //       source: teamToCrest[trace.name], // Image URL
  //       x: (Date.parse(xValue) - minDate) / (maxDate - minDate), // Normalized X-axis position
  //       y: trace.y[index],
  //       xref: "paper", // "paper" makes it use normalized [0,1] range
  //       yref: "y",
  //       sizex: 0.75,
  //       sizey: 0.75,
  //       xanchor: "center",
  //       yanchor: "middle",
  //       layer: "above",
  //     })),
  //   );

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

      {/* Display the table timeline */}
      <Plot
        data={traces as Data[]}
        layout={{
          title: {
            text: "Predicted Premier League Standings",
          },
          xaxis: {
            type: "date",
          },
          yaxis: {
            title: { text: "Predicted Position" },
            autorange: "reversed", // 1st place at the top
            range: [1, 20],
            tickmode: "linear",
          },
          legend: {
            orientation: "h",
          },
          images: plotImages as any,
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          dragmode: false,
        }}
        useResizeHandler
        style={{ width: "100%", height: "800px" }}
        config={{
          displayModeBar: false,
        }}
      />

      <TableControls
        season={season}
        seasons={seasons}
        setSeason={setSeasonWithChecks}
      />
    </PageContainer>
  );
}
