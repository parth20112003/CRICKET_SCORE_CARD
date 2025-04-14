import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teamAPI } from '../services/api';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await teamAPI.getTeams();
        setTeams(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch teams. Please try again later.');
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

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

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Teams</h1>

      {teams.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No teams found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Link 
              key={team._id} 
              to={`/teams/${team._id}`}
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {team.logo ? (
                    <img 
                      src={team.logo} 
                      alt={team.name} 
                      className="w-16 h-16 mr-4 object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center text-2xl font-bold">
                      {team.shortName?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold">{team.name}</h2>
                    <p className="text-gray-600">{team.shortName}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    {team.players?.length || 0} Players
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamList;
