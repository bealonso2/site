"use client";

import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";

export default function TableTimeline({
  teamData,
}: {
  teamData: {
    x: string[];
    y: number[];
    name: string;
    crestUrl: string;
    primaryColor: string;
  }[];
}) {
  // Find the min and max dates
  const firstTeam = teamData[0];
  const minDate = useMemo(() => new Date(firstTeam.x[0]), [firstTeam.x]);
  const maxDate = useMemo(
    () => new Date(firstTeam.x[firstTeam.x.length - 1]),
    [firstTeam.x],
  );

  // Create a reference to the SVG element
  const svgRef = useRef<SVGSVGElement | null>(null);

  const defaultHeight = 600;
  const crestSize = 20;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const resize = () => {
      // Define width & height
      const width = svgRef.current ? svgRef.current.clientWidth : 0;
      const height = defaultHeight;

      // Plot the data
      svg.selectAll("*").remove();

      // Define margins
      const margin = { top: 20, right: 20, bottom: 20, left: 50 };
      const plotWidth = width - margin.left - margin.right;
      const plotHeight = height - margin.top - margin.bottom;

      // Define scales
      const xScale = d3
        .scaleTime()
        .domain([minDate, maxDate])
        .range([0, plotWidth]);
      const yScale = d3.scaleLinear().domain([20, 1]).range([plotHeight, 0]);

      // Create plot area with margin
      const plotArea = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Add x-axis
      const xAxis = d3.axisBottom(xScale).ticks(d3.timeMonth.every(1));

      const xAxisGroup = svg
        .append("g")
        .attr(
          "transform",
          `translate(${margin.left},${height - margin.bottom})`,
        )
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-65)")
        .text((d) => d3.timeFormat("%b-%Y")(new Date(d as string)));

      // Add y-axis with margin
      const yAxis = d3.axisLeft(yScale).ticks(20);

      const yAxisGroup = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .call(yAxis);

      // Move axes to the back
      xAxisGroup.lower();
      yAxisGroup.lower();

      // Create tooltip
      const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("display", "none");

      // Plot all teams
      teamData.forEach((team) => {
        // Add line
        const line = d3
          .line<string>()
          .x((d) => xScale(new Date(d)))
          .y((d, i) => yScale(team.y[i]));

        plotArea
          .append("path")
          .datum(team.x)
          .attr("fill", "none")
          .attr("stroke", team.primaryColor)
          .attr("stroke-width", 1.5)
          .attr("d", line);

        // Add images
        plotArea
          .selectAll(`image.${team.name}`)
          .data(team.x)
          .enter()
          .append("image")
          .attr("class", team.name)
          .attr("xlink:href", team.crestUrl)
          .attr("x", (d) => xScale(new Date(d)) - crestSize / 2) // Adjusting for image width
          .attr("y", (d, i) => yScale(team.y[i]) - crestSize / 2) // Adjusting for image height
          .attr("width", crestSize)
          .attr("height", crestSize)
          .on("mouseover", function (event, d) {
            const xPosition = event.pageX;
            const svgWidth = svgRef.current ? svgRef.current.clientWidth : 0;
            const offset = xPosition > svgWidth / 2 ? -150 : 10; // Adjust offset based on position
            tooltip
              .style("display", "block")
              .html(
                `<div style="text-align: center;">
              <strong>${team.name}</strong><br/>
              ${d3.timeFormat("%B %d, %Y")(new Date(d))}<br/>
              Average Finish: ${team.y[team.x.indexOf(d)].toFixed(2)}
            </div>`,
              )
              .style("left", `${xPosition + offset}px`)
              .style("top", `${event.pageY + 10}px`);
          })
          .on("mouseout", function () {
            tooltip.style("display", "none");
          })
          .raise(); // Bring to the front
      });
    };

    // Initial render
    resize();

    // Add resize event listener
    window.addEventListener("resize", resize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", resize);
  }, [minDate, maxDate, teamData]);

  return (
    <svg
      className="my-10"
      ref={svgRef}
      width="100%"
      height={defaultHeight + 50}
    ></svg>
  ); // Increased height to accommodate rotated x-axis labels
}
