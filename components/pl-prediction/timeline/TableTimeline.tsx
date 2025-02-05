"use client";

import dynamic from "next/dynamic";
import { Data } from "plotly.js";

// Dynamically import Plotly.js without SSR
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function TableTimeline({
  traces,
  plotImages,
}: {
  traces: any[];
  plotImages: any[];
}) {
  // Display the table timeline
  return (
    <Plot
      data={traces as Data[]}
      layout={{
        title: {
          text: "Predicted Premier League Standings",
        },
        xaxis: {
          type: "date",
        },
        yaxis: {
          title: { text: "Predicted Position" },
          autorange: "reversed", // 1st place at the top
          range: [1, 20],
          tickmode: "linear",
        },
        legend: {
          orientation: "h",
        },
        images: plotImages as any,
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        dragmode: false,
      }}
      useResizeHandler
      style={{ width: "100%", height: "800px" }}
      config={{
        displayModeBar: false,
      }}
    />
  );
}
