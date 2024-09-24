"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export type SortCriteria = "date" | "best";

// Array of valid sort criteria
// Note: This is stupid, why am I even using TypeScript?
const validSortCriteria: SortCriteria[] = ["date", "best"];

// Function to check if a value is a valid SortCriteria
const isValidSortCriteria = (value: any): value is SortCriteria => {
  return validSortCriteria.includes(value);
};

export function SortDropdown({
  updateSortedMatches,
}: {
  updateSortedMatches: (sortCriteria: SortCriteria) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortQuery = searchParams.get("sort");

  // Update sortCriteria and query when dropdown value changes
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortCriteria = event.target.value;

    // Check if criteria is a valid SortCriteria
    if (isValidSortCriteria(newSortCriteria)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", newSortCriteria);
      router.replace(`?${params.toString()}`);
    } else {
      console.error("Invalid sort criteria");
    }
  };

  // Update sortCriteria when query changes
  useEffect(() => {
    if (isValidSortCriteria(sortQuery)) {
      // Update sorted matches when sortCriteria changes
      updateSortedMatches(sortQuery);
    }
  }, [sortQuery, updateSortedMatches]);

  return (
    <div className="join mx-auto mt-10">
      <label
        className="label join-item select-bordered rounded-md border p-2 text-sm sm:text-base"
        htmlFor="sort"
      >
        Sort by
      </label>
      <select
        className="border-base join-item select select-bordered text-sm sm:text-base"
        id="sort"
        value={sortQuery || "date"}
        onChange={handleSortChange}
      >
        <option value="date">Date</option>
        <option value="best">Best Matches</option>
      </select>
    </div>
  );
}
