import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  role: {
    type: String,
    enum: ['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'],
    required: true
  },
  battingStyle: {
    type: String,
    enum: ['Right-handed', 'Left-handed'],
    default: 'Right-handed'
  },
  bowlingStyle: {
    type: String,
    default: ''
  },
  stats: {
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    bestBowling: { type: String, default: '0/0' }
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
