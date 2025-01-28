"use client";

import PageContainer from "@/components/layout/PageContainer";
import TabNavigation from "@/components/pl-prediction/TabNavigation";
import React, { Suspense, useCallback } from "react";
import { PremierLeagueLogoSvg } from "../PremierLeagueSvg";
import Match from "./Match";
import { SortCriteria, SortDropdown } from "./SortComponent";

interface Match {
  utc_date: string;
  home_win_probability: number;
  draw_probability: number;
  away_win_probability: number;
}

export default function MatchesContainer({
  upcomingMatches,
  teamToCrest,
}: {
  upcomingMatches: any;
  teamToCrest: any;
}) {
  const [sortedMatches, setSortedMatches] =
    React.useState<Match[]>(upcomingMatches);

  const sortMatches = (matches: Match[], criteria: SortCriteria): Match[] => {
    return matches.slice().sort((a, b) => {
      if (criteria === "date") {
        return new Date(a.utc_date).getTime() - new Date(b.utc_date).getTime();
      } else if (criteria === "best") {
        // Compute variance of probabilities
        const getVariance = (match: Match): number => {
          const mean =
            (match.home_win_probability +
              match.away_win_probability +
              match.draw_probability) /
            3;
          return (
            (Math.pow(match.home_win_probability - mean, 2) +
              Math.pow(match.away_win_probability - mean, 2) +
              Math.pow(match.draw_probability - mean, 2)) /
            3
          );
        };

        const aVariance = getVariance(a);
        const bVariance = getVariance(b);

        return aVariance - bVariance;
      }
      return 0;
    });
  };

  // Update the sorted matches when the sort criteria changes
  const updateSortedMatches = useCallback(
    (criteria: SortCriteria) => {
      setSortedMatches(sortMatches(upcomingMatches, criteria));
    },
    [upcomingMatches],
  );

  return (
    <PageContainer className="mx-auto max-w-screen-lg">
      <div className="mb-10 flex flex-row justify-between gap-10">
        <h1 className="mt-auto text-3xl font-semibold">Match Predictions</h1>
        <div className="hidden sm:block">
          <PremierLeagueLogoSvg />
        </div>
      </div>
      {/* Links to other pages related to the project */}
      <TabNavigation />

      {/* Dropdown to sort matches */}
      <Suspense>
        <SortDropdown updateSortedMatches={updateSortedMatches} />
      </Suspense>

      {/* Display the upcoming match data */}
      {upcomingMatches.length === 0 ? (
        <p className="m-10 h-screen text-center">No upcoming matches.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="mt-8 grid grid-cols-1 justify-center gap-8 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
            {sortedMatches.map((match: any, index: number) => (
              <Match key={index} match={match} teamToCrest={teamToCrest} />
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
