"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchStateChangesByTxId = exports.fetchStateChangesByAddress = exports.fetchBalanceHistory = void 0;
var request_1 = __importDefault(require("../../tools/request"));
var query_1 = __importDefault(require("../../tools/query"));
/**
 * Waves balance history
 * @param base
 * @param address
 */
function fetchBalanceHistory(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/debug/balances/history/" + address,
        options: options
    });
}
exports.fetchBalanceHistory = fetchBalanceHistory;
/**
 * Get list of transactions with state changes where specified address has been involved
 * @param base
 * @param address
 * @param limit
 * @param after
 */
function fetchStateChangesByAddress(base, address, limit, after, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/debug/stateChanges/address/" + address + "/limit/" + limit + query_1["default"]({ after: after }),
        options: options
    });
}
exports.fetchStateChangesByAddress = fetchStateChangesByAddress;
/**
 * Get invokeScript transaction state changes
 * @param base
 * @param txId
 */
function fetchStateChangesByTxId(base, txId, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/debug/stateChanges/info/" + txId,
        options: options
    });
}
exports.fetchStateChangesByTxId = fetchStateChangesByTxId;
// @TODO need API key:
// GET /debug/stateWaves/{height}
// POST /debug/rollback
// DELETE /debug/rollback-to/{id}
// GET /debug/portfolios/{address}
// GET /debug/minerInfo
// GET /debug/historyInfo
// GET /debug/historyInfo
// GET /debug/info
// POST /debug/validate
// GET /debug/blocks/{howMany}
// POST /debug/blacklist
// POST /debug/print
// GET /debug/state
//# sourceMappingURL=index.js.map