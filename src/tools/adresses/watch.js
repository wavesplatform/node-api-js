"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var transactions_1 = require("../../api-node/transactions");
var utils_1 = require("../utils");
var typed_ts_events_1 = require("typed-ts-events");
var Watch = /** @class */ (function () {
    function Watch(base, address, tx, interval) {
        var _a, _b;
        this._emitter = new typed_ts_events_1.EventEmitter();
        this._timer = null;
        this.address = address;
        this._interval = interval || 1000;
        this._base = base;
        this._lastBlock = {
            lastId: ((_a = tx) === null || _a === void 0 ? void 0 : _a.id) || '',
            height: ((_b = tx) === null || _b === void 0 ? void 0 : _b.height) || 0,
            transactions: tx ? [tx] : []
        };
        this._addTimeout();
    }
    Watch.prototype.on = function (event, handler) {
        this._emitter.on(event, handler);
    };
    Watch.prototype.once = function (event, handler) {
        this._emitter.once(event, handler);
    };
    Watch.prototype.off = function (event, handler) {
        this._emitter.off(event, handler);
    };
    Watch.prototype._run = function () {
        var _this = this;
        if (this._timer) {
            clearTimeout(this._timer);
        }
        var onError = function () { return _this._addTimeout(); };
        transactions_1.fetchTransactions(this._base, this.address, 1)
            .then(function (_a) {
            var tx = _a[0];
            if (!tx) {
                _this._addTimeout();
                return null;
            }
            _this.getTransactionsInHeight(tx, 310)
                .then(function (list) {
                var _a;
                var hash = Watch._groupByHeight(list);
                var heightList = utils_1.keys(hash)
                    .map(Number)
                    .sort(function (a, b) { return b - a; });
                var last = heightList[0], prev = heightList[1];
                if (!_this._lastBlock.height) {
                    _this._lastBlock = {
                        height: last,
                        lastId: hash[prev] && hash[prev].length ? hash[prev][0].id : '',
                        transactions: hash[last]
                    };
                    _this._emitter.trigger('change-state', list);
                }
                else {
                    var wasDispatchHash = utils_1.indexBy(utils_1.prop('id'), _this._lastBlock.transactions);
                    var toDispatch = Watch._getTransactionsToDispatch(__spreadArrays(hash[last], (hash[prev] || [])), wasDispatchHash, _this._lastBlock.lastId);
                    if (_this._lastBlock.height !== last) {
                        _this._lastBlock = {
                            height: last,
                            lastId: hash[prev] && hash[prev].length ? hash[prev][0].id : '',
                            transactions: hash[last]
                        };
                    }
                    else {
                        (_a = _this._lastBlock.transactions).push.apply(_a, toDispatch);
                    }
                    if (toDispatch.length) {
                        _this._emitter.trigger('change-state', toDispatch);
                    }
                }
                _this._addTimeout();
            }, onError);
        })["catch"](onError);
    };
    Watch.prototype.getTransactionsInHeight = function (from, limit) {
        var _this = this;
        var height = from.height;
        var loop = function (downloaded) {
            if (downloaded.length >= limit) {
                return Promise.resolve(downloaded);
            }
            return transactions_1.fetchTransactions(_this._base, _this.address, downloaded.length + 100).then(function (list) {
                if (downloaded.length === list.length) {
                    return downloaded;
                }
                var hash = Watch._groupByHeight(list);
                var heightList = utils_1.keys(hash)
                    .map(Number)
                    .sort(function (a, b) { return b - a; });
                var last = heightList[0], prev = heightList[1];
                if (last === height) {
                    return prev ? __spreadArrays(hash[last], [hash[prev][0]]) : loop(list);
                }
                else {
                    return loop(list);
                }
            });
        };
        return loop([from]);
    };
    Watch.prototype._addTimeout = function () {
        var _this = this;
        this._timer = setTimeout(function () {
            _this._run();
        }, this._interval);
    };
    Watch._groupByHeight = function (list) {
        return list.reduce(function (hash, tx) {
            if (!hash[tx.height]) {
                hash[tx.height] = [tx];
            }
            else {
                hash[tx.height].push(tx);
            }
            return hash;
        }, Object.create(null));
    };
    Watch._getTransactionsToDispatch = function (list, dispatched, lastId) {
        var result = [];
        for (var i = 0; i < list.length; i++) {
            var tx = list[i];
            if (tx.id === lastId) {
                break;
            }
            if (!dispatched[tx.id]) {
                result.push(tx);
            }
        }
        return result;
    };
    return Watch;
}());
exports.Watch = Watch;
function default_1(base, address, interval) {
    return transactions_1.fetchTransactions(base, address, 1)
        .then(function (_a) {
        var tx = _a[0];
        return new Watch(base, address, tx, interval);
    });
}
exports["default"] = default_1;
//# sourceMappingURL=watch.js.map