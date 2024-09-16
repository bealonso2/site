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
    const formatted = new Date(date + "Z").toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    setFormattedDate(formatted);
  }, [date]);

  return <span className={className}>{formattedDate}</span>;
}
