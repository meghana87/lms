pragma solidity ^0.4.0;


contract Ballot {
	mapping (uint => Candidate) public Ballot;
	struct Candidate {
		address candidate_account;
		uint vote_count;
	}
	uint public Numcandidates;


	function Ballot(address[] addresses) {
		for (uint i=0; i < addresses.length; i++) {
			Ballot[Numcandidates++] = Candidate(addresses[i],0);
		}
	}

	function Totalvotesreceived(address account) constant returns (uint) {
		if (Validcandidate(account) == false) throw;
		for (uint i=0; i < Numcandidates; i++) {
			if (Ballot[i].candidate_account == account) {
				return Ballot[i].vote_count;
			}
		}
	}

	function Votefor(address account) {
		if (Validcandidate(account) == false) throw;
		for (uint i=0; i < Numcandidates; i++) {
			if (Ballot[i].candidate_account == account) {
				Ballot[i].vote_count++;
			}
		}
	}

	function Totalcandidates() constant returns (uint) {
		return Numcandidates;
	}

	function Validcandidate(address account) constant returns (bool) {
		for (uint i=0; i < Numcandidates; i++) {
			if (Ballot[i].candidate_account == account) {
				return true;
			} 
		}
		return false;
	}

	function Findwinner() returns (address) {
		uint winning_count;
		address winner;
		for (uint i=0; i < (Numcandidates-1); i++) {
			if (Ballot[i].vote_count > Ballot[i+1].vote_count) {
				winning_count = Ballot[i].vote_count;
				winner = Ballot[i].candidate_account;
			}else {
				winning_count = Ballot[i+1].vote_count;
				winner = Ballot[i+1].candidate_account;
			}
		}
		return winner;
	}
}