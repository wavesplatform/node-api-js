"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var assets_1 = require("../../api-node/assets");
var getAssetIdListByTx_1 = __importDefault(require("./getAssetIdListByTx"));
var utils_1 = require("../utils");
function default_1(base, tx) {
    return assets_1.fetchDetails(base, getAssetIdListByTx_1["default"](tx))
        .then(function (list) { return utils_1.indexBy(utils_1.prop('assetId'), list); });
}
exports["default"] = default_1;
//# sourceMappingURL=getAssetsByTransaction.js.map