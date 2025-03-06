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
  mapSupplementalData,
} from "@/lib/football/localUtils";
import { generateMetadata } from "@/utils/metadata";
import { unstable_cache } from "next/cache";

export const metadata = generateMetadata({
  title: "Premier League Prediction",
  description:
    "Forecast the final standings of the English Premier League based on historical data.",
  keywords: "Premier League, football, soccer, prediction, PL, EPL",
  canonicalPath: "pl-prediction",
});

// Force the page to never revalidate
export const revalidate = false;

const getCachedData = unstable_cache(
  async () => {
    const avgFinishData = await getAverageFinishData();
    const positionData = await getPositionData();
    const simulationData = await getSimulationsData();
    const currentPoints = await getCurrentPoints();
    const crests = await getCrests();
    return {
      avgFinishData,
      positionData,
      simulationData,
      currentPoints,
      crests,
    };
  },
  ["all-football-data"],
  { tags: ["football-data"] },
);

export default async function Football() {
  const { avgFinishData, positionData, simulationData, currentPoints, crests } =
    await getCachedData();

  // Organize the data by season and date
  var seasonToDatesMap: any = mapSimulationDataToSeasonDates(simulationData);

  // Organize avgFinishData by simulation_uuid
  var avgFinishDataMap: any = mapAvgFinishData(avgFinishData);

  var supplementalDataMap: any = mapSupplementalData(
    positionData,
    currentPoints,
  );

  // Organize crests by team
  var crestsMap: any = createCrestsMap(crests);

  return (
    <FootballContainer
      avgFinishData={avgFinishDataMap}
      supplementalData={supplementalDataMap}
      seasonToDates={seasonToDatesMap}
      teamToCrest={crestsMap}
    />
  );
}
