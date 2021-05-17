"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchByAddress = exports.fetchByAlias = void 0;
var request_1 = __importDefault(require("../../tools/request"));
function fetchByAlias(base, alias, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/alias/by-alias/" + alias,
        options: options
    });
}
exports.fetchByAlias = fetchByAlias;
function fetchByAddress(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: "/alias/by-address/" + address,
        options: options
    });
}
exports.fetchByAddress = fetchByAddress;
//# sourceMappingURL=index.js.map