export function strToColor(str) {
    return intToRGB(hashCode(str));
}

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i) {
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "#" + ("00000".substring(0, 6 - c.length) + c);
}

export function strToLodash(str) {
    return str
        .toLowerCase()
        .replace(/\s/gi, "_");
}

export function lodashToStr(str) {
    str = str.replace(/\_/gi, " ");
    return str.charAt(0).toUpperCase() + str.slice(1);
}