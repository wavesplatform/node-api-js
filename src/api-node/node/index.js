"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchNodeVersion = exports.fetchNodeStatus = void 0;
var request_1 = __importDefault(require("../../tools/request"));
// @TODO: When correct API key
// POST /node/stop
function fetchNodeStatus(base, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({ base: base, url: '/node/status', options: options });
}
exports.fetchNodeStatus = fetchNodeStatus;
function fetchNodeVersion(base, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({ base: base, url: '/node/version', options: options });
}
exports.fetchNodeVersion = fetchNodeVersion;
//# sourceMappingURL=index.js.map