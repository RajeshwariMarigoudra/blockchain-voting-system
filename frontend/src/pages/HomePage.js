// src/pages/HomePage.js
import React from "react";
import VoterRegistration from "../components/VoterRegistration.jsx";
import VotingPage from "../components/VotingPage.jsx";
import ResultsPage from "../components/ResultsPage.jsx";

const HomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to the Blockchain Voting System</h1>
      <VoterRegistration />
      <VotingPage />
      <ResultsPage />
    </div>
  );
};

export default HomePage;
