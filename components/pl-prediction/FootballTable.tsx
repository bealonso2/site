import * as d3 from "d3";
import { useMemo } from "react";
import {
  ProbabilityDataType,
  ProbabilityTableData,
  TeamEntry,
} from "./DataComponents";

type BarPlotProps = {
  width: number;
  height: number;
  data: { name: string; value: number }[];
  maxPctFinish: number;
};

export const BarPlot = ({
  width,
  height,
  data,
  maxPctFinish,
}: BarPlotProps) => {
  // X axis is for groups since the bar plot is vertical
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(data.map((d) => d.name).reverse()) // Reverse the domain
      .range([0, width])
      .padding(0);
  }, [data, width]);

  // Y axis
  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, maxPctFinish]).range([height, 0]);
  }, [maxPctFinish, height]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    const x = xScale(d.name);
    if (x === undefined) {
      return null;
    }
    const y = yScale(d.value); // Calculate the top y-value of the rectangle
    const rectHeight = height - y; // Calculate the height of the rectangle

    return (
      <g key={i} className="fill-base-content">
        <rect
          x={x}
          y={y}
          width={xScale.bandwidth()}
          height={rectHeight}
          opacity={0.7}
          fillOpacity={0.3}
          strokeWidth={1}
          ry={1}
        />
      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g>{allShapes}</g>
      </svg>
    </div>
  );
};

function PositionsHistogram({
  positionData,
  maxPctFinish,
}: {
  positionData: { [key: string]: number };
  maxPctFinish: number;
}) {
  // Transform positionData key-value pairs to an array of names and values
  const data = Object.entries(positionData).map(([position, count]) => ({
    name: position.toString(),
    value: Number(count),
  }));
  return (
    <BarPlot width={100} height={30} data={data} maxPctFinish={maxPctFinish} />
  );
}

export default function FootballTable({
  avgFinishData,
  supplementalData,
  teamToCrest,
}: {
  avgFinishData: {
    team: string;
    place: number;
    bottom_3: number;
    top_4: number;
    win_premier_league: number;
  }[];
  supplementalData: {
    [key: string]: {
      positions: { [key: string]: number };
      points: number;
      max_position: number;
      min_position: number;
    };
  };
  teamToCrest: { [key: string]: string };
}) {
  // Determine the total count of all positions for the first team
  const totalCount = Object.values(
    supplementalData[Object.keys(supplementalData)[0]].positions,
  ).reduce((a, b) => a + b, 0);

  // Normalize the data. Store the largest value of all the teams
  var maxPct = 0;
  const normalizedPositionData = Object.entries(supplementalData).reduce(
    (acc, [team, supplementalData]) => {
      // Divide each count (value) by the total count to get a percentage
      const newPositionData = Object.entries(supplementalData.positions).reduce(
        (acc, [position, count]) => {
          const normalizedCount = count / totalCount;
          maxPct = Math.max(maxPct, normalizedCount);
          acc[position] = normalizedCount;
          return acc;
        },
        {} as { [key: string]: number },
      );
      acc[team] = newPositionData;
      return acc;
    },
    {} as { [key: string]: { [key: string]: number } },
  );

  return (
    <div className="overflow-x-auto py-5">
      <table className="table min-w-full">
        <thead>
          <tr>
            <th className="hidden sm:table-cell"></th>
            <th className="sticky left-0 z-10 bg-base-100 sm:bg-inherit">
              Team
            </th>
            <th className="text-wrap text-center">Avg. Simulated Finish</th>
            <th className="hidden text-center md:table-cell">All Places</th>
            <th className="text-wrap text-center">Finish Bottom 3</th>
            <th className="text-wrap text-center">Finish Top 4</th>
            <th className="text-wrap text-center">Win Premier League</th>
          </tr>
        </thead>
        <tbody>
          {avgFinishData.map((row, i) => (
            <tr key={i} className="sm:hover">
              <th className="sticky left-0 hidden max-w-min sm:table-cell">
                {i + 1}
              </th>
              <td className="sticky left-0 z-10 bg-base-100 p-2 pr-1 sm:bg-inherit">
                <TeamEntry
                  team={row.team}
                  crest={teamToCrest[row.team]}
                  points={supplementalData[row.team].points}
                />
              </td>
              <td className="text-center">
                {parseFloat(row.place.toFixed(2))}
              </td>
              <td className="hidden md:table-cell">
                <PositionsHistogram
                  positionData={normalizedPositionData[row.team]}
                  maxPctFinish={maxPct}
                />
              </td>
              <ProbabilityTableData
                data={row.bottom_3}
                dataType={ProbabilityDataType.Relegation}
                isConfirmedTrue={supplementalData[row.team].max_position > 17}
                isConfirmedFalse={supplementalData[row.team].min_position <= 17}
              />
              <ProbabilityTableData
                data={row.top_4}
                dataType={ProbabilityDataType.Top4}
                isConfirmedTrue={supplementalData[row.team].min_position <= 4}
                isConfirmedFalse={supplementalData[row.team].max_position > 4}
              />
              <ProbabilityTableData
                data={row.win_premier_league}
                dataType={ProbabilityDataType.Champion}
                isConfirmedTrue={supplementalData[row.team].min_position === 1}
                isConfirmedFalse={supplementalData[row.team].max_position > 1}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
