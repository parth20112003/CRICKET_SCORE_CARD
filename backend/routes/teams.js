import express from 'express';
import {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  addPlayerToTeam,
  removePlayerFromTeam
} from '../controllers/teamController.js';

const router = express.Router();

// GET all teams
router.get('/', getTeams);

// GET team by ID
router.get('/:id', getTeamById);

// POST create new team
router.post('/', createTeam);

// PUT update team
router.put('/:id', updateTeam);

// DELETE team
router.delete('/:id', deleteTeam);

// POST add player to team
router.post('/:id/players', addPlayerToTeam);

// DELETE remove player from team
router.delete('/:id/players/:playerId', removePlayerFromTeam);

export default router;
