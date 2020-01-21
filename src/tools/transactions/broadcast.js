"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var transactions_1 = require("../../api-node/transactions");
var utils_1 = require("../utils");
var wait_1 = __importDefault(require("./wait"));
var DEFAULT_BROADCAST_OPTIONS = {
    chain: false,
    confirmations: -1,
    maxWaitTime: 0,
    requestInterval: 0
};
function default_1(base, list, options) {
    var opt = __assign(__assign({}, DEFAULT_BROADCAST_OPTIONS), (options || {}));
    var isOnce = !Array.isArray(list);
    var confirmations = opt.confirmations > 0 ? 1 : 0;
    return (opt.chain
        ? chainBroadcast(base, utils_1.toArray(list), __assign(__assign({}, opt), { confirmations: confirmations }))
        : simpleBroadcast(base, utils_1.toArray(list)))
        .then(function (list) { return opt.confirmations <= 0 ? list : wait_1["default"](base, list, opt); })
        .then(function (list) { return isOnce ? utils_1.head(list) : list; });
}
exports["default"] = default_1;
function simpleBroadcast(base, list) {
    return Promise.all(list.map(function (tx) { return transactions_1.broadcast(base, tx); }));
}
function chainBroadcast(base, list, options) {
    return new Promise(function (resolve, reject) {
        var toBroadcast = list.slice().reverse();
        var result = [];
        var loop = function () {
            if (!toBroadcast.length) {
                resolve(result);
                return null;
            }
            var tx = toBroadcast.pop();
            transactions_1.broadcast(base, tx)
                .then(function (tx) { return wait_1["default"](base, tx, options); })
                .then(function (tx) {
                result.push(tx);
                loop();
            }, reject);
        };
        loop();
    });
}
//# sourceMappingURL=broadcast.js.map