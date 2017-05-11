'use strict';
import expectThrow from './helpers/expectThrow';

const Ballot = artifacts.require('../contracts/Ballot.sol');

contract('Ballot', function(accounts) {
	let ballot;

	beforeEach(async function() {
		ballot = await Ballot.new([0x0, accounts[0]]);
	});

	describe('totalCandidates', function() {
		it('should check the count of candidates', async function() {
			let candidate_count = await ballot.totalCandidates();
			assert.equal(candidate_count.valueOf(), 2, 'Above candidates got added.');
		});
	});

	describe('validCandidate', function() {
        it('should check if a candidate is valid', async function() {
        	let validity_status = await ballot.validCandidate.call(0x0);
        	assert.equal(validity_status, true, 'Above candiate is valid.');
        });
        it('should throw if a candidate is not valid.', async function() {
        	await expectThrow(ballot.validCandidate.call(accounts[1]));
        });
    });


	describe('totalVotesReceived', function() {
        it('should provide votes received', async function() {
        	await ballot.voteFor(accounts[0]);
        	await ballot.voteFor(accounts[0]);
        	await ballot.voteFor(0x0);
        	let votecount = await ballot.totalVotesReceived.call(0x0);
        	assert.equal(votecount.valueOf(), 1, 'Above candidate has received 1 votes.');
        });
    });

    describe('findWinner', function() {
    	it('should return the winning address', async function() {
    		await ballot.voteFor(accounts[0]);
        	await ballot.voteFor(accounts[0]);
        	await ballot.voteFor(accounts[0]);
        	await ballot.voteFor(0x0);
        	await ballot.voteFor(0x0);
    		let winner = await ballot.findWinner.call();
    		assert.equal(winner.valueOf(), accounts[0], 'Found a winner.');
    	});
    });
});
