"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var blocks_1 = require("../../api-node/blocks");
var utils_1 = require("../utils");
var detectInterval_1 = __importDefault(require("./detectInterval"));
var storage = Object.create(null);
function default_1(base, current) {
    return Promise.all([
        getInterval(base),
        current == undefined ? blocks_1.fetchHeight(base).then(function (_a) {
            var height = _a.height;
            return height + 1;
        }) : current
    ]).then(function (_a) {
        var interval = _a[0], current = _a[1];
        return loop(interval, current);
    });
    function loop(interval, current) {
        return blocks_1.fetchHeadersLast(base).then(function (_a) {
            var height = _a.height, timestamp = _a.timestamp;
            if (height >= current) {
                return { height: height };
            }
            var blocksToWait = current - height;
            var now = Date.now();
            var timeout = (((blocksToWait - 1) * interval) + ((interval - Math.abs(now - timestamp)))) * 0.8;
            return utils_1.wait(inRange(timeout, 200, (interval * blocksToWait) * 0.8)).then(function () { return loop(interval, current); });
        });
    }
}
exports["default"] = default_1;
function inRange(current, min, max) {
    return Math.round(Math.min(Math.max(current, min), max));
}
function getInterval(base) {
    if (storage[base]) {
        return Promise.resolve(storage[base]);
    }
    else {
        return detectInterval_1["default"](base).then(function (interval) {
            storage[base] = interval;
            return interval;
        });
    }
}
//# sourceMappingURL=waitHeight.js.map