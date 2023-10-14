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
declare global {
    interface Array<T> {
        take(count: number): T[];
    }
    interface Array<T> {
        skip(count: number): T[];
    }
}
//
Array.prototype.take = function (count: number): any[] {
    if (!this) return []
    if (count <= 0 || count >= this.length) {
        return [...this];
    }
    return this.slice(0, count);
};
Array.prototype.skip = function (count: number): any[] {
    if (!this || count < 0 || count >= this.length) {
        return [];
    }
    return this.slice(count);
};
export const debounce = (func: (...args: any[]) => void, ms: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: ThisParameterType<typeof func>, ...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), ms);
    };
}
//
export const scrollToSmooth = () => {
    document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    })
}