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
