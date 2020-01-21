"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(require("../../tools/request"));
/**
 * GET /peers/all
 * Peer list
 */
function fetchAll(base) {
    return request_1["default"]({
        base: base,
        url: '/peers/all'
    });
}
exports.fetchAll = fetchAll;
/**
 * GET /peers/connected
 * Connected peers list
 */
function fetchConnected(base) {
    return request_1["default"]({
        base: base,
        url: '/peers/connected'
    });
}
exports.fetchConnected = fetchConnected;
/**
 * GET /peers/blacklisted
 * Blacklisted peers list
 */
function fetchBlackListed(base) {
    return request_1["default"]({
        base: base,
        url: '/peers/blacklisted'
    });
}
exports.fetchBlackListed = fetchBlackListed;
/**
 * GET /peers/suspended
 * Suspended peers list
 */
function fetchSuspended(base) {
    return request_1["default"]({
        base: base,
        url: '/peers/suspended'
    });
}
exports.fetchSuspended = fetchSuspended;
//# sourceMappingURL=index.js.map