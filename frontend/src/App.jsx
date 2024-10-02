import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ensure you're importing Router correctly
import VoterRegistration from './components/VoterRegistration';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';
import { VoteProvider } from './state/voteContext';
import './App.css';

function App() {
  return (
    <VoteProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/register">Voter Registration</a></li>
              <li><a href="/vote">Cast Vote</a></li>
              <li><a href="/results">Results</a></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<VoterRegistration />} />
            <Route path="/vote" element={<VotingPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </Router>
    </VoteProvider>
  );
}

export default App;
