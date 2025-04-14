import express from 'express';
import {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
  updateMatchStatus,
  addCommentary,
  updateInnings
} from '../controllers/matchController.js';

const router = express.Router();

// GET all matches
router.get('/', getMatches);

// GET match by ID
router.get('/:id', getMatchById);

// POST create new match
router.post('/', createMatch);

// PUT update match
router.put('/:id', updateMatch);

// DELETE match
router.delete('/:id', deleteMatch);

// PATCH update match status
router.patch('/:id/status', updateMatchStatus);

// POST add commentary
router.post('/:id/commentary', addCommentary);

// PATCH update innings
router.patch('/:id/innings/:inningsIndex', updateInnings);

export default router;
