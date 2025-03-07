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
  // Get data not dependent on simulation_uuid
  const simulationData = await getSimulationsData();
  const crests = await getCrests();

  // Call avgFinishData, positionData, and currentPoints with all simulation_uuids and combine into one array
  const avgFinishData = Promise.all(
    simulationData.map((simulation: any) =>
      getAverageFinishData(simulation.uuid),
    ),
  ).then((results) => results.flat());
  const positionData = Promise.all(
    simulationData.map((simulation: any) => getPositionData(simulation.uuid)),
  ).then((results) => results.flat());
  const currentPoints = Promise.all(
    simulationData.map((simulation: any) => getCurrentPoints(simulation.uuid)),
  ).then((results) => results.flat());

  // TODO: use already organized data by season

  // Organize the data by season and date
  var seasonToDatesMap: any = mapSimulationDataToSeasonDates(simulationData);

  // Organize avgFinishData by simulation_uuid
  var avgFinishDataMap: any = mapAvgFinishData(await avgFinishData);

  var supplementalDataMap: any = mapSupplementalData(
    await positionData,
    await currentPoints,
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
