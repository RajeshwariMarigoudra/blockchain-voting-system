const Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {
  let electionInstance;

  it("initializes with two candidates", async () => {
    electionInstance = await Election.deployed();
    const count = await electionInstance.candidatesCount();
    assert.equal(count, 2);
  });

  it("allows a voter to cast a vote", async () => {
    electionInstance = await Election.deployed();
    const candidateId = 1;
    await electionInstance.vote(candidateId, { from: accounts[0] });
    const candidate = await electionInstance.candidates(candidateId);
    assert.equal(candidate.voteCount, 1);
  });
});
