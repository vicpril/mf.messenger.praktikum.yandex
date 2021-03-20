/**
 * Get object's field by string
 * 
 * @param  {Object} obj
 * @param  {String} str
 * @param  {any} defaultValue
 */
export function get(obj, str, defaultValue) {
    const keys = str.split('.');
    let result = obj;

    for (let key of keys) {
        const value = result[key];

        if (!value) {
            return defaultValue;
        }

        result = value;
    }

    return result ?? defaultValue;
}
