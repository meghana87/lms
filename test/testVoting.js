'use strict';
const Ballot = artifacts.require('../contracts/Ballot.sol');

contract('Ballot', function(accounts) {
	let ballot;

	beforeEach(async function() {
		ballot = await Ballot.new([0x0,accounts[0]]);
	});

	describe('TotalCandidates', function() {
		it('should check the count of candidates', async function() {
			let candidate_count = await ballot.TotalCandidates();
			assert.equal(candidate_count.valueOf(),2,'Above candidates got added.');
		});
	});

	describe('validCandidate', function() {
        it('should check if a candidate is valid', async function() {
        	let validity_status = await ballot.validCandidate.call(0x0);
        	assert.equal(validity_status,true,'Above candiate is valid.');
        });
    });


	describe('TotalVotesReceived', function() {
        it('should provide votes received', async function() {
        	await ballot.VoteFor(accounts[0]);
        	await ballot.VoteFor(accounts[0]);
        	await ballot.VoteFor(0x0);
        	let votecount = await ballot.TotalVotesReceived.call(0x0);
        	assert.equal(votecount.valueOf(),1, 'Above candidate has received 1 votes.');
        });
    });

    describe('FindWinner', function() {
    	it('should return the winning address', async function() {
    		await ballot.VoteFor(accounts[0]);
        	await ballot.VoteFor(accounts[0]);
        	await ballot.VoteFor(0x0);
        	await ballot.VoteFor(0x0);
        	await ballot.VoteFor(0x0);
    		let winner = await ballot.FindWinner.call();
    		assert.equal(winner.valueOf(),0x0, 'Found a winner.');
    	});
    });
});