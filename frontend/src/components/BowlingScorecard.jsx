const BowlingScorecard = ({ bowlingPerformances }) => {
  // Calculate economy rate
  const calculateEconomy = (runs, overs) => {
    if (overs === 0) return 0;
    return (runs / overs).toFixed(2);
  };

  return (
    <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-cricinfoGray border-b border-gray-200">
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Bowler</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">O</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">M</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">R</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">W</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Econ</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">WD</th>
            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">NB</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bowlingPerformances.map((performance, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <div className="font-medium text-cricinfoText">
                    {performance.player?.name || 'Unknown Player'}
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-center text-gray-600">{performance.overs}</td>
              <td className="py-3 px-4 text-center text-gray-600">{performance.maidens}</td>
              <td className="py-3 px-4 text-center text-gray-600">{performance.runs}</td>
              <td className="py-3 px-4 text-center font-semibold text-cricinfoText">{performance.wickets}</td>
              <td className="py-3 px-4 text-center text-gray-600">
                {calculateEconomy(performance.runs, performance.overs)}
              </td>
              <td className="py-3 px-4 text-center text-gray-600">{performance.wides || 0}</td>
              <td className="py-3 px-4 text-center text-gray-600">{performance.noBalls || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BowlingScorecard;
