export const setLocalStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
};
export const getLocalStorage = (key: string) => {
    try {
        return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(''));
    } catch (e) {
        return null;
    }
};
export const removeLocalStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.log(e);
    }
};
export const skip = <T>(arr: T[], startIndex: number): T[] => {
    if (!arr || startIndex < 0 || startIndex >= arr.length) {
        return [];
    }
    return arr.slice(startIndex);
}
export const take = <T>(arr: T[], n: number): T[] => {
    if (!arr) return []
    if (n <= 0 || n >= arr.length) {
        return [...arr];
    }
    return arr.slice(0, n);
}