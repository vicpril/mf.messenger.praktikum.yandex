
export function compare(post, operator, value) {
    // debugger
    switch (operator) {
        case '>': return post > value;
        case '<': return post < value;
        case '>=': return post >= value;
        case '<=': return post <= value;
        case '==': return post == value;
        case '!=': return post != value;
        case '===': return post === value;
        case '!==': return post !== value;
        case null:
        case undefined:
            return post ? true : false;
        default: return false
    }
}