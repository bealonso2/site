import TimelineContainer from "@/components/pl-prediction/timeline/TimelineContainer";
import {
  getAverageFinishData,
  getCrests,
  getSimulationsData,
} from "@/lib/football/data";
import {
  createCrestsMap,
  getPrimaryColors,
  mapAvgFinishData,
  mapSimulationDataToSeasonDates,
} from "@/lib/football/localUtils";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Table Timeline",
  description: "Premier League prediction table position change over time.",
  keywords: "Premier League, football, soccer, prediction, PL, EPL",
  canonicalPath: "pl-prediction/timeline",
});

// Force the page to never revalidate
export const revalidate = false;

export default async function Matches() {
  // TODO: Are these functions cached? Or am I calling them when building this page and the home page?
  const avgFinishData = await getAverageFinishData();
  const simulationData = await getSimulationsData();
  const crests = await getCrests();

  // Organize the data by season and date
  var seasonToDatesMap: any = mapSimulationDataToSeasonDates(simulationData);

  // Organize avgFinishData by simulation_uuid
  var avgFinishDataMap: any = mapAvgFinishData(avgFinishData);

  // Organize crests by team
  var crestsMap: any = createCrestsMap(crests);

  // From crests map, get the primary color for each team
  var teamToPrimaryColor: any = await getPrimaryColors(crestsMap);

  // Combine crests and primary colors into one map (team -> crest, primary color)
  for (const [team, primaryColor] of Object.entries(teamToPrimaryColor)) {
    crestsMap[team] = { crest: crestsMap[team], primaryColor };
  }

  return (
    <TimelineContainer
      avgFinishData={avgFinishDataMap}
      seasonToDates={seasonToDatesMap}
      teamToCrestAndColor={crestsMap}
    />
  );
}
