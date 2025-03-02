import Image from "next/image";

export enum ProbabilityDataType {
  Relegation,
  Champion,
  Top4,
}
function getProbabilityTextNoType(data: number): string {
  if (data > 0.99) {
    return ">99%";
  } else if (data < 0.01) {
    return "<0.1%";
  } else {
    return `${(data * 100).toFixed(2)}%`;
  }
}

function getProbabilityText(
  data: number,
  dataType: ProbabilityDataType,
  isConfirmedTrue: boolean,
  isConfirmedFalse: boolean,
): string {
  if (isConfirmedTrue) {
    if (dataType === ProbabilityDataType.Champion) {
      return "🏆";
    }
    if (dataType === ProbabilityDataType.Top4) {
      return "✅";
    }
    if (dataType === ProbabilityDataType.Relegation) {
      return "🔻";
    }
    return "✓";
  } else if (isConfirmedFalse) {
    return "❌";
  }

  return getProbabilityTextNoType(data);
}

export function ProbabilityTableData({
  data,
  className = "text-center",
  dataType,
  isConfirmedTrue = false,
  isConfirmedFalse = false,
}: {
  data: number;
  className?: string;
  dataType: ProbabilityDataType;
  isConfirmedTrue: boolean;
  isConfirmedFalse: boolean;
}) {
  const tdText = getProbabilityText(
    data,
    dataType,
    isConfirmedTrue,
    isConfirmedFalse,
  );
  return <td className={className}>{tdText}</td>;
}

export function ProbabilitySpanData({
  data,
  className = "text-center",
}: {
  data: number;
  className?: string;
}) {
  const spanText = getProbabilityTextNoType(data);
  return <span className={className}>{spanText}</span>;
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

  // Trim whitespace
  strippedTeamName = strippedTeamName.trim();

  return (
    <div
      className={`flex items-center ${typeof points !== "undefined" ? "justify-between" : ""}`}
    >
      <Image
        src={crest}
        alt={`${team} crest`}
        width={32}
        height={32}
        className="mr-2 h-8 w-8"
      />
      <span
        className={`${typeof points !== "undefined" ? "mr-1 text-ellipsis sm:mr-2" : ""} ${additionalClasses}`}
        data-tip={dataTip}
      >
        {strippedTeamName}
      </span>
      {typeof points !== "undefined" && (
        <span className="justify-end text-nowrap text-xs font-thin">
          {points} pts.
        </span>
      )}
    </div>
  );
}

export function TeamNameAndCrest({
  team,
  crest,
}: {
  team: string;
  crest: string;
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

  // Trim whitespace
  strippedTeamName = strippedTeamName.trim();

  // Special logic for Spuds
  var additionalClasses = "";
  var dataTip = null;
  if (strippedTeamName.toLowerCase().includes("tottenham")) {
    strippedTeamName = "Spurs";
    additionalClasses += " tooltip";
    dataTip = "💩";
  } else {
    // additionalClasses += " overflow-x-hidden text-ellipsis";
  }

  return (
    <div className={"flex flex-auto flex-col items-center"}>
      <span className={`${additionalClasses}`} data-tip={dataTip}>
        {strippedTeamName}
      </span>
      <Image
        src={crest}
        alt={`${team} crest`}
        width={32}
        height={32}
        className="mt-2 h-8 w-8"
      />
    </div>
  );
}
