"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Time = (function () {
    function Time(since) {
        var _a = (since)
            ? process.hrtime(since.toArray())
            : process.hrtime(), seconds = _a[0], nanoseconds = _a[1];
        this.seconds = seconds;
        this.nanoseconds = nanoseconds;
    }
    Time.prototype.toArray = function () {
        return [this.seconds, this.nanoseconds];
    };
    Time.prototype.toString = function () {
        var time = this.seconds + (this.nanoseconds / 100000000);
        return time.toString();
    };
    return Time;
}());
exports.Time = Time;
//# sourceMappingURL=Time.js.map