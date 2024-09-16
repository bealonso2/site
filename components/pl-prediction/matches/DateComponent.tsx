"use client";

import { useState, useEffect } from "react";

export function DateComponent({
  date,
  className = "text-center",
}: {
  date: string;
  className?: string;
}) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    // Date is currently in the format "YYYY-MM-DD HH:MM:SS" and we want to
    // tell the browser it is UTC time so it can convert it to the user's local
    // time zone
    const formatted = new Date(`${date.replace(" ", "T")}Z`).toLocaleString(
      undefined,
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      },
    );
    setFormattedDate(formatted);
  }, [date]);

  return <span className={className}>{formattedDate}</span>;
}
