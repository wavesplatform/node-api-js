"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
exports.__esModule = true;
var utils_1 = require("../utils");
var constants_1 = require("../../constants");
var getAssetIdList = utils_1.switchTransactionByType((_a = {},
    _a[constants_1.NAME_MAP.transfer] = function (tx) { return [tx.assetId, tx.feeAssetId]; },
    _a[constants_1.NAME_MAP.burn] = function (tx) { return [tx.assetId]; },
    _a[constants_1.NAME_MAP.reissue] = function (tx) { return [tx.assetId]; },
    _a[constants_1.NAME_MAP.exchange] = function (tx) {
        var assetIdList = [tx.order1.assetPair.amountAsset, tx.order1.assetPair.priceAsset];
        'matcherFeeAssetId' in tx.order1 && assetIdList.push(tx.order1.matcherFeeAssetId);
        'matcherFeeAssetId' in tx.order2 && assetIdList.push(tx.order2.matcherFeeAssetId);
        return assetIdList;
    },
    _a[constants_1.NAME_MAP.massTransfer] = function (tx) { return [tx.assetId]; },
    _a[constants_1.NAME_MAP.setAssetScript] = function (tx) { return [tx.assetId]; },
    _a[constants_1.NAME_MAP.sponsorship] = function (tx) { return [tx.assetId]; },
    _a[constants_1.NAME_MAP.invoke] = function (tx) { return __spreadArrays((tx.payment || []).map(utils_1.prop('assetId')), [tx.feeAssetId]); },
    _a));
function default_1(tx) {
    var idList = utils_1.toArray(tx).reduce(function (acc, tx) { return acc.concat(getAssetIdList(tx) || []); }, []);
    return utils_1.pipe(utils_1.filter(Boolean), utils_1.uniq)(idList);
}
exports["default"] = default_1;
//# sourceMappingURL=getAssetIdListByTx.js.map