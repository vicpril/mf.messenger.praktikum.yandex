export function sortByTime(messages, sort = 'desc') {
    return sort === 'desc'
        ? messages.sort((a, b) => (a.time < b.time) ? 1 : -1)
        : messages.sort((a, b) => (a.time > b.time) ? 1 : -1)

}
