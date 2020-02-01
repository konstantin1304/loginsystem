export const deepCopy = source => {
    if (typeof source !== 'object' || source === null) {
        return source;
    }

    if (source instanceof Date) {
        return new Date(source.getTime());
    }

    if (source instanceof Array) {
        return source.reduce((arr, item, i) => {
            arr[i] = deepCopy(item);
            return arr;
        }, []);
    }

    if (source instanceof Object) {
        return Object.keys(source).reduce((newObj, key) => {
            newObj[key] = deepCopy(source[key]);
            return newObj;
        }, {});
    }
};
