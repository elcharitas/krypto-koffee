import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main(routerAddress: string) {
    const KryptoKoffee = await ethers.getContractFactory("KryptoKoffee");
    const manager = await KryptoKoffee.deploy(routerAddress);

    await manager.deployed();
}

main(process.argv[0]).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
