export default function TableControls({
  season,
  seasons,
  setSeason,
}: {
  season: string;
  seasons: string[];
  setSeason: (season: string) => void;
}) {
  const handleSeasonChange = (event: any) => {
    setSeason(event.target.value);
  };

  // Dropdown to toggle between seasons
  return (
    <div className="flex flex-col items-center justify-evenly gap-y-2 sm:flex-row">
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
