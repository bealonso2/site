import MatchesContainer from "@/components/pl-prediction/matches/MatchesContainer";
import { config } from "@/config";
import { getCrests, getUpcomingMatches } from "@/lib/football/data";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Match Predictions",
  description:
    "Predictions of the outcomes of upcoming Premier League matches.",
  keywords: "Premier League, football, soccer, prediction, PL, EPL",
  canonicalPath: "pl-prediction/matches",
});

// Force the page to never revalidate unless the cache is invalidated
export const revalidate = false;
export const revalidateTag = config.football_data_cache_tag;

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
