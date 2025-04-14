import { Link } from 'react-router-dom';

const MatchCard = ({ match }) => {
  // Helper function to format date
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time only
  const formatTime = (dateString) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Format day and date
  const formatDay = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  // Determine match status color and text
  const getStatusDetails = (status) => {
    switch (status) {
      case 'Live':
        return {
          bgColor: 'bg-live',
          textColor: 'text-white',
          label: 'LIVE'
        };
      case 'Completed':
        return {
          bgColor: 'bg-completed',
          textColor: 'text-white',
          label: 'RESULT'
        };
      default:
        return {
          bgColor: 'bg-upcoming',
          textColor: 'text-white',
          label: 'UPCOMING'
        };
    }
  };

  const statusDetails = getStatusDetails(match.status);

  // Get match type abbreviation
  const getMatchTypeAbbr = (type) => {
    switch (type) {
      case 'Test':
        return 'TEST';
      case 'ODI':
        return 'ODI';
      case 'T20':
        return 'T20I';
      case 'T10':
        return 'T10';
      default:
        return type;
    }
  };

  return (
    <Link to={`/matches/${match._id}`} className="block">
      <div className="match-card bg-white rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-300 border border-gray-100">
        {/* Match Header - Series and Match Type */}
        <div className="bg-cricinfoGray px-4 py-2 flex justify-between items-center border-b border-gray-200">
          <div className="text-xs font-medium text-gray-600 truncate">{match.series}</div>
          <div className="text-xs font-medium text-gray-600">{getMatchTypeAbbr(match.matchType)}</div>
        </div>

        {/* Match Status */}
        <div className={`${statusDetails.bgColor} ${statusDetails.textColor} text-xs font-semibold px-4 py-1.5`}>
          {statusDetails.label}
        </div>

        {/* Teams */}
        <div className="p-4">
          {/* Team 1 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {match.teams[0].logo ? (
                <img
                  src={match.teams[0].logo}
                  alt={match.teams[0].name}
                  className="w-10 h-10 mr-3 object-contain"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center font-bold text-gray-600">
                  {match.teams[0].shortName?.charAt(0)}
                </div>
              )}
              <span className="font-medium text-cricinfoText">{match.teams[0].name}</span>
            </div>
            {match.innings && match.innings[0] && (
              <div className="text-right">
                <span className="font-bold text-cricinfoText">{match.innings[0].totalRuns}/{match.innings[0].wickets}</span>
                <span className="text-sm text-gray-500 ml-1">
                  ({match.innings[0].overs})
                </span>
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {match.teams[1].logo ? (
                <img
                  src={match.teams[1].logo}
                  alt={match.teams[1].name}
                  className="w-10 h-10 mr-3 object-contain"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center font-bold text-gray-600">
                  {match.teams[1].shortName?.charAt(0)}
                </div>
              )}
              <span className="font-medium text-cricinfoText">{match.teams[1].name}</span>
            </div>
            {match.innings && match.innings[1] && (
              <div className="text-right">
                <span className="font-bold text-cricinfoText">{match.innings[1].totalRuns}/{match.innings[1].wickets}</span>
                <span className="text-sm text-gray-500 ml-1">
                  ({match.innings[1].overs})
                </span>
              </div>
            )}
          </div>

          {/* Match Result or Info */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            {match.status === 'Completed' && match.result ? (
              <div>
                <p className="text-sm font-medium text-cricinfoText">{match.result.description}</p>
                {match.playerOfTheMatch && (
                  <p className="text-xs text-gray-500 mt-1">Player of the Match: {match.playerOfTheMatch.name}</p>
                )}
              </div>
            ) : match.status === 'Live' ? (
              <div className="flex justify-between items-center">
                <p className="text-sm text-live font-medium">In Progress</p>
                <p className="text-xs text-gray-500">{match.venue}</p>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">{match.venue}</p>
                  <p className="text-xs font-medium text-gray-700">{formatDay(match.date)}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Match starts at {formatTime(match.date)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
