// src/pages/HomePage.js
import React, { useEffect, useState }  from "react";
import Web3 from "web3";
// import VoterRegistration from "../components/VoterRegistration.jsx";
// import VotingPage from "../components/VotingPage.jsx";
// import ResultsPage from "../components/ResultsPage.jsx";
import "../assets/homepage.css";   // Custom CSS to style the page
import Election from "../../../blockchain/build/contracts/Election.json"; // ABI for the contract

const HomePage = () => {
  const [account, setAccount] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const electionData = Election.networks[networkId];
    if (electionData) {
      const election = new web3.eth.Contract(Election.abi, electionData.address);
      const candidatesCount = await election.methods.candidatesCount().call();
      let candidatesArray = [];
      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await election.methods.candidates(i).call();
        candidatesArray.push(candidate);
      }
      setCandidates(candidatesArray);
    }
  };




  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="jumbotron text-center bg-primary text-white">
        <h1>Blockchain Voting System</h1>
        <p className="lead">Secure. Transparent. Immutable.</p>
      </header>

      {/* Footer */}
      <footer className="text-center mt-5">
        <p>&copy; 2024 Blockchain Voting System</p>
      </footer>

      <h1>Blockchain Voting System</h1>
      <p>Your account: {account}</p>
      <h2>Candidates:</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name} - {candidate.voteCount} votes
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
