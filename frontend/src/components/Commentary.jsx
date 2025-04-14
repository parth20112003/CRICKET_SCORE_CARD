const Commentary = ({ commentary }) => {
  // Sort commentary by timestamp in descending order (newest first)
  const sortedCommentary = [...commentary].sort((a, b) =>
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get ball type indicator
  const getBallTypeIndicator = (text) => {
    if (text.includes('FOUR') || text.includes('4 runs')) {
      return (
        <span className="inline-block w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center mr-2">4</span>
      );
    } else if (text.includes('SIX') || text.includes('6 runs')) {
      return (
        <span className="inline-block w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center mr-2">6</span>
      );
    } else if (text.includes('WICKET') || text.toLowerCase().includes('out')) {
      return (
        <span className="inline-block w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center mr-2">W</span>
      );
    } else if (text.includes('WIDE') || text.toLowerCase().includes('wide')) {
      return (
        <span className="inline-block w-6 h-6 rounded-full bg-gray-500 text-white text-xs font-bold flex items-center justify-center mr-2">WD</span>
      );
    } else if (text.includes('NO BALL') || text.toLowerCase().includes('no ball')) {
      return (
        <span className="inline-block w-6 h-6 rounded-full bg-yellow-500 text-white text-xs font-bold flex items-center justify-center mr-2">NB</span>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-cricinfoGray px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-cricinfoText">Commentary</h2>
      </div>

      <div className="divide-y divide-gray-100">
        {sortedCommentary.length > 0 ? (
          sortedCommentary.map((comment, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-cricinfo">
                  Over {comment.over}.{comment.ball}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTime(comment.timestamp)}
                </span>
              </div>
              <div className="flex items-start">
                {getBallTypeIndicator(comment.text)}
                <p className="text-gray-700 text-sm leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500 italic">No commentary available for this match.</p>
          </div>
        )}
      </div>

      {sortedCommentary.length > 10 && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-center">
          <button className="text-cricinfo font-medium text-sm hover:underline">
            Load more commentary
          </button>
        </div>
      )}
    </div>
  );
};

export default Commentary;
