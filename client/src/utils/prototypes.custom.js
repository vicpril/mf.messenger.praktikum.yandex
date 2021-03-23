import { first } from "/utils/mydash/first";
import { last } from "/utils/mydash/last";


export default (function () {
    FormData.prototype.getData = function () {
        return [...this.entries()]
            .reduce(
                (obj, pair) => Object.assign(obj, { [pair[0]]: pair[1] }), {}
            );
    }

    Date.prototype.getTimeFormatted = function () {
        const hh = ("0" + this.getHours()).slice(-2);
        const mm = ("0" + this.getMinutes()).slice(-2);
        return `${hh}:${mm}`;
    }

    Array.prototype.first = function () {
        return first(this)
    }

    Array.prototype.last = function () {
        return last(this)
    }

})()