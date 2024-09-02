"use client";
import { useEffect, useState } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

const useTOCHeadings = (): Heading[] => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const headingElements = document.querySelectorAll("h2, h3, h4, h5, h6");
    const headingArray: Heading[] = Array.from(headingElements).map(
      (heading) => {
        let id = heading.id;

        // If the heading doesn't have an ID, generate one based on its text content
        if (!id) {
          id = heading.textContent?.replace(/\s+/g, "-").toLowerCase() || "";
          heading.id = id; // Update the DOM element with the generated ID
        }

        // Extract the level from the tag name (e.g., 'h2' -> 2)
        const level = parseInt(heading.tagName[1], 10);

        return {
          id,
          text: heading.textContent || "",
          level,
        };
      }
    );

    setHeadings(headingArray);
  }, []);

  return headings;
};

export default useTOCHeadings;
