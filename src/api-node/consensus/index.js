"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchBasetargetBlockId = exports.fetchGenerationSignatureBlockId = exports.fetchConsensusAlgo = exports.fetchBasetarget = exports.fetchGeneratingBalance = void 0;
var request_1 = __importDefault(require("../../tools/request"));
/**
 * GET /consensus/generatingbalance/{address}
 * Generating balance
 * @param base
 * @param address
 */
function fetchGeneratingBalance(base, address) {
    return request_1["default"]({ base: base, url: "/consensus/generatingbalance/" + address });
}
exports.fetchGeneratingBalance = fetchGeneratingBalance;
/**
 * GET /consensus/basetarget
 * Base target last
 * @param base
 */
function fetchBasetarget(base) {
    return request_1["default"]({ base: base, url: '/consensus/basetarget' });
}
exports.fetchBasetarget = fetchBasetarget;
/**
 * GET /consensus/algo
 * Consensus algo
 * @param base
 */
function fetchConsensusAlgo(base) {
    return request_1["default"]({ base: base, url: '/consensus/algo' });
}
exports.fetchConsensusAlgo = fetchConsensusAlgo;
/**
 * GET /consensus/generationsignature/{blockId}
 * Generation signature
 * @param base
 * @param blockId
 */
function fetchGenerationSignatureBlockId(base, blockId, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({ base: base, url: "/consensus/generationsignature/" + blockId, options: options });
}
exports.fetchGenerationSignatureBlockId = fetchGenerationSignatureBlockId;
/**
 * GET /consensus/basetarget/{blockId}
 * Base target
 * @param base
 * @param blockId
 */
function fetchBasetargetBlockId(base, blockId, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({ base: base, url: "/consensus/basetarget/" + blockId, options: options });
}
exports.fetchBasetargetBlockId = fetchBasetargetBlockId;
//# sourceMappingURL=index.js.map