"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchBalanceAddressAssetId = exports.fetchAssetsBalance = exports.fetchAssetsAddressLimit = exports.fetchAssetDistribution = exports.fetchAssetsDetails = exports.fetchDetails = void 0;
var ts_types_1 = require("@waves/ts-types");
var request_1 = __importDefault(require("../../tools/request"));
var utils_1 = require("../../tools/utils");
function fetchDetails(base, assetId, options) {
    if (options === void 0) { options = Object.create(null); }
    var isOnce = !Array.isArray(assetId);
    return Promise.all(utils_1.toArray(assetId).map(function (id) { return request_1["default"]({
        base: base,
        url: "/assets/details/" + id,
        options: options
    }); }))
        .then(function (list) { return isOnce ? list[0] : list; });
}
exports.fetchDetails = fetchDetails;
/**
 * GET /assets/details
 * Provides detailed information about the given assets
 */
function fetchAssetsDetails(base, assetIds, options) {
    if (options === void 0) { options = Object.create(null); }
    var params = assetIds
        .map(function (assetId) { return "id=" + assetId; })
        .join('&');
    var query = assetIds.length ? "?" + params : '';
    return request_1["default"]({ base: base, url: "/assets/details" + query, options: options });
}
exports.fetchAssetsDetails = fetchAssetsDetails;
function fetchAssetDistribution(base, assetId, height, limit, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({ base: base, url: "/assets/" + assetId + "/distribution/" + height + "/limit/" + limit, options: options });
}
exports.fetchAssetDistribution = fetchAssetDistribution;
/**
 * TODO
 * GET /assets/{assetId}/distribution
 * Asset balance distribution
 */
function fetchAssetsAddressLimit(base, address, limit, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({ base: base, url: "assets/nft/" + address + "/limit/" + limit, options: options });
}
exports.fetchAssetsAddressLimit = fetchAssetsAddressLimit;
function fetchAssetsBalance(base, address, options) {
    if (options === void 0) { options = Object.create(null); }
    return __awaiter(this, void 0, void 0, function () {
        var balancesResponse, assetsWithoutIssueTransaction, assetsDetailsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request_1["default"]({ base: base, url: "/assets/balance/" + address, options: options })];
                case 1:
                    balancesResponse = _a.sent();
                    assetsWithoutIssueTransaction = balancesResponse.balances.reduce(function (acc, balance, index) {
                        if (!balance.issueTransaction) {
                            acc[balance.assetId] = index;
                        }
                        return acc;
                    }, {});
                    return [4 /*yield*/, fetchAssetsDetails(base, Object.keys(assetsWithoutIssueTransaction), options)];
                case 2:
                    assetsDetailsResponse = _a.sent();
                    assetsDetailsResponse.forEach(function (assetDetails) {
                        if ('error' in assetDetails) {
                            return;
                        }
                        var assetIndex = assetsWithoutIssueTransaction[assetDetails.assetId];
                        var assetBalance = balancesResponse.balances[assetIndex];
                        if (!assetBalance) {
                            return;
                        }
                        assetBalance.issueTransaction = {
                            id: assetDetails.originTransactionId,
                            name: assetDetails.name,
                            decimals: assetDetails.decimals,
                            description: assetDetails.description,
                            quantity: assetDetails.quantity,
                            reissuable: assetDetails.reissuable,
                            sender: assetDetails.issuer,
                            senderPublicKey: assetDetails.issuerPublicKey,
                            timestamp: assetDetails.issueTimestamp,
                            height: assetDetails.issueHeight,
                            script: assetDetails.scripted ? '-' : null,
                            proofs: [],
                            fee: Math.pow(10, 8),
                            feeAssetId: null,
                            version: 3,
                            type: ts_types_1.TRANSACTION_TYPE.ISSUE,
                            chainId: 0
                        };
                    });
                    return [2 /*return*/, balancesResponse];
            }
        });
    });
}
exports.fetchAssetsBalance = fetchAssetsBalance;
function fetchBalanceAddressAssetId(base, address, assetId, options) {
    if (options === void 0) { options = Object.create(null); }
    return request_1["default"]({ base: base, url: "/assets/balance/" + address + "/" + assetId, options: options });
}
exports.fetchBalanceAddressAssetId = fetchBalanceAddressAssetId;
//# sourceMappingURL=index.js.map