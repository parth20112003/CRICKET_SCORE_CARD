import Match from '../models/Match.js';
import mockData from '../mockData.js';

// Flag to check if MongoDB is connected
let isMongoConnected = false;

// Set MongoDB connection status
export const setMongoConnectionStatus = (status) => {
  isMongoConnected = status;
};

// Get all matches
export const getMatches = async (req, res) => {
  try {
    if (isMongoConnected) {
      const matches = await Match.find()
        .populate('teams', 'name shortName logo')
        .populate('result.winner', 'name shortName')
        .populate('toss.winner', 'name shortName')
        .populate('playerOfTheMatch', 'name')
        .sort({ date: -1 });

      res.status(200).json(matches);
    } else {
      // Use mock data when MongoDB is not connected
      res.status(200).json(mockData.matches);
    }
  } catch (error) {
    // Fallback to mock data on error
    console.error('Error fetching matches:', error);
    res.status(200).json(mockData.matches);
  }
};

// Get match by ID
export const getMatchById = async (req, res) => {
  try {
    if (isMongoConnected) {
      const match = await Match.findById(req.params.id)
        .populate('teams', 'name shortName logo')
        .populate('result.winner', 'name shortName')
        .populate('toss.winner', 'name shortName')
        .populate('playerOfTheMatch', 'name')
        .populate({
          path: 'innings.battingPerformances.player',
          select: 'name'
        })
        .populate({
          path: 'innings.bowlingPerformances.player',
          select: 'name'
        })
        .populate({
          path: 'innings.battingPerformances.dismissedBy.bowler',
          select: 'name'
        })
        .populate({
          path: 'innings.battingPerformances.dismissedBy.fielder',
          select: 'name'
        });

      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }

      res.status(200).json(match);
    } else {
      // Use mock data when MongoDB is not connected
      const match = mockData.matches.find(m => m._id === req.params.id);

      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }

      res.status(200).json(match);
    }
  } catch (error) {
    // Fallback to mock data on error
    console.error('Error fetching match by ID:', error);
    const match = mockData.matches.find(m => m._id === req.params.id);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.status(200).json(match);
  }
};

// Create a new match
export const createMatch = async (req, res) => {
  const matchData = req.body;

  try {
    const newMatch = new Match(matchData);
    const savedMatch = await newMatch.save();

    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update match
export const updateMatch = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete match
export const deleteMatch = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMatch = await Match.findByIdAndDelete(id);

    if (!deletedMatch) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.status(200).json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update match status (Live, Completed)
export const updateMatchStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add commentary
export const addCommentary = async (req, res) => {
  const { id } = req.params;
  const commentaryData = req.body;

  try {
    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    match.commentary.push(commentaryData);
    const updatedMatch = await match.save();

    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update innings
export const updateInnings = async (req, res) => {
  const { id, inningsIndex } = req.params;
  const inningsData = req.body;

  try {
    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    if (!match.innings[inningsIndex]) {
      return res.status(404).json({ message: 'Innings not found' });
    }

    match.innings[inningsIndex] = {
      ...match.innings[inningsIndex].toObject(),
      ...inningsData
    };

    const updatedMatch = await match.save();

    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
