// src/state/voteContext.js
import React, { createContext, useState } from "react";

export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [voterId, setVoterId] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <VoteContext.Provider value={{ voterId, setVoterId, hasVoted, setHasVoted }}>
      {children}
    </VoteContext.Provider>
  );
};
