const Migrations = artifacts.require("StcToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
