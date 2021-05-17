"use strict";
exports.__esModule = true;
var FIELDS = ['amount', 'matcherFee', 'price', 'fee', 'minSponsoredAssetFee', 'quantity', 'sellMatcherFee', 'buyMatcherFee'];
function default_1(data) {
    return JSON.stringify(data, function (key, value) {
        if (FIELDS.includes(key)) {
            return "!" + value + "!";
        }
        else if (key === 'value' && this['type'] === 'integer') {
            return "!" + value + "!";
        }
        else {
            return value;
        }
    }, 0).replace(/"\!(-?\d+)\!"/g, '$1');
}
exports["default"] = default_1;
//# sourceMappingURL=stringify.js.map