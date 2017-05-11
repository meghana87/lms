pragma solidity ^0.4.0;


contract Ballot {
	mapping (uint => Candidate) public ballot;
	struct Candidate {
		address candidateAccount;
		uint voteCount;
	}
	uint public numCandidates;


	function Ballot(address[] addresses) {
		for (uint i=0; i < addresses.length; i++) {
			ballot[numCandidates++] = Candidate(addresses[i], 0);
		}
	}

	function totalVotesReceived(address account) constant returns (uint) {
		if (validCandidate(account) == false) throw;
		for (uint i=0; i < numCandidates; i++) {
			if (ballot[i].candidateAccount == account) {
				return ballot[i].voteCount;
			}
		}
	}

	function voteFor(address account) {
		if (validCandidate(account) == false) throw;
		for (uint i=0; i < numCandidates; i++) {
			if (ballot[i].candidateAccount == account) {
				ballot[i].voteCount++;
			}
		}
	}

	function totalCandidates() constant returns (uint) {
		return numCandidates;
	}

	function validCandidate(address account) constant returns (bool) {
		for (uint i=0; i < numCandidates; i++) {
			if (ballot[i].candidateAccount == account) {
				return true;
			} 
		}
		throw;
	}

	function findWinner() returns (address) {
		uint winningCount;
		address winner;
		for (uint i=0; i < (numCandidates-1); i++) {
			if (ballot[i].voteCount > ballot[i+1].voteCount) {
				winningCount = ballot[i].voteCount;
				winner = ballot[i].candidateAccount;
			}else {
				winningCount = ballot[i+1].voteCount;
				winner = ballot[i+1].candidateAccount;
			}
		}
		return winner;
	}
}
