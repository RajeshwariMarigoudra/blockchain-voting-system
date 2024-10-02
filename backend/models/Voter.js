// models/Voter.js
const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  },
});

const Voter = mongoose.model("Voter", VoterSchema);

module.exports = Voter;
