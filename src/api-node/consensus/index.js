"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
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
function fetchGenerationSignatureBlockId(base, blockId) {
    return request_1["default"]({ base: base, url: "/consensus/generationsignature/" + blockId });
}
exports.fetchGenerationSignatureBlockId = fetchGenerationSignatureBlockId;
/**
 * GET /consensus/basetarget/{blockId}
 * Base target
 * @param base
 * @param blockId
 */
function fetchBasetargetBlockId(base, blockId) {
    return request_1["default"]({ base: base, url: "/consensus/basetarget/" + blockId });
}
exports.fetchBasetargetBlockId = fetchBasetargetBlockId;
/**
 * GET /consensus/generationsignature
 * Generation signature last
 * @param base
 */
function fetchGenerationSignature(base) {
    return request_1["default"]({ base: base, url: '/consensus/generationsignature' });
}
exports.fetchGenerationSignature = fetchGenerationSignature;
//# sourceMappingURL=index.js.map