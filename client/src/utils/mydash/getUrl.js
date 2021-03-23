export function getUrlParameter(key) {
    const url = new URL(location.href);
    return url.searchParams.get(key);
}