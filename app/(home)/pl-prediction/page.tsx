import FootballContainer from "@/components/pl-prediction/FootballContainer";
import {
  getAverageFinishData,
  getCrests,
  getCurrentPoints,
  getPositionData,
  getSimulationsData,
} from "@/lib/football/data";
import {
  createCrestsMap,
  mapAvgFinishData,
  mapSimulationDataToSeasonDates,
} from "@/lib/football/localUtils";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Premier League Prediction",
  description:
    "Forecast the final standings of the English Premier League based on historical data.",
  keywords: "Premier League, football, soccer, prediction, PL, EPL",
  canonicalPath: "pl-prediction",
});

// Force the page to never revalidate
export const revalidate = false;

export default async function Football() {
  const avgFinishData = await getAverageFinishData();
  const positionData = await getPositionData();
  const simulationData = await getSimulationsData();
  const currentPoints = await getCurrentPoints();
  const crests = await getCrests();

  // Organize the data by season and date
  var seasonToDatesMap: any = mapSimulationDataToSeasonDates(simulationData);

  // Organize avgFinishData by simulation_uuid
  var avgFinishDataMap: any = mapAvgFinishData(avgFinishData);

  // Organize positionData by simulation_uuid
  var positionDataMap: any = {};

  positionData.forEach((result: any) => {
    // Ensure simulation_uuid exists
    if (!positionDataMap[result.simulation_uuid]) {
      positionDataMap[result.simulation_uuid] = {};
    }

    // Ensure team exists within simulation_uuid
    if (!positionDataMap[result.simulation_uuid][result.team]) {
      positionDataMap[result.simulation_uuid][result.team] = {};
    }

    // Assign position to count within team
    positionDataMap[result.simulation_uuid][result.team][result.position] =
      result.count;
  });

  // Organize current points by simulation_uuid
  var currentPointsMap: any = {};

  currentPoints.forEach((result: any) => {
    currentPointsMap[result.simulation_uuid] =
      currentPointsMap[result.simulation_uuid] || {};

    // Update the points for the team
    currentPointsMap[result.simulation_uuid][result.team] = result.points;
  });

  // Organize crests by team
  var crestsMap: any = createCrestsMap(crests);

  return (
    <FootballContainer
      avgFinishData={avgFinishDataMap}
      positionData={positionDataMap}
      currentPoints={currentPointsMap}
      seasonToDates={seasonToDatesMap}
      teamToCrest={crestsMap}
    />
  );
}
