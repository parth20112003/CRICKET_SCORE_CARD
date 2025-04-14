import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { matchAPI } from '../services/api';
import BattingScorecard from '../components/BattingScorecard';
import BowlingScorecard from '../components/BowlingScorecard';
import Commentary from '../components/Commentary';

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('scorecard');
  const [activeInnings, setActiveInnings] = useState(0);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setLoading(true);
        const data = await matchAPI.getMatchById(id);
        setMatch(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch match details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time only
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const options = {
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Get status details
  const getStatusDetails = (status) => {
    switch (status) {
      case 'Live':
        return {
          bgColor: 'bg-live',
          textColor: 'text-white',
          label: 'LIVE',
          icon: (
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
          )
        };
      case 'Completed':
        return {
          bgColor: 'bg-completed',
          textColor: 'text-white',
          label: 'COMPLETED',
          icon: null
        };
      default:
        return {
          bgColor: 'bg-upcoming',
          textColor: 'text-white',
          label: 'UPCOMING',
          icon: null
        };
    }
  };

  const statusDetails = match ? getStatusDetails(match.status) : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cricinfo"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!match) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Match not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-cricinfoGray px-6 py-4 border-b border-gray-200">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-cricinfoText">{match.series}</h1>
              <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-200 rounded">{match.matchType}</span>
            </div>
            <div className={`${statusDetails.bgColor} ${statusDetails.textColor} text-xs font-semibold px-3 py-1 rounded-full flex items-center`}>
              {statusDetails.icon}
              {statusDetails.label}
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            <p>{match.venue} • {formatDate(match.date)}</p>
          </div>
        </div>

        {/* Match Summary */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            {/* Team 1 */}
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 w-full md:w-2/5">
              <div className="flex items-center">
                {match.teams[0].logo ? (
                  <img
                    src={match.teams[0].logo}
                    alt={match.teams[0].name}
                    className="w-16 h-16 mr-4 object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center font-bold text-2xl text-gray-600">
                    {match.teams[0].shortName?.charAt(0)}
                  </div>
                )}
                <div>
                  <span className="text-xl font-bold text-cricinfoText">{match.teams[0].name}</span>
                  {match.innings && match.innings[0] && (
                    <div className="mt-1">
                      <span className="font-bold text-xl text-cricinfoText">{match.innings[0].totalRuns}/{match.innings[0].wickets}</span>
                      <span className="text-gray-600 ml-2 text-sm">
                        ({match.innings[0].overs} ov)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* VS */}
            <div className="text-gray-400 text-lg font-bold mb-4 md:mb-0 md:w-1/5 text-center">
              {match.status === 'Live' ? (
                <div className="bg-live text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                  LIVE
                </div>
              ) : (
                <span>VS</span>
              )}
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center md:items-end w-full md:w-2/5">
              <div className="flex items-center">
                <div className="text-right mr-4">
                  <span className="text-xl font-bold text-cricinfoText">{match.teams[1].name}</span>
                  {match.innings && match.innings[1] && (
                    <div className="mt-1">
                      <span className="font-bold text-xl text-cricinfoText">{match.innings[1].totalRuns}/{match.innings[1].wickets}</span>
                      <span className="text-gray-600 ml-2 text-sm">
                        ({match.innings[1].overs} ov)
                      </span>
                    </div>
                  )}
                </div>
                {match.teams[1].logo ? (
                  <img
                    src={match.teams[1].logo}
                    alt={match.teams[1].name}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center font-bold text-2xl text-gray-600">
                    {match.teams[1].shortName?.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Match Result */}
          {match.status === 'Completed' && match.result && (
            <div className="mt-6 p-4 bg-cricinfoGray rounded-lg">
              <p className="text-lg font-semibold text-cricinfoText text-center">{match.result.description}</p>
              {match.playerOfTheMatch && (
                <div className="mt-3 flex items-center justify-center">
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-2 shadow-sm">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Player of the Match:</span> {match.playerOfTheMatch.name}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Toss */}
          {match.toss && match.toss.winner && (
            <div className="mt-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <p>
                  <span className="font-medium">{match.toss.winner.name}</span> won the toss and elected to <span className="font-medium">{match.toss.decision.toLowerCase()}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'scorecard'
                  ? 'border-b-2 border-cricinfo text-cricinfo'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('scorecard')}
            >
              Scorecard
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'commentary'
                  ? 'border-b-2 border-cricinfo text-cricinfo'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('commentary')}
            >
              Commentary
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'scorecard' && (
            <div>
              {/* Innings Tabs */}
              {match.innings && match.innings.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap border-b border-gray-200">
                    {match.innings.map((innings, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 text-sm font-medium ${
                          activeInnings === index
                            ? 'border-b-2 border-cricinfo text-cricinfo'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveInnings(index)}
                      >
                        {match.teams[index % 2].name} Innings
                        {match.innings.length > 2 && ` (${Math.floor(index / 2) + 1})`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Batting Scorecard */}
              {match.innings && match.innings[activeInnings] && (
                <div>
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-bold text-cricinfoText">Batting</h3>
                    <div className="ml-auto text-sm text-gray-500">
                      {match.innings[activeInnings].team?.name} • {match.innings[activeInnings].totalRuns}/{match.innings[activeInnings].wickets} ({match.innings[activeInnings].overs} ov)
                    </div>
                  </div>
                  <BattingScorecard
                    battingPerformances={match.innings[activeInnings].battingPerformances || []}
                    extras={match.innings[activeInnings].extras}
                  />

                  {/* Bowling Scorecard */}
                  <h3 className="text-lg font-bold text-cricinfoText mt-8 mb-4">Bowling</h3>
                  <BowlingScorecard
                    bowlingPerformances={match.innings[activeInnings].bowlingPerformances || []}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'commentary' && (
            <Commentary commentary={match.commentary || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
