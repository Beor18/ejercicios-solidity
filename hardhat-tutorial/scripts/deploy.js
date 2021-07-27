const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployando contracto con la cuenta: ", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Balance cuenta: ", balance.toString());

  const Token = await ethers.getContractFactory("Stc");
  const token = await Token.deploy();

  console.log("Token address: ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
