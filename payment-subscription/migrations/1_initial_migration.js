const Migrations = artifacts.require("Payment");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
