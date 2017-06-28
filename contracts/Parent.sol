pragma solidity ^0.4.8;

import "./DataStore.sol";
import "./OrgLibrary.sol";
import "./OrganisationInterface.sol";

import "./DataVerifiable.sol";
import "./helper_contracts/zeppelin/ownership/Ownable.sol";


contract Parent is Ownable, DataVerifiable {
    address public orgStore;

    using OrgLibrary for address;

    function Parent() payable {
        // Call setDataStore before using this contract.
        setDataStore(0x0);
    }

    function setDataStore(address _orgStore) onlyOwner {
        if (_orgStore == 0x0) {
            orgStore = new DataStore();
            DataVerifiable.orgStore = orgStore;
        } else {
            orgStore = _orgStore;
            DataVerifiable.orgStore = orgStore;
        }
        orgStore.addAdmin(msg.sender);
    }

    function registerOrganisation(bytes32 key, address org) onlyAdmin {
        // Important: Pass an organisation without a set data store
        orgStore.registerOrganisation(key, org);
        // Create new book and member data stores
        OrganisationInterface(org).setDataStore(0x0, 0x0);
    }


    function makeAdmin(address _user) onlyAdmin {
        orgStore.addAdmin(_user);
    }


    function getOrganisation(bytes32 key) constant returns (address) {
        return orgStore.getOrganisation(key);
    }

    function upgradeOrganisation(bytes32 key, address newOrg) onlyAdmin {
        var org = orgStore.getOrganisation(key);
        orgStore.setOrganisation(key, newOrg);
        OrganisationInterface(org).kill(newOrg);
    }

    function kill(address upgradedParent) onlyAdmin {
        // Provide the address of upgraded parent in order to transfer all data and ownership to the new parent.
        if (upgradedParent == 0x0) {
            throw;
        }
        Parent(upgradedParent).setDataStore(orgStore);
        DataStore(orgStore).transferOwnership(upgradedParent);
        selfdestruct(upgradedParent);
    }
}
