"use client";
import { ProbabilityTableData, TeamEntry } from "../DataComponents";

export default function Match({
  match,
  teamToCrest,
}: {
  match: any;
  teamToCrest: any;
}) {
  return (
    <div className="m-4 flex w-auto flex-col gap-2 rounded-3xl bg-base-200 py-4 sm:mx-auto">
      <div className="overflow-x-auto">
        <table className="table mx-auto w-auto sm:table-md md:table-lg">
          <tbody>
            <tr>
              <td>
                <TeamEntry team={match.home} crest={teamToCrest[match.home]} />
              </td>
              <td className="text-center">Draw</td>
              <td>
                <TeamEntry team={match.away} crest={teamToCrest[match.away]} />
              </td>
            </tr>
            <tr>
              <ProbabilityTableData
                data={match.home_win_probability}
                className="text-end"
              />
              <ProbabilityTableData data={match.draw_probability} />
              <ProbabilityTableData
                data={match.away_win_probability}
                className="text-start"
              />
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-center">
        {new Date(match.utc_date + "Z").toLocaleString(undefined, {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
    </div>
  );
}
