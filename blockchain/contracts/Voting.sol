// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) public voters;
    uint public totalVotes;

    constructor() {
        totalVotes = 0;
    }

    function vote() public {
        require(!voters[msg.sender], "You have already voted");
        voters[msg.sender] = true;
        totalVotes += 1;
    }
}
