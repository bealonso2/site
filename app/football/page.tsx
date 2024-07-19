import FootballContainer from "@/components/FootballContainer";
import {
  getAverageFinishData,
  getPositionData,
  getSimulationsData,
} from "@/lib/football/data";

// Force the page to never revalidate
export const revalidate = false;

export default async function Football() {
  const avgFinishData = await getAverageFinishData();
  const positionData = await getPositionData();
  const simulationData = await getSimulationsData();

  // Organize the data by season and date
  var seasonToDatesMap: any = {};

  simulationData.forEach((result: any) => {
    // Ensure the season key exists
    if (!seasonToDatesMap[result.season]) {
      seasonToDatesMap[result.season] = {};
    }

    // Trim the date to just the date
    result.date = result.date.split(" ")[0];

    // Map date to uuid
    seasonToDatesMap[result.season][result.date] = result.uuid;
  });

  // Organize avgFinishData by simulation_uuid
  var avgFinishDataMap: any = {};

  avgFinishData.forEach((result: any) => {
    avgFinishDataMap[result.simulation_uuid] =
      avgFinishDataMap[result.simulation_uuid] || [];
    avgFinishDataMap[result.simulation_uuid].push({
      team: result.team,
      place: result.place,
      bottom_3: result.bottom_3,
      top_4: result.top_4,
      win_premier_league: result.win_premier_league,
    });
  });

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

  return (
    <FootballContainer
      avgFinishData={avgFinishDataMap}
      positionData={positionDataMap}
      seasonToDates={seasonToDatesMap}
    />
  );
}
