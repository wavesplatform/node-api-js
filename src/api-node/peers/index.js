"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchSuspended = exports.fetchBlackListed = exports.fetchConnected = exports.fetchAll = void 0;
var request_1 = __importDefault(require("../../tools/request"));
/**
 * GET /peers/all
 * Peer list
 */
function fetchAll(base, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: '/peers/all',
        options: options
    });
}
exports.fetchAll = fetchAll;
/**
 * GET /peers/connected
 * Connected peers list
 */
function fetchConnected(base, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: '/peers/connected',
        options: options
    });
}
exports.fetchConnected = fetchConnected;
/**
 * GET /peers/blacklisted
 * Blacklisted peers list
 */
function fetchBlackListed(base, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: '/peers/blacklisted',
        options: options
    });
}
exports.fetchBlackListed = fetchBlackListed;
/**
 * GET /peers/suspended
 * Suspended peers list
 */
function fetchSuspended(base, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: '/peers/suspended',
        options: options
    });
}
exports.fetchSuspended = fetchSuspended;
//# sourceMappingURL=index.js.map