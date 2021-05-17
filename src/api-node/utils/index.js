"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchNodeTime = exports.fetchSignPrivateKey = exports.fetchScriptDecompile = exports.fetchScriptMeta = exports.fetchHashFast = exports.fetchHashSecure = exports.fetchTransactionSerialize = exports.fetchEstimate = exports.fetchCompileWithImports = exports.fetchCompileCode = exports.fetchSeed = void 0;
var request_1 = __importDefault(require("../../tools/request"));
var stringify_1 = __importDefault(require("../../tools/stringify"));
/**
 * GET /utils/seed
 * Generate random seed
 */
function fetchSeed(base, length) {
    return request_1["default"]({
        base: base,
        url: "/utils/seed" + (length ? "/" + length : '')
    });
}
exports.fetchSeed = fetchSeed;
/**
 * POST /utils/script/compileCode
 * Compiles string code to base64 script representation
 */
function fetchCompileCode(base, body) {
    return request_1["default"]({
        base: base,
        url: '/utils/script/compileCode',
        options: {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.fetchCompileCode = fetchCompileCode;
/**
 * POST /utils/script/compileWithImports
 * Compiles string code with imports to base64 script representation
 */
function fetchCompileWithImports(base, body) {
    return request_1["default"]({
        base: base,
        url: '/utils/script/compileWithImports',
        options: {
            method: 'POST',
            body: stringify_1["default"](body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.fetchCompileWithImports = fetchCompileWithImports;
/**
 * POST /utils/script/estimate
 * Estimates compiled code in Base64 representation
 */
function fetchEstimate(base, body) {
    return request_1["default"]({
        base: base,
        url: '/utils/script/estimate',
        options: {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.fetchEstimate = fetchEstimate;
/**
 * POST /utils/transactionSerialize
 * Serialize transaction
 */
function fetchTransactionSerialize(base, body) {
    return request_1["default"]({
        base: base,
        url: '/utils/transactionSerialize',
        options: {
            method: 'POST',
            body: stringify_1["default"](body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.fetchTransactionSerialize = fetchTransactionSerialize;
/**
 * POST /utils/hash/secure
 * Return SecureCryptographicHash of specified message
 */
function fetchHashSecure(base, body) {
    return request_1["default"]({
        base: base,
        url: '/utils/hash/secure',
        options: {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.fetchHashSecure = fetchHashSecure;
/**
 * POST /utils/hash/fast
 * Return FastCryptographicHash of specified message
 */
function fetchHashFast(base, body) {
    return request_1["default"]({
        base: base,
        url: '/utils/hash/fast',
        options: {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.fetchHashFast = fetchHashFast;
/**
 * POST /utils/script/meta
 * Account's script meta
 */
function fetchScriptMeta(base, body) {
    return request_1["default"]({
        base: base,
        url: '/utils/script/meta',
        options: {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.fetchScriptMeta = fetchScriptMeta;
/**
 * POST /utils/script/decompile
 * Decompiles base64 script representation to string code
 */
function fetchScriptDecompile(base, body) {
    return request_1["default"]({
        base: base,
        url: '/utils/script/decompile',
        options: {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.fetchScriptDecompile = fetchScriptDecompile;
/**
 * POST /utils/sign/{privateKey}
 * Return FastCryptographicHash of specified message
 */
function fetchSignPrivateKey(base, privateKey, body) {
    return request_1["default"]({
        base: base,
        url: "/utils/sign/" + privateKey,
        options: {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.fetchSignPrivateKey = fetchSignPrivateKey;
/**
 * GET /utils/time
 * Current Node time (UTC)
 */
function fetchNodeTime(base) {
    return request_1["default"]({
        base: base,
        url: '/utils/time'
    });
}
exports.fetchNodeTime = fetchNodeTime;
//# sourceMappingURL=index.js.map