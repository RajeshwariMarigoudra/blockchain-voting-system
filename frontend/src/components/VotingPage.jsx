// src/components/VotingPage.js
import React, { useState, useContext } from "react";
import { VoteContext } from "../state/voteContext";
import { castVote } from "../services/voterService";

const VotingPage = () => {
  const [candidate, setCandidate] = useState("");
  const { voterId, hasVoted, setHasVoted } = useContext(VoteContext);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleVote = async (e) => {
    e.preventDefault();
    try {
      await castVote({ voterId, candidate });
      setSuccessMessage("Vote cast successfully!");
      setHasVoted(true);
    } catch (error) {
      setError("Failed to cast vote. Try again.");
    }
  };

  return (
    <div>
      <h2>Cast Your Vote</h2>
      {hasVoted ? (
        <p>You have already voted.</p>
      ) : (
        <form onSubmit={handleVote}>
          <label>
            Choose Candidate:
            <select
              value={candidate}
              onChange={(e) => setCandidate(e.target.value)}
            >
              <option value="">Select a candidate</option>
              <option value="Candidate 1">Candidate 1</option>
              <option value="Candidate 2">Candidate 2</option>
            </select>
          </label>
          <button type="submit">Vote</button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default VotingPage;
