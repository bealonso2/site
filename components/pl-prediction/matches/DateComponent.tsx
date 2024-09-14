"use client";

export function DateComponent({
  date,
  className = "text-center",
}: {
  date: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {new Date(date + "Z").toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </span>
  );
}
