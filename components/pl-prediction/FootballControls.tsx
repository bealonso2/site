export default function TableControls({
  date,
  dates,
  season,
  seasons,
  setDate,
  setSeason,
}: {
  date: string;
  dates: string[];
  season: string;
  seasons: string[];
  setDate: (date: string) => void;
  setSeason: (season: string) => void;
}) {
  const handleDateChange = (event: any) => {
    setDate(event.target.value);
  };

  const handleSeasonChange = (event: any) => {
    setSeason(event.target.value);
  };

  // Dropdown to toggle between seasons
  return (
    <div className="flex flex-col items-center justify-evenly gap-y-2 sm:flex-row">
      <label className="mr-2">
        Forecast from
        <select className="ml-2" value={date} onChange={handleDateChange}>
          {dates.map((date, i) => {
            return (
              <option key={i} value={date}>
                {
                  /* Get todays date in YYYY-MM-DD format */
                  new Date().toISOString().split("T")[0] === date
                    ? "Today"
                    : date
                }
              </option>
            );
          })}
        </select>
      </label>
      <label>
        Season
        <select className="ml-2" value={season} onChange={handleSeasonChange}>
          {seasons.map((season) => (
            <option key={season} value={season}>
              {`${season}-${parseInt(season) + 1}`}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
