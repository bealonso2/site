export default function TableControls({
  date,
  dates,
  season,
  seasons,
  setDateAndUUID,
  setSeasonAndDates,
}: {
  date: string;
  dates: string[];
  season: string;
  seasons: string[];
  setDateAndUUID: (date: string) => void;
  setSeasonAndDates: (season: string) => void;
}) {
  const handleDateChange = (event: any) => {
    setDateAndUUID(event.target.value);
  };

  const handleSeasonChange = (event: any) => {
    setSeasonAndDates(event.target.value);
  };

  // Dropdown to toggle between seasons
  return (
    <div className="flex justify-evenly">
      <label className="mr-2">
        Forecast from
        <select className="ml-2" value={date} onChange={handleDateChange}>
          {dates.map((date, i) => {
            return (
              <option key={i} value={date}>
                {new Date(date).toLocaleDateString() ===
                new Date().toLocaleDateString()
                  ? "Today"
                  : new Date(date).toLocaleDateString()}
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
