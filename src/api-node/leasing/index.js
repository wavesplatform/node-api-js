"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(require("../../tools/request"));
/**
 * GET /leasing/active/{address}
 * Get all active leases for an address
 */
function fetchActive(base, address) {
    return request_1["default"]({ base: base, url: "/leasing/active/" + address });
}
exports.fetchActive = fetchActive;
//# sourceMappingURL=index.js.map