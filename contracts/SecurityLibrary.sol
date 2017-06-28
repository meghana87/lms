pragma solidity ^0.4.8;

import "./DataStore.sol";

library SecurityLibrary {

    event AdminAdded(address _user);
    //event AdminRemoved(address _user);
    
    // Manages records for admins stored in the format:
    // sha3('admin:', address) -> bool isUserAdmin , e.g. 0xd91cf6dac04d456edc5fcb6659dd8ddedbb26661 -> true
    function getAdminsCount(address _orgStoreAddress) constant returns(uint) {
        return DataStore(_orgStoreAddress).getIntValue(sha3("AdminsCount"));
    }

    function addAdmin(address _orgStoreAddress, address _user) {
        var userIsAdmin = DataStore(_orgStoreAddress).getBoolValue(sha3('admin:', _user));
        if(userIsAdmin) {
            throw;
        }
        DataStore(_orgStoreAddress).setBoolValue(sha3('admin:', _user), true);
        // Increment the admins count in storage
        var adminsCount = DataStore(_orgStoreAddress).getIntValue(sha3("AdminsCount"));
        DataStore(_orgStoreAddress).setIntValue(sha3("AdminsCount"), adminsCount + 1);
        AdminAdded(_user);
    }

    function isUserAdmin(address _orgStoreAddress, address _user) constant returns (bool) {
        return DataStore(_orgStoreAddress).getBoolValue(sha3('admin:', _user));
    }
}
