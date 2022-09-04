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
