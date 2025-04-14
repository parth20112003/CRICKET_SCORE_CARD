import Team from '../models/Team.js';
import mockData from '../mockData.js';

// Flag to check if MongoDB is connected
let isMongoConnected = false;

// Set MongoDB connection status
export const setMongoConnectionStatus = (status) => {
  isMongoConnected = status;
};

// Get all teams
export const getTeams = async (req, res) => {
  try {
    if (isMongoConnected) {
      const teams = await Team.find().populate('players', 'name role');
      res.status(200).json(teams);
    } else {
      // Use mock data when MongoDB is not connected
      res.status(200).json(mockData.teams);
    }
  } catch (error) {
    // Fallback to mock data on error
    console.error('Error fetching teams:', error);
    res.status(200).json(mockData.teams);
  }
};

// Get team by ID
export const getTeamById = async (req, res) => {
  try {
    if (isMongoConnected) {
      const team = await Team.findById(req.params.id)
        .populate('players')
        .populate('matches');

      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }

      res.status(200).json(team);
    } else {
      // Use mock data when MongoDB is not connected
      const team = mockData.teams.find(t => t._id === req.params.id);

      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }

      // Get players for this team
      const players = mockData.players.filter(p => p.team === team._id);
      const teamWithPlayers = { ...team, players };

      res.status(200).json(teamWithPlayers);
    }
  } catch (error) {
    // Fallback to mock data on error
    console.error('Error fetching team by ID:', error);
    const team = mockData.teams.find(t => t._id === req.params.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Get players for this team
    const players = mockData.players.filter(p => p.team === team._id);
    const teamWithPlayers = { ...team, players };

    res.status(200).json(teamWithPlayers);
  }
};

// Create a new team
export const createTeam = async (req, res) => {
  const teamData = req.body;

  try {
    const newTeam = new Team(teamData);
    const savedTeam = await newTeam.save();

    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update team
export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete team
export const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add player to team
export const addPlayerToTeam = async (req, res) => {
  const { id } = req.params;
  const { playerId } = req.body;

  try {
    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (team.players.includes(playerId)) {
      return res.status(400).json({ message: 'Player already in team' });
    }

    team.players.push(playerId);
    const updatedTeam = await team.save();

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove player from team
export const removePlayerFromTeam = async (req, res) => {
  const { id, playerId } = req.params;

  try {
    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (!team.players.includes(playerId)) {
      return res.status(400).json({ message: 'Player not in team' });
    }

    team.players = team.players.filter(player => player.toString() !== playerId);
    const updatedTeam = await team.save();

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
