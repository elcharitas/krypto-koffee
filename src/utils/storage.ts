import * as Name from "w3name";
import { formatBytes, parseBytes } from "./formats";

/**
 * @param text
 * @returns
 */
export const parseJson = <T = unknown>(text: string | null): T | null => {
    try {
        return JSON.parse(String(text));
    } catch (e) {
        return null;
    }
};

export const { stringify } = JSON;

export const Storage = {
    getItem<T = unknown>(key: string, def?: T) {
        const item = this.store.getItem(key);
        const storedValue = parseJson<T>(item);
        return storedValue ?? def;
    },
    setItem(key: string, value: unknown) {
        this.store.setItem(key, stringify(value));
    },
    get store() {
        if (typeof window !== "undefined") return localStorage;
        return {
            getItem: () => null,
            setItem: () => {},
        };
    },
};

export const createKeys = (bulk: string) => [
    bulk.substring(0, 4),
    bulk.substring(bulk.length - 4),
    bulk.substring(4, bulk.length - 4),
];

/**
 * Creates a new instance of ipns and returns the accessKey and publicKey
 *
 * @param cid
 * @returns
 */
export const createIpns = (cid: string) =>
    Name.create().then(async (ipns) => {
        const revision = await Name.v0(ipns, cid);
        await Name.publish(revision, ipns.key);
        const privateKey = formatBytes(ipns.key.bytes);
        const [access, secret, publicKey] = createKeys(privateKey);
        return {
            accessKey: access + secret,
            publicKey: publicKey,
        };
    });

export const resolveIpns = (ipns: string) => Name.resolve(Name.parse(ipns));

export const updateIpns = async (
    ipns: string,
    accessKey: string,
    publicKey: string,
    cid: string
) => {
    const [access, secret] = createKeys(accessKey);
    const privateKey = parseBytes(access + publicKey + secret);
    const ipnsValue = await Name.from(privateKey);
    const lastRevision = await resolveIpns(ipns);
    const nextRevision = await Name.increment(lastRevision, cid);
    await Name.publish(nextRevision, ipnsValue.key);
};
