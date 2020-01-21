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
var constants_1 = require("../../constants");
var blocks_1 = require("../blocks");
var request_1 = __importDefault(require("../../tools/request"));
var query_1 = __importDefault(require("../../tools/query"));
var stringify_1 = __importDefault(require("../../tools/stringify"));
/**
 * GET /transactions/unconfirmed/size
 * Number of unconfirmed transactions
 */
function fetchUnconfirmedSize(base) {
    return request_1["default"]({
        base: base,
        url: '/transactions/unconfirmed/size'
    });
}
exports.fetchUnconfirmedSize = fetchUnconfirmedSize;
// @TODO: when correct API key is received
/**
 * POST /transactions/sign/{signerAddress}
 * Sign a transaction with a non-default private key
 */
/**
* POST /transactions/calculateFee
* Calculate transaction fee
*/
function fetchCalculateFee(base, tx) {
    return request_1["default"]({
        base: base,
        url: '/transactions/calculateFee',
        options: {
            method: 'POST',
            body: stringify_1["default"](tx),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.fetchCalculateFee = fetchCalculateFee;
/**
 * GET /transactions/unconfirmed
 * Unconfirmed transactions
 */
function fetchUnconfirmed(base) {
    return request_1["default"]({
        base: base,
        url: '/transactions/unconfirmed'
    });
}
exports.fetchUnconfirmed = fetchUnconfirmed;
/**
 * Список транзакций по адресу
 * @param address
 * @param limit      максимальное количество транзакций в результате
 * @param after      искать транзакции после ID указанного в after
 * @param retry      количество попыток на выполнение запроса
 */
function fetchTransactions(base, address, limit, after, retry) {
    return request_1["default"]({
        base: base,
        url: "/transactions/address/" + address + "/limit/" + limit + query_1["default"]({ after: after })
    }).then(function (_a) {
        var list = _a[0];
        return list;
    });
}
exports.fetchTransactions = fetchTransactions;
/**
 * GET /transactions/unconfirmed/info/{id}
 * Unconfirmed transaction info
 */
function fetchUnconfirmedInfo(base, id) {
    return request_1["default"]({
        base: base,
        url: "/transactions/unconfirmed/info/" + id
    });
}
exports.fetchUnconfirmedInfo = fetchUnconfirmedInfo;
// @TODO when correct API key is received
/**
 * POST /transactions/sign
 * Sign a transaction
 */
/**
 * GET /transactions/info/{id}
 * Transaction info
 */
function fetchInfo(base, id) {
    return request_1["default"]({ base: base, url: "/transactions/info/" + id });
}
exports.fetchInfo = fetchInfo;
function fetchStatus(base, list) {
    var DEFAULT_STATUS = {
        id: '',
        confirmations: -1,
        height: -1,
        inUTX: false,
        status: constants_1.TRANSACTION_STATUSES.NOT_FOUND
    };
    var loadAllTxInfo = list.map(function (id) {
        return fetchUnconfirmedInfo(base, id)
            .then(function () { return (__assign(__assign({}, DEFAULT_STATUS), { id: id, status: constants_1.TRANSACTION_STATUSES.UNCONFIRMED, inUTX: true })); })["catch"](function () { return fetchInfo(base, id)
            .then(function (tx) { return (__assign(__assign({}, DEFAULT_STATUS), { id: id, status: constants_1.TRANSACTION_STATUSES.IN_BLOCKCHAIN, height: tx.height })); }); })["catch"](function () { return (__assign(__assign({}, DEFAULT_STATUS), { id: id })); });
    });
    return Promise.all([
        blocks_1.fetchHeight(base),
        Promise.all(loadAllTxInfo)
    ]).then(function (_a) {
        var height = _a[0].height, statuses = _a[1];
        return ({
            height: height,
            statuses: statuses.map(function (item) { return (__assign(__assign({}, item), { confirmations: item.status === constants_1.TRANSACTION_STATUSES.IN_BLOCKCHAIN ? height - item.height : item.confirmations })); })
        });
    });
}
exports.fetchStatus = fetchStatus;
function broadcast(base, tx) {
    return request_1["default"]({
        base: base, url: '/transactions/broadcast',
        options: {
            method: 'POST',
            body: stringify_1["default"](tx),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.broadcast = broadcast;
//# sourceMappingURL=index.js.map