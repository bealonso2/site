import * as d3 from "d3";
import { useMemo } from "react";

function ProbabilityTableData(data: number) {
  return <td>{data < 0.01 ? "<0.1%" : `${(data * 100).toFixed(0)}%`}</td>;
}

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
  positionData,
}: {
  avgFinishData: any[];
  positionData: { [key: string]: { [key: string]: number } };
}) {
  // Determine the total count of all positions for the first team
  const totalCount = Object.values(
    positionData[Object.keys(positionData)[0]]
  ).reduce((a, b) => a + b, 0);

  // Normalize the data. Store the largest value of all the teams
  var maxPct = 0;
  const normalizedPositionData = Object.entries(positionData).reduce(
    (acc, [team, positionData]) => {
      // Divide each count (value) by the total count to get a percentage
      const newPositionData = Object.entries(positionData).reduce(
        (acc, [position, count]) => {
          const normalizedCount = count / totalCount;
          maxPct = Math.max(maxPct, normalizedCount);
          acc[position] = normalizedCount;
          return acc;
        },
        {} as { [key: string]: number }
      );
      acc[team] = newPositionData;
      return acc;
    },
    {} as { [key: string]: { [key: string]: number } }
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Team</th>
          <th>Avg. Place</th>
          <th className="hidden md:table-cell">All Places</th>
          <th>Finish Bottom 3</th>
          <th>Finish Top 4</th>
          <th>Win Premier League</th>
        </tr>
      </thead>
      <tbody>
        {avgFinishData.map((row, i) => (
          <tr key={i} className="hover">
            <th>{i + 1}</th>
            <td>{row.team}</td>
            <td>{row.place}</td>
            <td className="hidden md:table-cell">
              <PositionsHistogram
                positionData={normalizedPositionData[row.team]}
                maxPctFinish={maxPct}
              />
            </td>
            {ProbabilityTableData(row.bottom_3)}
            {ProbabilityTableData(row.top_4)}
            {ProbabilityTableData(row.win_premier_league)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}