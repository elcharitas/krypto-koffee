import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main(routerAddress: string) {
    const PayMeMatic = await ethers.getContractFactory("PayMeMatic");
    const manager = await PayMeMatic.deploy(routerAddress);

    await manager.deployed();
}

main(process.argv[0]).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
