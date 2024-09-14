import { ProbabilitySpanData, TeamNameAndCrest } from "../DataComponents";
import { DateComponent } from "./DateComponent";

export default function Match({
  match,
  teamToCrest,
}: {
  match: any;
  teamToCrest: any;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-col justify-between space-y-4 rounded-lg bg-base-200 p-2 shadow-md sm:max-w-[350px] sm:p-4">
      {/* Top row with team names and crests */}
      <div className="grid grid-cols-3 items-end">
        <div className="text-center text-sm font-semibold sm:text-base">
          <TeamNameAndCrest team={match.home} crest={teamToCrest[match.home]} />
        </div>
        <div className="text-center text-sm font-semibold sm:text-base">
          <p>Draw</p>
        </div>
        <div className="text-center text-sm font-semibold sm:text-base">
          <TeamNameAndCrest team={match.away} crest={teamToCrest[match.away]} />
        </div>
      </div>
      {/* Probability row */}
      <div className="grid grid-cols-3 items-center">
        <div className="text-center text-sm sm:text-base">
          <ProbabilitySpanData data={match.home_win_probability} />
        </div>
        <div className="text-center text-sm sm:text-base">
          <ProbabilitySpanData data={match.draw_probability} />
        </div>
        <div className="text-center text-sm sm:text-base">
          <ProbabilitySpanData data={match.away_win_probability} />
        </div>
      </div>

      {/* Match date row */}
      <div className="text-center text-sm sm:text-base">
        <DateComponent date={match.utc_date} />
      </div>
    </div>
  );
}
