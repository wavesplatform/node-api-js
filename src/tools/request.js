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
var resolve_1 = __importDefault(require("./resolve"));
var parse_1 = __importDefault(require("./parse"));
var request = typeof fetch === 'function' ? fetch : require('node-fetch');
function default_1(params) {
    console.log(params.url);
    console.log(params.base);
    console.log(resolve_1["default"](params.url, params.base));
    console.log(params.options);
    console.log(updateHeaders(params.options));
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
    return __assign({ credentials: 'include' }, options);
}
//# sourceMappingURL=request.js.map