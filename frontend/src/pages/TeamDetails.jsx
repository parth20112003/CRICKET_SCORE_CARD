import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { teamAPI } from '../services/api';

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('players');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const data = await teamAPI.getTeamById(id);
        setTeam(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch team details. Please try again later.');
        setLoading(false);
      }
    };

    fetchTeam();
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

  if (!team) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Team not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Team Header */}
      <div className="bg-gray-100 p-6">
        <div className="flex items-center">
          {team.logo ? (
            <img 
              src={team.logo} 
              alt={team.name} 
              className="w-24 h-24 mr-6 object-contain"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full mr-6 flex items-center justify-center text-4xl font-bold">
              {team.shortName?.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{team.name}</h1>
            <p className="text-gray-600 text-lg">{team.shortName}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'players'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('players')}
          >
            Players
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'matches'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('matches')}
          >
            Matches
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'players' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Players</h2>
            
            {team.players && team.players.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.players.map((player) => (
                  <Link 
                    key={player._id} 
                    to={`/players/${player._id}`}
                    className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center">
                      {player.image ? (
                        <img 
                          src={player.image} 
                          alt={player.name} 
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center font-bold">
                          {player.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{player.name}</h3>
                        <p className="text-sm text-gray-600">{player.role}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No players found for this team.</p>
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Matches</h2>
            
            {team.matches && team.matches.length > 0 ? (
              <div className="space-y-4">
                {team.matches.map((match) => (
                  <Link 
                    key={match._id} 
                    to={`/matches/${match._id}`}
                    className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{match.teams[0].name} vs {match.teams[1].name}</p>
                        <p className="text-sm text-gray-600">{match.series}</p>
                        <p className="text-sm text-gray-600">{new Date(match.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          match.status === 'Live' ? 'bg-red-500 text-white' :
                          match.status === 'Completed' ? 'bg-green-500 text-white' :
                          'bg-blue-500 text-white'
                        }`}>
                          {match.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No matches found for this team.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;
