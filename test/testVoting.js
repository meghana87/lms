'use strict';
const Ballot = artifacts.require('../contracts/Ballot.sol');

contract('Ballot', function(accounts) {
	let ballot;

	beforeEach(async function() {
		ballot = await Ballot.new([0x0, accounts[0]]);
	});

	describe('TotalCandidates', function() {
		it('should check the count of candidates', async function() {
			let candidate_count = await ballot.Totalcandidates();
			assert.equal(candidate_count.valueOf(), 2, 'Above candidates got added.');
		});
	});

	describe('ValidCandidate', function() {
        it('should check if a candidate is valid', async function() {
        	let validity_status = await ballot.Validcandidate.call(0x0);
        	assert.equal(validity_status, true, 'Above candiate is valid.');
        });
    });


	describe('TotalVotesReceived', function() {
        it('should provide votes received', async function() {
        	await ballot.Votefor(accounts[0]);
        	await ballot.Votefor(accounts[0]);
        	await ballot.Votefor(0x0);
        	let votecount = await ballot.Totalvotesreceived.call(0x0);
        	assert.equal(votecount.valueOf(), 1, 'Above candidate has received 1 votes.');
        });
    });

    describe('FindWinner', function() {
    	it('should return the winning address', async function() {
    		await ballot.Votefor(accounts[0]);
        	await ballot.Votefor(accounts[0]);
        	await ballot.Votefor(accounts[0]);
        	await ballot.Votefor(0x0);
        	await ballot.Votefor(0x0);
    		let winner = await ballot.Findwinner.call();
    		assert.equal(winner.valueOf(), accounts[0], 'Found a winner.');
    	});
    });
});