import * as Name from "w3name";
import { Web3Storage } from "web3.storage";
import { formatBytes, parseBytes } from "./formats";

// web3 storage client
export const storageClient = new Web3Storage({
    token: String(process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN),
});

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

export const resolveIpns = (ipns: string) => {
    try {
        return Name.resolve(Name.parse(ipns));
    } catch (e) {
        return Promise.resolve({ value: "" });
    }
};

export const updateIpns = async (
    ipns: string,
    accessKey: string,
    publicKey: string,
    cid: string
) => {
    const [access, secret] = createKeys(accessKey);
    const privateKey = parseBytes(access + publicKey + secret);
    const ipnsValue = await Name.from(privateKey);
    const lastRevision = await Name.resolve(Name.parse(ipns));
    const nextRevision = await Name.increment(lastRevision, cid);
    await Name.publish(nextRevision, ipnsValue.key);
};

export const createFile = <T = unknown>(data: T, filename?: string) => {
    const blob = new Blob([stringify(data)], {
        type: "application/json",
    });
    return new File([blob], filename || `${Date.now()}.json`);
};
export const fetchJSON = async <T = unknown>(cid: string) => {
    const store = await storageClient.get(cid);
    if (!store) return null;
    const [file] = await store.files();
    const text = await file.text();
    return parseJson<T>(text);
};
