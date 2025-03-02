import { Vibrant } from "node-vibrant/node";
export function mapAvgFinishData(avgFinishData: any) {
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

  return avgFinishDataMap;
}

export function mapSimulationDataToSeasonDates(simulationData: any) {
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

  return seasonToDatesMap;
}

export function createCrestsMap(crests: any) {
  // Organize crests by team
  var crestsMap: any = {};

  crests.forEach((result: any) => {
    crestsMap[result.team] = result.crest;
  });
  return crestsMap;
}

export async function getPrimaryColors(
  crestsMap: Map<string, string>,
): Promise<Map<string, string>> {
  // From crests map, get the primary color for each team
  const teamToPrimaryColor: any = {};

  for (const [team, crest] of Object.entries(crestsMap)) {
    teamToPrimaryColor[team] = await getPrimaryColor(crest);
  }

  return teamToPrimaryColor;
}

const getPrimaryColor = async (crest: string): Promise<string> => {
  try {
    const palette = await Vibrant.from(crest).getPalette();
    if (palette.Vibrant) {
      const [r, g, b] = palette.Vibrant.rgb;
      return `rgb(${r}, ${g}, ${b})`;
    }
  } catch (error) {
    console.error("Error extracting primary color:", error);
  }
  return "steelblue";
};

export function mapSupplementalData(positionData: any, currentPoints: any) {
  var supplementalDataMap: any = {};

  // Organize positionData by simulation_uuid
  positionData.forEach((result: any) => {
    // Ensure simulation_uuid exists
    if (!supplementalDataMap[result.simulation_uuid]) {
      supplementalDataMap[result.simulation_uuid] = {};
    }

    // Ensure team exists within simulation_uuid
    if (!supplementalDataMap[result.simulation_uuid][result.team]) {
      supplementalDataMap[result.simulation_uuid][result.team] = {
        positions: {},
      };
    }

    // Assign position to count within team
    supplementalDataMap[result.simulation_uuid][result.team].positions[
      result.position
    ] = result.count;
  });

  // Organize current points by simulation_uuid
  var currentPointsMap: any = {};

  // Organize max and min possible position by simulation_uuid
  var maxPositionMap: any = {};
  var minPositionMap: any = {};

  currentPoints.forEach((result: any) => {
    currentPointsMap[result.simulation_uuid] =
      currentPointsMap[result.simulation_uuid] || {};

    // Update the points for the team
    currentPointsMap[result.simulation_uuid][result.team] = result.points;

    // Update the max position for the team
    maxPositionMap[result.simulation_uuid] =
      maxPositionMap[result.simulation_uuid] || {};

    maxPositionMap[result.simulation_uuid][result.team] =
      result.max_possible_position;

    // Update the min position for the team
    minPositionMap[result.simulation_uuid] =
      minPositionMap[result.simulation_uuid] || {};

    minPositionMap[result.simulation_uuid][result.team] =
      result.min_possible_position;
  });

  // Merge points, max and min positions, and positions into a single object
  for (let uuid in supplementalDataMap) {
    for (let team in supplementalDataMap[uuid]) {
      supplementalDataMap[uuid][team]["points"] =
        currentPointsMap[uuid][team] || 0;
      supplementalDataMap[uuid][team]["max_position"] =
        maxPositionMap[uuid][team] || 0;
      supplementalDataMap[uuid][team]["min_position"] =
        minPositionMap[uuid][team] || 0;
    }
  }
  return supplementalDataMap;
}
