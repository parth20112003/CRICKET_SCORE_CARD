const BattingScorecard = ({ battingPerformances, extras = { wides: 0, noBalls: 0, byes: 0, legByes: 0, penalty: 0 } }) => {
  // Calculate strike rate
  const calculateStrikeRate = (runs, balls) => {
    if (balls === 0) return 0;
    return ((runs / balls) * 100).toFixed(2);
  };

  // Calculate total extras
  const totalExtras = extras.wides + extras.noBalls + extras.byes + extras.legByes + extras.penalty;

  // Calculate total runs
  const totalRuns = battingPerformances.reduce((total, player) => total + player.runs, 0) + totalExtras;

  // Calculate total wickets
  const totalWickets = battingPerformances.filter(player =>
    player.dismissalType !== 'Not Out' &&
    player.dismissalType !== 'Did Not Bat'
  ).length;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-cricinfoGray border-b border-gray-200">
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Batter</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dismissal</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">R</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">B</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">4s</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">6s</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">SR</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {battingPerformances.map((performance, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <div className="font-medium text-cricinfoText">
                    {performance.player?.name || 'Unknown Player'}
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-sm">
                {performance.dismissalType === 'Not Out' ? (
                  <span className="text-green-600 font-medium">not out</span>
                ) : performance.dismissalType === 'Did Not Bat' ? (
                  <span className="text-gray-500">did not bat</span>
                ) : (
                  <span className="text-gray-600">
                    {performance.dismissalType.toLowerCase()}
                    {performance.dismissedBy?.bowler && ` b `}
                    {performance.dismissedBy?.bowler && (
                      <span className="font-medium">{performance.dismissedBy.bowler.name}</span>
                    )}
                    {performance.dismissedBy?.fielder && ` c `}
                    {performance.dismissedBy?.fielder && (
                      <span className="font-medium">{performance.dismissedBy.fielder.name}</span>
                    )}
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-center font-semibold text-cricinfoText">
                {performance.runs}
              </td>
              <td className="py-3 px-4 text-center text-gray-600">
                {performance.balls}
              </td>
              <td className="py-3 px-4 text-center text-gray-600">
                {performance.fours}
              </td>
              <td className="py-3 px-4 text-center text-gray-600">
                {performance.sixes}
              </td>
              <td className="py-3 px-4 text-center text-gray-600">
                {calculateStrikeRate(performance.runs, performance.balls)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50 border-t border-gray-200">
            <td colSpan="2" className="py-3 px-4 text-sm font-medium text-gray-700">Extras</td>
            <td colSpan="5" className="py-3 px-4 text-sm text-gray-600">
              <span>
                {totalExtras} (w {extras.wides}, nb {extras.noBalls}, b {extras.byes}, lb {extras.legByes}{extras.penalty > 0 ? `, p ${extras.penalty}` : ''})
              </span>
            </td>
          </tr>
          <tr className="bg-cricinfoGray border-t border-gray-200">
            <td colSpan="2" className="py-3 px-4 font-bold text-cricinfoText">TOTAL</td>
            <td colSpan="5" className="py-3 px-4 font-bold text-cricinfoText">
              {totalRuns}/{totalWickets}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default BattingScorecard;
