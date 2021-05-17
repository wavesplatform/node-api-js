"use strict";
exports.__esModule = true;
var bignumber_1 = require("@waves/bignumber");
var assets_1 = require("../../api-node/assets");
var utils_1 = require("../utils");
function default_1(base, address, wavesFee) {
    return assets_1.fetchAssetsBalance(base, address).then(utils_1.pipe(utils_1.prop('balances'), utils_1.filter(canBeSponsor(wavesFee)), utils_1.map(currentFee(wavesFee))));
}
exports["default"] = default_1;
function canBeSponsor(wavesFee) {
    return function (balance) { return (balance.minSponsoredAssetFee
        && bignumber_1.BigNumber.toBigNumber(balance.sponsorBalance || 0)
            .gte(wavesFee)
        && bignumber_1.BigNumber.toBigNumber(wavesFee)
            .div(0.001 * Math.pow(10, 8))
            .mul(balance.minSponsoredAssetFee)
            .lte(balance.balance)) || false; };
}
function currentFee(wavesFee) {
    var count = bignumber_1.BigNumber.toBigNumber(wavesFee)
        .div(0.001 * Math.pow(10, 8));
    return function (balance) { return ({
        assetId: balance.assetId,
        wavesFee: wavesFee,
        assetFee: bignumber_1.BigNumber.toBigNumber(balance.minSponsoredAssetFee)
            .mul(count)
            .toFixed()
    }); };
}
//# sourceMappingURL=availableSponsoredBalances.js.map