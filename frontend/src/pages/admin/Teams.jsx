import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teamAPI } from '../../services/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    logo: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newTeam = await teamAPI.createTeam(formData);
      
      // Update the teams list
      setTeams([...teams, newTeam]);
      
      // Reset form
      setFormData({
        name: '',
        shortName: '',
        logo: ''
      });
      
      // Hide form
      setShowForm(false);
    } catch (err) {
      setError('Failed to create team. Please try again.');
    }
  };

  const handleDeleteTeam = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await teamAPI.deleteTeam(id);
        setTeams(teams.filter(team => team._id !== id));
      } catch (err) {
        setError('Failed to delete team. Please try again.');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Teams</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Team'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Add Team Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Team</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Short Name
                </label>
                <input
                  type="text"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Logo URL (optional)
                </label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Create Team
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Teams List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : teams.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No teams found. Create your first team!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team._id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                
                <div className="mt-4 flex justify-between">
                  <p className="text-sm text-gray-600">
                    {team.players?.length || 0} Players
                  </p>
                  <div>
                    <Link 
                      to={`/teams/${team._id}`} 
                      className="text-primary hover:text-secondary mr-4"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDeleteTeam(team._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
