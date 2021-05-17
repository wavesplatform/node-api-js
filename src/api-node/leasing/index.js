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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchLeasingInfo = exports.fetchActive = void 0;
var request_1 = __importDefault(require("../../tools/request"));
/**
 * GET /leasing/active/{address}
 * Get all active leases for an address
 */
function fetchActive(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({ base: base, url: "/leasing/active/" + address, options: options });
}
exports.fetchActive = fetchActive;
/**
 * GET /leasing/info/
 * Get lease transactions info.
 */
function fetchLeasingInfo(base, ids, options) {
    if (options === void 0) { options = Object.create(null); }
    var searchParams = new URLSearchParams(ids.reduce(function (acc, id) { return __spreadArrays(acc, [["id", id]]); }, []) || []);
    return request_1["default"]({ base: base, url: "/leasing/info/", options: __assign(__assign({}, options), { body: searchParams, method: 'POST', headers: {
                'Content-Type': 'application/json'
            } }) });
}
exports.fetchLeasingInfo = fetchLeasingInfo;
//# sourceMappingURL=index.js.map