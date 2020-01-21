"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(require("../../tools/request"));
// @TODO: When correct API key
// POST /node/stop
function fetchNodeStatus(base) {
    return request_1["default"]({ base: base, url: '/node/status' });
}
exports.fetchNodeStatus = fetchNodeStatus;
function fetchNodeVersion(base) {
    return request_1["default"]({ base: base, url: '/node/version' });
}
exports.fetchNodeVersion = fetchNodeVersion;
//# sourceMappingURL=index.js.map