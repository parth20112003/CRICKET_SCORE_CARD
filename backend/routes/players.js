import express from 'express';
import {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  updatePlayerStats
} from '../controllers/playerController.js';

const router = express.Router();

// GET all players
router.get('/', getPlayers);

// GET player by ID
router.get('/:id', getPlayerById);

// POST create new player
router.post('/', createPlayer);

// PUT update player
router.put('/:id', updatePlayer);

// DELETE player
router.delete('/:id', deletePlayer);

// PATCH update player stats
router.patch('/:id/stats', updatePlayerStats);

export default router;
