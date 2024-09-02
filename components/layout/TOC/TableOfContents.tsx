"use client";
import React from "react";
import useTOCHeadings, { Heading } from "./useTOCHeadings";

interface TOCProps {
  headings?: Heading[];
}

const TOC: React.FC<TOCProps> = ({ headings }) => {
  if (!headings) {
    headings = useTOCHeadings();
  }

  const renderTOC = (
    headings: Heading[],
    currentLevel = 2
  ): JSX.Element | null => {
    const items: JSX.Element[] = [];
    let index = 0;

    while (index < headings.length) {
      const heading = headings[index];

      if (heading.level === currentLevel) {
        // Start a new list item for the current heading
        const subHeadings = [];
        index++;

        // Gather all subheadings that belong to the current heading
        while (
          index < headings.length &&
          headings[index].level > currentLevel
        ) {
          subHeadings.push(headings[index]);
          index++;
        }

        items.push(
          <li key={heading.id}>
            <a href={`#${heading.id}`}>{heading.text}</a>
            {/* Recursively render subheadings if any */}
            {subHeadings.length > 0 && renderTOC(subHeadings, currentLevel + 1)}
          </li>
        );
      } else {
        index++;
      }
    }

    if (items.length === 0) return null;
    return <ul>{items}</ul>;
  };

  return <nav className="prose">{renderTOC(headings)}</nav>;
};

export default TOC;
