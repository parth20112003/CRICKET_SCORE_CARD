import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Match API
export const matchAPI = {
  // Get all matches
  getMatches: async () => {
    try {
      const response = await api.get('/matches');
      return response.data;
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  },

  // Get match by ID
  getMatchById: async (id) => {
    try {
      const response = await api.get(`/matches/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching match ${id}:`, error);
      throw error;
    }
  },

  // Create new match
  createMatch: async (matchData) => {
    try {
      const response = await api.post('/matches', matchData);
      return response.data;
    } catch (error) {
      console.error('Error creating match:', error);
      throw error;
    }
  },

  // Update match
  updateMatch: async (id, matchData) => {
    try {
      const response = await api.put(`/matches/${id}`, matchData);
      return response.data;
    } catch (error) {
      console.error(`Error updating match ${id}:`, error);
      throw error;
    }
  },

  // Delete match
  deleteMatch: async (id) => {
    try {
      const response = await api.delete(`/matches/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting match ${id}:`, error);
      throw error;
    }
  },

  // Update match status
  updateMatchStatus: async (id, status) => {
    try {
      const response = await api.patch(`/matches/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating match ${id} status:`, error);
      throw error;
    }
  },

  // Add commentary
  addCommentary: async (id, commentaryData) => {
    try {
      const response = await api.post(`/matches/${id}/commentary`, commentaryData);
      return response.data;
    } catch (error) {
      console.error(`Error adding commentary to match ${id}:`, error);
      throw error;
    }
  },

  // Update innings
  updateInnings: async (id, inningsIndex, inningsData) => {
    try {
      const response = await api.patch(`/matches/${id}/innings/${inningsIndex}`, inningsData);
      return response.data;
    } catch (error) {
      console.error(`Error updating innings for match ${id}:`, error);
      throw error;
    }
  },
};

// Team API
export const teamAPI = {
  // Get all teams
  getTeams: async () => {
    try {
      const response = await api.get('/teams');
      return response.data;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  },

  // Get team by ID
  getTeamById: async (id) => {
    try {
      const response = await api.get(`/teams/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching team ${id}:`, error);
      throw error;
    }
  },

  // Create new team
  createTeam: async (teamData) => {
    try {
      const response = await api.post('/teams', teamData);
      return response.data;
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  },

  // Update team
  updateTeam: async (id, teamData) => {
    try {
      const response = await api.put(`/teams/${id}`, teamData);
      return response.data;
    } catch (error) {
      console.error(`Error updating team ${id}:`, error);
      throw error;
    }
  },

  // Delete team
  deleteTeam: async (id) => {
    try {
      const response = await api.delete(`/teams/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting team ${id}:`, error);
      throw error;
    }
  },

  // Add player to team
  addPlayerToTeam: async (id, playerId) => {
    try {
      const response = await api.post(`/teams/${id}/players`, { playerId });
      return response.data;
    } catch (error) {
      console.error(`Error adding player to team ${id}:`, error);
      throw error;
    }
  },

  // Remove player from team
  removePlayerFromTeam: async (id, playerId) => {
    try {
      const response = await api.delete(`/teams/${id}/players/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error removing player from team ${id}:`, error);
      throw error;
    }
  },
};

// Player API
export const playerAPI = {
  // Get all players
  getPlayers: async () => {
    try {
      const response = await api.get('/players');
      return response.data;
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  },

  // Get player by ID
  getPlayerById: async (id) => {
    try {
      const response = await api.get(`/players/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching player ${id}:`, error);
      throw error;
    }
  },

  // Create new player
  createPlayer: async (playerData) => {
    try {
      const response = await api.post('/players', playerData);
      return response.data;
    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  },

  // Update player
  updatePlayer: async (id, playerData) => {
    try {
      const response = await api.put(`/players/${id}`, playerData);
      return response.data;
    } catch (error) {
      console.error(`Error updating player ${id}:`, error);
      throw error;
    }
  },

  // Delete player
  deletePlayer: async (id) => {
    try {
      const response = await api.delete(`/players/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting player ${id}:`, error);
      throw error;
    }
  },

  // Update player stats
  updatePlayerStats: async (id, statsData) => {
    try {
      const response = await api.patch(`/players/${id}/stats`, statsData);
      return response.data;
    } catch (error) {
      console.error(`Error updating stats for player ${id}:`, error);
      throw error;
    }
  },
};

export default {
  matchAPI,
  teamAPI,
  playerAPI,
};
