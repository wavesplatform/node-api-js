"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(require("../../tools/request"));
var query_1 = __importDefault(require("../../tools/query"));
function fetchDataKey(base, address, key, options) {
    return request_1["default"]({
        base: base,
        url: "/addresses/data/" + address + "/" + encodeURIComponent(key)
    });
}
exports.fetchDataKey = fetchDataKey;
function fetchScriptInfoMeta(base, address, options) {
    return request_1["default"]({
        base: base,
        url: "/addresses/scriptInfo/" + address + "/meta"
    });
}
exports.fetchScriptInfoMeta = fetchScriptInfoMeta;
function fetchBalanceDetails(base, address, options) {
    return request_1["default"]({
        base: base,
        url: "/addresses/balance/details/" + address
    });
}
exports.fetchBalanceDetails = fetchBalanceDetails;
function fetchBalanceConfirmations(base, address, confirmations, options) {
    return request_1["default"]({
        base: base,
        url: "/addresses/balance/" + address + "/" + confirmations
    });
}
exports.fetchBalanceConfirmations = fetchBalanceConfirmations;
function fetchScriptInfo(base, address, options) {
    return request_1["default"]({
        base: base,
        url: "/addresses/scriptInfo/" + address
    });
}
exports.fetchScriptInfo = fetchScriptInfo;
function data(base, address, params, options) {
    if (params === void 0) { params = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/addresses/data/" + address + query_1["default"](params)
    });
}
exports.data = data;
function fetchValidate(base, address, options) {
    return request_1["default"]({ base: base, url: "/addresses/validate/" + address });
}
exports.fetchValidate = fetchValidate;
function fetchBalance(base, address, options) {
    return request_1["default"]({ base: base, url: "/addresses/balance/" + address });
}
exports.fetchBalance = fetchBalance;
function fetchEffectiveBalanceConfirmations(base, address, confirmations) {
    return request_1["default"]({
        base: base,
        url: "/addresses/effectiveBalance/" + address + "/" + confirmations
    });
}
exports.fetchEffectiveBalanceConfirmations = fetchEffectiveBalanceConfirmations;
function fetchEffectiveBalance(base, address) {
    return request_1["default"]({
        base: base,
        url: "/addresses/effectiveBalance/" + address
    });
}
exports.fetchEffectiveBalance = fetchEffectiveBalance;
function fetchSeq(base, from, to) {
    return request_1["default"]({
        base: base,
        url: "/addresses/seq/" + from + "/" + to
    });
}
exports.fetchSeq = fetchSeq;
function fetchSeed(base, address) {
    return request_1["default"]({
        base: base,
        url: "/addresses/seed/" + address
    });
}
exports.fetchSeed = fetchSeed;
function fetchPublicKey(base, publicKey) {
    return request_1["default"]({
        base: base,
        url: "/addresses/publicKey/" + publicKey
    });
}
exports.fetchPublicKey = fetchPublicKey;
function fetchAddresses(base) {
    return request_1["default"]({
        base: base,
        url: '/addresses'
    });
}
exports.fetchAddresses = fetchAddresses;
//# sourceMappingURL=index.js.map