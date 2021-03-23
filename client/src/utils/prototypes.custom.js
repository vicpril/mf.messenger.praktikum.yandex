export default (function () {
    FormData.prototype.getData = function () {
        return [...this.entries()]
            .reduce(
                (obj, pair) => Object.assign(obj, { [pair[0]]: pair[1] }), {}
            );
    }
})()