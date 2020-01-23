"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(require("../../tools/request"));
var utils_1 = require("../../tools/utils");
function fetchDetails(base, assetId) {
    var isOnce = !Array.isArray(assetId);
    return Promise.all(utils_1.toArray(assetId).map(function (id) { return request_1["default"]({ base: base, url: "/assets/details/" + id }); }))
        .then(function (list) { return isOnce ? list[0] : list; });
}
exports.fetchDetails = fetchDetails;
function fetchAssetDistribution(base, assetId, height, limit) {
    return request_1["default"]({ base: base, url: "/assets/" + assetId + "/distribution/" + height + "/limit/" + limit });
}
exports.fetchAssetDistribution = fetchAssetDistribution;
/**
 * TODO
 * GET /assets/{assetId}/distribution
 * Asset balance distribution
 */
function fetchAssetsAddressLimit(base, address, limit) {
    return request_1["default"]({ base: base, url: "assets/nft/" + address + "/limit/" + limit });
}
exports.fetchAssetsAddressLimit = fetchAssetsAddressLimit;
function fetchAssetsBalance(base, address) {
    return request_1["default"]({ base: base, url: "/assets/balance/" + address });
}
exports.fetchAssetsBalance = fetchAssetsBalance;
function fetchBalanceAddressAssetId(base, address, assetId) {
    return request_1["default"]({ base: base, url: "/assets/balance/" + address + "/" + assetId });
}
exports.fetchBalanceAddressAssetId = fetchBalanceAddressAssetId;
//# sourceMappingURL=index.js.map