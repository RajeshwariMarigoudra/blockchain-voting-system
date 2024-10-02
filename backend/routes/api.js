// routes/api.js
const express = require("express");
const Voter = require("../models/Voter");
const Web3 = require("web3");
const router = express.Router();
const contractABI = require("../build/contracts/Voting.json").abi;
const contractAddress = "your_contract_address"; // Replace with your deployed contract address

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Register a new voter
router.post("/register", async (req, res) => {
  const { voterId, name } = req.body;
  try {
    const existingVoter = await Voter.findOne({ voterId });
    if (existingVoter) {
      return res.status(400).json({ msg: "Voter already registered" });
    }
    const newVoter = new Voter({ voterId, name });
    await newVoter.save();
    res.status(201).json({ msg: "Voter registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cast a vote
router.post("/vote", async (req, res) => {
  const { voterId, candidate } = req.body;
  try {
    const voter = await Voter.findOne({ voterId });
    if (!voter) {
      return res.status(404).json({ msg: "Voter not found" });
    }
    if (voter.hasVoted) {
      return res.status(400).json({ msg: "Voter has already voted" });
    }

    const accounts = await web3.eth.getAccounts();
    const receipt = await contract.methods.vote(candidate).send({ from: accounts[0] });
    voter.hasVoted = true;
    await voter.save();
    res.status(200).json({ msg: "Vote cast successfully", receipt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get election status
router.get("/status", async (req, res) => {
  try {
    const voteCounts = await contract.methods.getVoteCounts().call();
    res.json({ voteCounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
