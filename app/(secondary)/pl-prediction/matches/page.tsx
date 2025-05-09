import MatchesContainer from "@/components/pl-prediction/matches/MatchesContainer";
import { getCrests, getUpcomingMatches } from "@/lib/football/data";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Match Predictions",
  description:
    "Predictions of the outcomes of upcoming Premier League matches.",
  keywords: "Premier League, football, soccer, prediction, PL, EPL",
  canonicalPath: "pl-prediction/matches",
});

// Revalidate the page every hour
export const revalidate = 3600;

export default async function Matches() {
  const upcomingMatches = await getUpcomingMatches();
  const crests = await getCrests();

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
