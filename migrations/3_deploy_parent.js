var DataStore = artifacts.require("./DataStore.sol");
var SecurityLibrary = artifacts.require("./SecurityLibrary.sol");
var DataVerifiable = artifacts.require("./DataVerifiable.sol");
var OrgLibrary = artifacts.require("./OrgLibrary.sol");
var Parent = artifacts.require("./Parent.sol");

module.exports = function(deployer) {
  deployer.deploy(DataStore);
  deployer.deploy(SecurityLibrary);
  deployer.link(SecurityLibrary, DataVerifiable);
  deployer.deploy(DataVerifiable);
  deployer.deploy(OrgLibrary);
  deployer.link(OrgLibrary, Parent);
  deployer.link(SecurityLibrary, Parent);
  deployer.deploy(Parent);
};
