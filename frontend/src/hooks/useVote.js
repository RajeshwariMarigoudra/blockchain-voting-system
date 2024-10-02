// src/hooks/useVote.js
import { useContext, useState } from "react";
import { VoteContext } from "../state/voteContext";
import { castVote } from "../services/voterService";

export const useVote = () => {
  const { voterId, hasVoted, setHasVoted } = useContext(VoteContext);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const submitVote = async (candidate) => {
    try {
      if (hasVoted) {
        setError("You have already voted.");
        return;
      }
      await castVote({ voterId, candidate });
      setSuccessMessage("Your vote has been cast successfully!");
      setHasVoted(true);
    } catch (error) {
      setError("Failed to cast your vote. Please try again.");
    }
  };

  return {
    voterId,
    hasVoted,
    submitVote,
    error,
    successMessage,
  };
};
