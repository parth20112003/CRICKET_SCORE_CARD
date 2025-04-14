import { useState, useEffect } from 'react';
import { matchAPI } from '../services/api';
import MatchCard from '../components/MatchCard';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('live');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const data = await matchAPI.getMatches();
        setMatches(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch matches. Please try again later.');
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Filter matches based on active tab
  const filteredMatches = matches.filter(match => {
    if (activeTab === 'live') return match.status === 'Live';
    if (activeTab === 'upcoming') return match.status === 'Upcoming';
    if (activeTab === 'completed') return match.status === 'Completed';
    return true; // 'all' tab
  });

  // Get count of matches by status
  const matchCounts = {
    live: matches.filter(match => match.status === 'Live').length,
    upcoming: matches.filter(match => match.status === 'Upcoming').length,
    completed: matches.filter(match => match.status === 'Completed').length,
    all: matches.length
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-cricinfo to-blue-600 text-white rounded-lg shadow-md mb-8 overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Cricket Scorecard</h1>
          <p className="text-blue-100 mb-4">Live scores, match details, and statistics</p>

          {/* Featured Match - Show only if there's a live match */}
          {matches.some(match => match.status === 'Live') && (
            <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">FEATURED MATCH</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="font-medium">
                    {matches.find(match => match.status === 'Live')?.teams[0].name} vs {matches.find(match => match.status === 'Live')?.teams[1].name}
                  </span>
                </div>
                <button className="text-xs bg-white text-cricinfo font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 ${activeTab === 'live' ? 'border-live text-live' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('live')}
            >
              <span className="mr-2">Live Matches</span>
              {matchCounts.live > 0 && (
                <span className="bg-live text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {matchCounts.live}
                </span>
              )}
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 ${activeTab === 'upcoming' ? 'border-upcoming text-upcoming' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <span className="mr-2">Upcoming</span>
              {matchCounts.upcoming > 0 && (
                <span className="bg-upcoming text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {matchCounts.upcoming}
                </span>
              )}
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 ${activeTab === 'completed' ? 'border-completed text-completed' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('completed')}
            >
              <span className="mr-2">Completed</span>
              {matchCounts.completed > 0 && (
                <span className="bg-completed text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {matchCounts.completed}
                </span>
              )}
            </button>
          </li>
          <li>
            <button
              className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 ${activeTab === 'all' ? 'border-cricinfo text-cricinfo' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('all')}
            >
              <span className="mr-2">All Matches</span>
              {matchCounts.all > 0 && (
                <span className="bg-cricinfo text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {matchCounts.all}
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* Match Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cricinfo"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-gray-500 text-lg">No {activeTab !== 'all' ? activeTab : ''} matches found.</p>
          <p className="text-gray-400 text-sm mt-2">Check back later for updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <MatchCard key={match._id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
