import TimelineContainer from "@/components/pl-prediction/timeline/TimelineContainer";
import { config } from "@/config";
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

// Force the page to never revalidate unless the cache is invalidated
export const revalidate = false;
export const revalidateTag = config.football_data_cache_tag;

export default async function TableTimelinePage() {
  // Get data not dependent on simulation_uuid
  const simulationData = await getSimulationsData();
  const crests = await getCrests();

  // Call avgFinishData with all simulation_uuids and combine into one array
  const avgFinishData = Promise.all(
    simulationData.map((simulation: any) =>
      getAverageFinishData(simulation.uuid),
    ),
  ).then((results) => results.flat());

  // TODO: use already organized data by season

  // Organize the data by season and date
  var seasonToDatesMap: any = mapSimulationDataToSeasonDates(simulationData);

  // Organize avgFinishData by simulation_uuid
  var avgFinishDataMap: any = mapAvgFinishData(await avgFinishData);

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
