"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(require("../../tools/request"));
function fetchByAlias(base, alias) {
    return request_1["default"]({
        base: base,
        url: "/alias/by-alias/" + alias
    });
}
exports.fetchByAlias = fetchByAlias;
function fetchByAddress(base, address) {
    return request_1["default"]({
        base: base,
        url: "/alias/by-address/" + address
    });
}
exports.fetchByAddress = fetchByAddress;
//# sourceMappingURL=index.js.map