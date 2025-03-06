import MatchesContainer from "@/components/pl-prediction/matches/MatchesContainer";
import { getCrests, getUpcomingMatches } from "@/lib/football/data";
import { generateMetadata } from "@/utils/metadata";
import { unstable_cache } from "next/cache";

export const metadata = generateMetadata({
  title: "Match Predictions",
  description:
    "Predictions of the outcomes of upcoming Premier League matches.",
  keywords: "Premier League, football, soccer, prediction, PL, EPL",
  canonicalPath: "pl-prediction/matches",
});

// Force the page to never revalidate
export const revalidate = false;

const getCachedData = unstable_cache(
  async () => {
    let upcomingMatches;
    try {
      upcomingMatches = await getUpcomingMatches();
    } catch (error) {
      upcomingMatches = [];
    }
    const crests = await getCrests();
    return {
      upcomingMatches,
      crests,
    };
  },
  ["matches-football-data"],
  { tags: ["football-data"] },
);

export default async function Matches() {
  const { upcomingMatches, crests } = await getCachedData();

  // Organize crests by team
  var crestsMap: any = {};

  crests.forEach((result: any) => {
    crestsMap[result.team] = result.crest;
  });

  return (
    <MatchesContainer
      upcomingMatches={upcomingMatches}
      teamToCrest={crestsMap}
    />
  );
}
