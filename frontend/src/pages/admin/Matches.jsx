import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { matchAPI, teamAPI } from '../../services/api';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    teams: ['', ''],
    venue: '',
    date: '',
    matchType: 'T20',
    series: '',
    status: 'Upcoming'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [matchesData, teamsData] = await Promise.all([
          matchAPI.getMatches(),
          teamAPI.getTeams()
        ]);
        setMatches(matchesData);
        setTeams(teamsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('team')) {
      const index = parseInt(name.replace('team', ''), 10) - 1;
      const newTeams = [...formData.teams];
      newTeams[index] = value;
      
      setFormData({
        ...formData,
        teams: newTeams
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Format the data for API
      const matchData = {
        teams: formData.teams,
        venue: formData.venue,
        date: new Date(formData.date).toISOString(),
        matchType: formData.matchType,
        series: formData.series,
        status: formData.status,
        innings: [
          {
            team: formData.teams[0],
            totalRuns: 0,
            wickets: 0,
            overs: 0,
            extras: {
              wides: 0,
              noBalls: 0,
              byes: 0,
              legByes: 0,
              penalty: 0,
              total: 0
            },
            battingPerformances: [],
            bowlingPerformances: []
          },
          {
            team: formData.teams[1],
            totalRuns: 0,
            wickets: 0,
            overs: 0,
            extras: {
              wides: 0,
              noBalls: 0,
              byes: 0,
              legByes: 0,
              penalty: 0,
              total: 0
            },
            battingPerformances: [],
            bowlingPerformances: []
          }
        ]
      };
      
      const newMatch = await matchAPI.createMatch(matchData);
      
      // Update the matches list
      setMatches([newMatch, ...matches]);
      
      // Reset form
      setFormData({
        teams: ['', ''],
        venue: '',
        date: '',
        matchType: 'T20',
        series: '',
        status: 'Upcoming'
      });
      
      // Hide form
      setShowForm(false);
    } catch (err) {
      setError('Failed to create match. Please try again.');
    }
  };

  const handleDeleteMatch = async (id) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        await matchAPI.deleteMatch(id);
        setMatches(matches.filter(match => match._id !== id));
      } catch (err) {
        setError('Failed to delete match. Please try again.');
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Matches</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Match'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Add Match Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Match</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Team 1
                </label>
                <select
                  name="team1"
                  value={formData.teams[0]}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Team 1</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Team 2
                </label>
                <select
                  name="team2"
                  value={formData.teams[1]}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Team 2</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Match Type
                </label>
                <select
                  name="matchType"
                  value={formData.matchType}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Test">Test</option>
                  <option value="ODI">ODI</option>
                  <option value="T20">T20</option>
                  <option value="T10">T10</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Series
                </label>
                <input
                  type="text"
                  name="series"
                  value={formData.series}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Live">Live</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Create Match
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Matches List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : matches.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No matches found. Create your first match!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matches.map((match) => (
                <tr key={match._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {match.teams[0]?.name || 'Team 1'} vs {match.teams[1]?.name || 'Team 2'}
                    </div>
                    <div className="text-sm text-gray-500">{match.series}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{match.venue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(match.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      match.status === 'Live' ? 'bg-red-100 text-red-800' :
                      match.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {match.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/matches/${match._id}`} 
                      className="text-primary hover:text-secondary mr-4"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDeleteMatch(match._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Matches;
