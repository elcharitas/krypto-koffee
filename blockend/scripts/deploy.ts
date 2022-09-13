import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main(routerAddress: string) {
    const CryptoCoffee = await ethers.getContractFactory("CryptoCoffee");
    const manager = await CryptoCoffee.deploy(routerAddress);

    await manager.deployed();
}

main(process.argv[0]).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
