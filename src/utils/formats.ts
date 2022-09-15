import { utils, ethers } from "ethers";

/**
 * Generates a url to the Etherscan page for a given address.
 *
 * @param address
 * @returns
 */
export const etherScanUrl = (address: string) =>
    `https://etherscan.io/address/${address}`;

/**
 * Formats an address to be displayed in the UI
 *
 * @param address
 * @returns
 */
export const formatAddress = (address: string) =>
    address.substring(0, 6) + "..." + address.substring(address.length - 4);

/**
 * Converts an enum to an array of its values
 *
 * @param enumValue
 * @returns
 */
export const denum = <T extends Record<string, string | number>>(
    enumValue: T
) => Object.entries(enumValue).filter(([value]) => Number.isNaN(Number(value)));

/**
 * Parses an arbitrary number into currency styles
 *
 * @param value
 * @param symbol
 * @param decimals
 * @returns
 */
export const parseCurrency = (value: number, symbol = "", decimals = 2) =>
    `${new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: decimals,
    }).format(value)} ${symbol}`;

/**
 * Parse an address or ens value
 *
 * @param address
 * @returns
 */
export const parseAddress = (address: string) => utils.getAddress(address);

/**
 * converts a number to big number
 *
 * @param value
 * @returns
 */
export const parseNumber = (value: string | number) => {
    const strVal = value.toString();
    const ethVal = utils.parseEther(strVal);
    return ethers.BigNumber.from(ethVal);
};

/**
 * converts string to bytes
 *
 * @param value
 * @returns
 */
export const parseBytes = (value: string) => utils.toUtf8Bytes(value);

/**
 * parse a abi to fragments
 *
 * @param abi
 * @returns
 */
export const parseAbi = (abi: string[]): utils.Fragment[] => {
    const iFace = new utils.Interface(abi);
    const jsonAbi = iFace.format(utils.FormatTypes.json);
    return JSON.parse(String(jsonAbi));
};

/**
 * converts a big number to number
 *
 * @param bigNum
 * @param unit
 * @returns
 */
export const formatBigNumber = (
    bigNum: ethers.BigNumberish,
    unit: ethers.BigNumberish = "ether"
) => {
    const bigNumStr = String(bigNum);
    const formattedValue = utils.formatUnits(bigNumStr, unit);
    return Number(formattedValue);
};

export const formatBytes = (bytes: utils.BytesLike) =>
    utils.toUtf8String(bytes);
