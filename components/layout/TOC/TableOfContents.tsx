"use client";
import React from "react";
import useTOCHeadings, { Heading } from "./useTOCHeadings";

interface TOCProps {
  minLevel?: number;
  maxLevel?: number;
}

const TOC: React.FC<TOCProps> = ({ minLevel = 2, maxLevel = 6 }) => {
  const headings = useTOCHeadings();

  const renderTOC = (
    headings: Heading[],
    level: number,
    maxLevel: number,
  ): JSX.Element | null => {
    const items: JSX.Element[] = [];
    let index = 0;

    while (index < headings.length) {
      const heading = headings[index];

      if (heading.level === level) {
        // Start a new list item for the current heading
        const subHeadings = [];
        index++;

        // Gather all subheadings that belong to the current heading
        while (index < headings.length && headings[index].level > level) {
          subHeadings.push(headings[index]);
          index++;
        }

        items.push(
          <li key={heading.id}>
            <a href={`#${heading.id}`}>{heading.text}</a>
            {/* Recursively render subheadings if any and within maxLevel */}
            {subHeadings.length > 0 &&
              level < maxLevel &&
              renderTOC(subHeadings, level + 1, maxLevel)}
          </li>,
        );
      } else {
        index++;
      }
    }

    if (items.length === 0) return null;
    return <ul>{items}</ul>;
  };

  return <nav className="prose">{renderTOC(headings, minLevel, maxLevel)}</nav>;
};

export default TOC;
