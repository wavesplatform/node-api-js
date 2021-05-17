"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchRewards = void 0;
var request_1 = __importDefault(require("../../tools/request"));
/**
 * GET /blockchain/rewards
 * Current reward status
 */
function fetchRewards(base, height, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({
        base: base,
        url: height ? "/blockchain/rewards/" + height : '/blockchain/rewards',
        options: options
    });
}
exports.fetchRewards = fetchRewards;
//# sourceMappingURL=index.js.map