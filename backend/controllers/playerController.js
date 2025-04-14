import Player from '../models/Player.js';
import Team from '../models/Team.js';
import mockData from '../mockData.js';

// Flag to check if MongoDB is connected
let isMongoConnected = false;

// Set MongoDB connection status
export const setMongoConnectionStatus = (status) => {
  isMongoConnected = status;
};

// Get all players
export const getPlayers = async (req, res) => {
  try {
    if (isMongoConnected) {
      const players = await Player.find().populate('team', 'name shortName');
      res.status(200).json(players);
    } else {
      // Use mock data when MongoDB is not connected
      res.status(200).json(mockData.players);
    }
  } catch (error) {
    // Fallback to mock data on error
    console.error('Error fetching players:', error);
    res.status(200).json(mockData.players);
  }
};

// Get player by ID
export const getPlayerById = async (req, res) => {
  try {
    if (isMongoConnected) {
      const player = await Player.findById(req.params.id).populate('team', 'name shortName logo');

      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }

      res.status(200).json(player);
    } else {
      // Use mock data when MongoDB is not connected
      const player = mockData.players.find(p => p._id === req.params.id);

      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }

      // Get team for this player
      const team = mockData.teams.find(t => t._id === player.team);
      const playerWithTeam = {
        ...player,
        team: team || { _id: player.team, name: 'Unknown Team' }
      };

      res.status(200).json(playerWithTeam);
    }
  } catch (error) {
    // Fallback to mock data on error
    console.error('Error fetching player by ID:', error);
    const player = mockData.players.find(p => p._id === req.params.id);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Get team for this player
    const team = mockData.teams.find(t => t._id === player.team);
    const playerWithTeam = {
      ...player,
      team: team || { _id: player.team, name: 'Unknown Team' }
    };

    res.status(200).json(playerWithTeam);
  }
};

// Create a new player
export const createPlayer = async (req, res) => {
  const playerData = req.body;

  try {
    // Check if team exists
    const team = await Team.findById(playerData.team);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const newPlayer = new Player(playerData);
    const savedPlayer = await newPlayer.save();

    // Add player to team
    team.players.push(savedPlayer._id);
    await team.save();

    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update player
export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // If team is being changed, handle team references
    if (updateData.team) {
      const oldPlayer = await Player.findById(id);
      if (oldPlayer && oldPlayer.team.toString() !== updateData.team) {
        // Remove from old team
        await Team.findByIdAndUpdate(
          oldPlayer.team,
          { $pull: { players: id } }
        );

        // Add to new team
        await Team.findByIdAndUpdate(
          updateData.team,
          { $addToSet: { players: id } }
        );
      }
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete player
export const deletePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findById(id);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Remove player from team
    await Team.findByIdAndUpdate(
      player.team,
      { $pull: { players: id } }
    );

    // Delete player
    await Player.findByIdAndDelete(id);

    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update player stats
export const updatePlayerStats = async (req, res) => {
  const { id } = req.params;
  const statsData = req.body;

  try {
    const player = await Player.findById(id);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    player.stats = {
      ...player.stats,
      ...statsData
    };

    const updatedPlayer = await player.save();

    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
