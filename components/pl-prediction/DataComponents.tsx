import Image from "next/image";

export function ProbabilityTableData({
  data,
  className = "text-center",
}: {
  data: number;
  className?: string;
}) {
  var tdText = "";

  if (data === 1) {
    // Return a checkbox if the data is 1
    tdText = "✓";

    // TODO: add a dash if place is confirmed as impossible
    // } else if (data === 0) {
    //   tdText = "–";
  } else if (data < 0.01) {
    tdText = "<0.1%";
  } else {
    tdText = `${(data * 100).toFixed(2)}%`;
  }
  return <td className={className}>{tdText}</td>;
}

export function TeamEntry({
  team,
  crest,
  points,
}: {
  team: string;
  crest: string;
  points?: number;
}) {
  // Lol this is a mess but it works!
  // TODO: Create this mapping in the database
  var strippedTeamName = team.replace(/ FC$/, "");
  strippedTeamName = strippedTeamName.replace("Manchester", "Man.");
  strippedTeamName = strippedTeamName.includes("Man")
    ? strippedTeamName.replace("United", "Utd")
    : strippedTeamName.replace("United", "");
  strippedTeamName = strippedTeamName.replace("Nottingham", "Nott'm");
  strippedTeamName = strippedTeamName.replace("AFC", "");
  strippedTeamName = strippedTeamName.replace("& Hove Albion", "");
  strippedTeamName = strippedTeamName.replace(
    "Wolverhampton Wanderers",
    "Wolves",
  );

  // Special logic for Spuds
  var additionalClasses = "";
  var dataTip = null;
  if (strippedTeamName.toLowerCase().includes("tottenham")) {
    strippedTeamName = "Spurs";
    additionalClasses += " tooltip";
    dataTip = "💩";
  } else {
    additionalClasses += " overflow-x-hidden";
  }

  return (
    <div className={`flex items-center ${points ? "justify-between" : ""}`}>
      <Image
        src={crest}
        alt={`${team} crest`}
        width={32}
        height={32}
        className="mr-2 h-8 w-8"
      />
      <span
        className={`${points ? "mr-1 text-ellipsis sm:mr-2" : ""} ${additionalClasses}`}
        data-tip={dataTip}
      >
        {strippedTeamName}
      </span>
      {points && (
        <span className="justify-end text-nowrap text-xs font-thin">
          {points} pts.
        </span>
      )}
    </div>
  );
}
