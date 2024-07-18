function ProbabilityTableData(data: number) {
  return <td>{data < 0.01 ? "<0.1%" : `${(data * 100).toFixed(0)}%`}</td>;
}

export default function FootballTable({
  avgFinishData,
  positionData,
}: {
  avgFinishData: any[];
  positionData: any;
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Team</th>
          <th>Avg. Place</th>
          <th>Finish Bottom 3</th>
          <th>Finish Top 4</th>
          <th>Win Premier League</th>
        </tr>
      </thead>
      <tbody>
        {avgFinishData.map((row, i) => (
          <tr key={i} className="hover">
            <th>{i + 1}</th>
            <td>{row.team}</td>
            <td>{row.place}</td>
            {ProbabilityTableData(row.bottom_3)}
            {ProbabilityTableData(row.top_4)}
            {ProbabilityTableData(row.win_premier_league)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
