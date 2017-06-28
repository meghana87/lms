'use strict';

const Parent = artifacts.require('../contracts/Parent.sol');
const Organisation = artifacts.require('../contracts/Organisation.sol');
const DataStore = artifacts.require('../contracts/DataStore.sol');
const SecurityLibrary = artifacts.require('../contracts/SecurityLibrary.sol');

import expectThrow from './helpers/expectThrow';

contract('Parent', function(accounts) {
    let parent;
    let orgstore;
    let org;

    beforeEach(async function() {
        parent = await Parent.new();
        orgstore = await parent.orgStore();
        org =  await Organisation.new();
    });

    describe('testParent', function() {
        it('should create Parent', async function() {
            console.log(parent.address);
            console.log(orgstore);
            console.log(org.address);
        });
        it('should let only admin create organisation', async function() {
            await parent.registerOrganisation("myorg", org.address, {from: accounts[0]});
        });
        it('should not allow non-admin to create organisation', async function() {
            await expectThrow(parent.registerOrganisation("myorg", org.address, {from: accounts[1]}))
        });
        it('should be able to fetch organisation address using key', async function() {
            await parent.registerOrganisation("myorg", org.address, {from: accounts[0]});
            let orgaddress = await parent.getOrganisation("myorg");
            assert.equal(org.address, orgaddress);
        });
    });

    describe('makeAdmin', function() {
        it('should allow admin to make a user admin', async function() {
            let securityLibrary = await SecurityLibrary.new()
            await parent.registerOrganisation("myorg", org.address, {from: accounts[0]});
            await parent.makeAdmin(accounts[1], {from: accounts[0]});
            let isadmin = await securityLibrary.isUserAdmin(orgstore,accounts[1]);
            assert.equal(isadmin, true);
        });
        it('should not allow non-admin to make a user admin', async function() {
            await parent.registerOrganisation("myorg", org.address, {from: accounts[0]});
            await expectThrow(parent.makeAdmin(accounts[1],{from: accounts[2]}));
        });
    });
});