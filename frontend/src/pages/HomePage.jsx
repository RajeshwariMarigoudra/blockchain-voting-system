// src/pages/HomePage.js
import React from "react";
import VoterRegistration from "../components/VoterRegistration.jsx";
import VotingPage from "../components/VotingPage.jsx";
import ResultsPage from "../components/ResultsPage.jsx";
import "../assets/homepage.css";   // Custom CSS to style the page

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="jumbotron text-center bg-primary text-white">
        <h1>Blockchain Voting System</h1>
        <p className="lead">Secure. Transparent. Immutable.</p>
      </header>

      {/* Main Content */}
      <div className="container mt-5">
        {/* Voter Registration Section */}
        <section id="voter-registration" className="mb-5">
          {/* <h2 className="text-center">Register as a Voter</h2>
          <p className="text-center">Securely register to participate in the election.</p> */}
          <VoterRegistration />
        </section>

        {/* Voting Section */}
        <section id="voting" className="mb-5">
          {/* <h2 className="text-center">Cast Your Vote</h2>
          <p className="text-center">Make your voice heard by voting in the blockchain-based election.</p> */}
          <VotingPage />
        </section>

        {/* Results Section */}
        <section id="results">
          {/* <h2 className="text-center">Election Results</h2>
          <p className="text-center">View the real-time election results.</p> */}
          <ResultsPage />
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5">
        <p>&copy; 2024 Blockchain Voting System</p>
      </footer>
    </div>
  );
};
export default HomePage;
