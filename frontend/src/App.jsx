import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TestComponent from './components/TestComponent';

// Pages
import Home from './pages/Home';
import MatchDetails from './pages/MatchDetails';
import TeamList from './pages/TeamList';
import TeamDetails from './pages/TeamDetails';
import PlayerDetails from './pages/PlayerDetails';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMatches from './pages/admin/Matches';
import AdminTeams from './pages/admin/Teams';
import AdminPlayers from './pages/admin/Players';
import NotFound from './pages/NotFound';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <TestComponent />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matches/:id" element={<MatchDetails />} />
            <Route path="/teams" element={<TeamList />} />
            <Route path="/teams/:id" element={<TeamDetails />} />
            <Route path="/players/:id" element={<PlayerDetails />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/matches" element={<AdminMatches />} />
            <Route path="/admin/teams" element={<AdminTeams />} />
            <Route path="/admin/players" element={<AdminPlayers />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
