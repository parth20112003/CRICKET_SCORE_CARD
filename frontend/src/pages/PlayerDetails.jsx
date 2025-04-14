import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { playerAPI } from '../services/api';

const PlayerDetails = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true);
        const data = await playerAPI.getPlayerById(id);
        setPlayer(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch player details. Please try again later.');
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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

  if (!player) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Player not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Player Header */}
      <div className="bg-gray-100 p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {player.image ? (
            <img 
              src={player.image} 
              alt={player.name} 
              className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold mb-4 md:mb-0 md:mr-6">
              {player.name?.charAt(0)}
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{player.name}</h1>
            <Link 
              to={`/teams/${player.team._id}`}
              className="text-primary hover:underline"
            >
              {player.team.name}
            </Link>
            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {player.role}
              </span>
              {player.battingStyle && (
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {player.battingStyle}
                </span>
              )}
              {player.bowlingStyle && (
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {player.bowlingStyle}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Player Stats */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Career Statistics</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">Matches</p>
            <p className="text-2xl font-bold">{player.stats.matches}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">Runs</p>
            <p className="text-2xl font-bold">{player.stats.runs}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">Highest Score</p>
            <p className="text-2xl font-bold">{player.stats.highestScore}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">Wickets</p>
            <p className="text-2xl font-bold">{player.stats.wickets}</p>
          </div>
          
          {player.stats.bestBowling && (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Best Bowling</p>
              <p className="text-2xl font-bold">{player.stats.bestBowling}</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Performances */}
      <div className="p-6 border-t border-gray-200">
        <h2 className="text-xl font-bold mb-4">Recent Performances</h2>
        
        <p className="text-gray-500 italic">No recent performances available.</p>
      </div>
    </div>
  );
};

export default PlayerDetails;
