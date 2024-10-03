// services/voteService.js
const Web3 = require('web3');
const ElectionABI = require('../smart-contracts/Election.json'); // ABI from Truffle

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_NODE_URL));
const contractAddress = process.env.ELECTION_CONTRACT_ADDRESS;
const electionContract = new web3.eth.Contract(ElectionABI.abi, contractAddress);

exports.castVote = async (voterId, candidateId) => {
    try {
        const voter = await Voter.findById(voterId);
        if (!voter || voter.voted) throw new Error('Voter not eligible or already voted');

        const result = await electionContract.methods.vote(candidateId).send({ from: voter.publicKey });
        voter.voted = true;
        await voter.save();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};
