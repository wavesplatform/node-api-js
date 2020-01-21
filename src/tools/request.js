"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var resolve_1 = __importDefault(require("./resolve"));
var parse_1 = __importDefault(require("./parse"));
var request = typeof fetch === 'function' ? fetch : require('node-fetch');
function default_1(params) {
    return request(resolve_1["default"](params.url, params.base), updateHeaders(params.options))
        .then(parseResponse);
}
exports["default"] = default_1;
function parseResponse(r) {
    return r.text().then(function (message) { return r.ok ? parse_1["default"](message) : Promise.reject(tryParse(message)); });
}
function tryParse(message) {
    try {
        return JSON.parse(message);
    }
    catch (e) {
        return message;
    }
}
function updateHeaders(options) {
    if (options === void 0) { options = Object.create(null); }
    options.credentials = 'include';
    return options;
}
//# sourceMappingURL=request.js.map