// src/components/ResultsPage.js
import React, { useEffect, useState } from "react";
import { getResults } from "../services/voterService";

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getResults();
        setResults(response.voteCounts);
      } catch (error) {
        console.error("Failed to fetch results", error);
      }
    };
    fetchResults();
  }, []);

return (
  <div>
    <h2>Election Results</h2>
    <ul>
      {Array.isArray(results) && results.length > 0 ? (
        results.map((result, index) => (
          <li key={index}>
            Candidate {index + 1}: {result} votes
          </li>
        ))
      ) : (
        <li>No results available</li>
      )}
    </ul>
  </div>
);

  
};

export default ResultsPage;
