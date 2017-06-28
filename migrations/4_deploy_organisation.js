var BooksLibrary = artifacts.require("./BooksLibrary.sol");
var MembersLibrary = artifacts.require("./MembersLibrary.sol");
var SecurityLibrary = artifacts.require("./SecurityLibrary.sol");
var Organisation = artifacts.require("./Organisation.sol");

module.exports = function(deployer) {
  deployer.deploy(BooksLibrary);
  deployer.deploy(MembersLibrary);
  deployer.link(BooksLibrary, Organisation);
  deployer.link(MembersLibrary, Organisation);
  deployer.link(SecurityLibrary, Organisation);
  deployer.deploy(Organisation);
};
