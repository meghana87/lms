pragma solidity ^0.4.8;

import "./SecurityLibrary.sol";

contract DataVerifiable {

	address public orgStore;
	using SecurityLibrary for address;

    modifier onlyAdmin() {
        if (!orgStore.isUserAdmin(msg.sender)) {
            throw;
        }
        _;
    }

}