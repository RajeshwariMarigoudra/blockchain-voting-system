// src/services/voterService.js
import axios from "axios";

// Register voter
export const registerVoter = async (voterData) => {
  const response = await axios.post("/api/register", voterData);
  return response.data;  // Assume that the backend interacts with the blockchain to register the voter
};

// Cast a vote
export const castVote = async (voteData) => {
  const response = await axios.post("/api/vote", voteData);
  return response.data;  // Blockchain records the vote securely
};

// Get results
export const getResults = async () => {
  const response = await axios.get("/api/results");
  return response.data;  // Fetch results securely from the blockchain
};
