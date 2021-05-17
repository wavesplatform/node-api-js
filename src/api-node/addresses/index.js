"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchAddresses = exports.fetchPublicKey = exports.fetchSeed = exports.fetchSeq = exports.fetchEffectiveBalance = exports.fetchEffectiveBalanceConfirmations = exports.fetchBalance = exports.fetchValidate = exports.data = exports.fetchScriptInfo = exports.fetchBalanceConfirmations = exports.fetchBalanceDetails = exports.fetchScriptInfoMeta = exports.fetchDataKey = void 0;
var request_1 = __importDefault(require("../../tools/request"));
var query_1 = __importDefault(require("../../tools/query"));
function fetchDataKey(base, address, key, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/data/" + address + "/" + encodeURIComponent(key),
        options: options
    });
}
exports.fetchDataKey = fetchDataKey;
function fetchScriptInfoMeta(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/scriptInfo/" + address + "/meta",
        options: options
    });
}
exports.fetchScriptInfoMeta = fetchScriptInfoMeta;
function fetchBalanceDetails(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/balance/details/" + address,
        options: options
    });
}
exports.fetchBalanceDetails = fetchBalanceDetails;
function fetchBalanceConfirmations(base, address, confirmations, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/balance/" + address + "/" + confirmations,
        options: options
    });
}
exports.fetchBalanceConfirmations = fetchBalanceConfirmations;
function fetchScriptInfo(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/scriptInfo/" + address,
        options: options
    });
}
exports.fetchScriptInfo = fetchScriptInfo;
function data(base, address, params, options) {
    if (params === void 0) { params = Object.create(null); }
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/data/" + address + query_1["default"](params),
        options: options
    });
}
exports.data = data;
function fetchValidate(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/validate/" + address,
        options: options
    });
}
exports.fetchValidate = fetchValidate;
function fetchBalance(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/balance/" + address,
        options: options
    });
}
exports.fetchBalance = fetchBalance;
function fetchEffectiveBalanceConfirmations(base, address, confirmations, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/effectiveBalance/" + address + "/" + confirmations,
        options: options
    });
}
exports.fetchEffectiveBalanceConfirmations = fetchEffectiveBalanceConfirmations;
function fetchEffectiveBalance(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/effectiveBalance/" + address,
        options: options
    });
}
exports.fetchEffectiveBalance = fetchEffectiveBalance;
function fetchSeq(base, from, to, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/seq/" + from + "/" + to,
        options: options
    });
}
exports.fetchSeq = fetchSeq;
function fetchSeed(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/seed/" + address,
        options: options
    });
}
exports.fetchSeed = fetchSeed;
function fetchPublicKey(base, publicKey, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/publicKey/" + publicKey,
        options: options
    });
}
exports.fetchPublicKey = fetchPublicKey;
function fetchAddresses(base, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: '/addresses',
        options: options
    });
}
exports.fetchAddresses = fetchAddresses;
//# sourceMappingURL=index.js.map