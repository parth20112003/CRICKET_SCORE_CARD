import mongoose from 'mongoose';

// Schema for batting performance
const battingSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  runs: {
    type: Number,
    default: 0
  },
  balls: {
    type: Number,
    default: 0
  },
  fours: {
    type: Number,
    default: 0
  },
  sixes: {
    type: Number,
    default: 0
  },
  strikeRate: {
    type: Number,
    default: 0
  },
  dismissalType: {
    type: String,
    enum: ['Not Out', 'Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket', 'Retired Hurt', 'Did Not Bat'],
    default: 'Not Out'
  },
  dismissedBy: {
    bowler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      default: null
    },
    fielder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      default: null
    }
  }
});

// Schema for bowling performance
const bowlingSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  overs: {
    type: Number,
    default: 0
  },
  maidens: {
    type: Number,
    default: 0
  },
  runs: {
    type: Number,
    default: 0
  },
  wickets: {
    type: Number,
    default: 0
  },
  economy: {
    type: Number,
    default: 0
  },
  wides: {
    type: Number,
    default: 0
  },
  noBalls: {
    type: Number,
    default: 0
  }
});

// Schema for innings
const inningsSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  totalRuns: {
    type: Number,
    default: 0
  },
  wickets: {
    type: Number,
    default: 0
  },
  overs: {
    type: Number,
    default: 0
  },
  extras: {
    wides: { type: Number, default: 0 },
    noBalls: { type: Number, default: 0 },
    byes: { type: Number, default: 0 },
    legByes: { type: Number, default: 0 },
    penalty: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  battingPerformances: [battingSchema],
  bowlingPerformances: [bowlingSchema]
});

// Main match schema
const matchSchema = new mongoose.Schema({
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  }],
  venue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  matchType: {
    type: String,
    enum: ['Test', 'ODI', 'T20', 'T10'],
    required: true
  },
  series: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Live', 'Completed'],
    default: 'Upcoming'
  },
  result: {
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null
    },
    margin: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  toss: {
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null
    },
    decision: {
      type: String,
      enum: ['Bat', 'Field', ''],
      default: ''
    }
  },
  innings: [inningsSchema],
  playerOfTheMatch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    default: null
  },
  commentary: [{
    over: Number,
    ball: Number,
    text: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Match = mongoose.model('Match', matchSchema);

export default Match;
