"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(require("../../tools/request"));
/**
 * GET /activation/status
 * Status
 * @param base
 */
function fetchActivationStatus(base) {
    return request_1["default"]({ base: base, url: 'activation/status' });
}
exports.fetchActivationStatus = fetchActivationStatus;
//# sourceMappingURL=index.js.map