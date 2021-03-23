export function trimQuotes(str) {
    const regExp = /^["'](.+(?=["']$))["']$/gi
    return str.replace(regExp, '$1');
}