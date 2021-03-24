/**
 * Get object's field by string
 * 
 * @param  {Object} obj
 * @param  {String} str
 * @param  {any} defaultValue
 */
export function get(obj, str, defaultValue) {
    if (!str) {
        return defaultValue
    }
    const keys = str.split('.');
    let result = obj;

    for (let key of keys) {
        const value = result[key];

        if (typeof value === 'undefined') {
            return defaultValue;
        }

        result = value;
    }

    return typeof value === 'undefined'
        ? result
        : defaultValue;
}
