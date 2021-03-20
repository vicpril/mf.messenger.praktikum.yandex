
function last(list) {
    if (!Array.isArray(list) || list.length === 0)
        return undefined;

    return list[list.length - 1]
}