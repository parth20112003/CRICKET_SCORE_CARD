import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Cricket Scorecard API is running');
});

// Import routes and controllers
import matchRoutes from './routes/matches.js';
import teamRoutes from './routes/teams.js';
import playerRoutes from './routes/players.js';
import { setMongoConnectionStatus as setMatchMongoStatus } from './controllers/matchController.js';
import { setMongoConnectionStatus as setTeamMongoStatus } from './controllers/teamController.js';
import { setMongoConnectionStatus as setPlayerMongoStatus } from './controllers/playerController.js';

// Use routes
app.use('/api/matches', matchRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);

// Start server regardless of MongoDB connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cricket-scorecard')
  .then(() => {
    console.log('Connected to MongoDB');
    // Set MongoDB connection status to true for all controllers
    setMatchMongoStatus(true);
    setTeamMongoStatus(true);
    setPlayerMongoStatus(true);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Server running without database connection. Using mock data.');
    // Set MongoDB connection status to false for all controllers
    setMatchMongoStatus(false);
    setTeamMongoStatus(false);
    setPlayerMongoStatus(false);
  });
