"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchActivationStatus = void 0;
var request_1 = __importDefault(require("../../tools/request"));
/**
 * GET /activation/status
 * Status
 * @param base
 */
function fetchActivationStatus(base, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: 'activation/status',
        options: options
    });
}
exports.fetchActivationStatus = fetchActivationStatus;
//# sourceMappingURL=index.js.map