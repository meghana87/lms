pragma solidity ^0.4.0;


contract Ballot {
	mapping (uint => Candidate) public Ballot;
	struct Candidate {
		address candidate_account;
		uint votecount;
	}
	uint public numCandidates;


	function Ballot(address[] addresses_) {
		for (uint i=0; i < addresses_.length; i++) {
			Ballot[++numCandidates] = Candidate(addresses_[i],0);
		}
	}

	function TotalVotesReceived(address account) returns (uint) {
		if (validCandidate(account) == false) throw;
		for (uint i=1; i <= numCandidates; i++) {
			if (Ballot[i].candidate_account == account) {
				return Ballot[i].votecount;
			}
		}
	}

	function VoteFor(address account) {
		if (validCandidate(account) == false) throw;
		for (uint i=1; i <= numCandidates; i++) {
			if (Ballot[i].candidate_account == account) {
				Ballot[i].votecount++;
			}
		}
	}

	function TotalCandidates() constant returns (uint) {
		return numCandidates;
	}

	function validCandidate(address account) returns (bool) {
		for (uint i=1; i <= numCandidates; i++) {
			if (Ballot[i].candidate_account == account) {
				return true;
			} 
		}
		return false;
	}

	function FindWinner() returns (address) {
		uint winning_count = 0;
		address winner;
		for (uint i=1; i <= numCandidates; i++) {
			if (Ballot[i].votecount > winning_count) {
				winning_count = Ballot[i].votecount;
				winner = Ballot[i].candidate_account;
			}
		}
		return winner;
	}
}