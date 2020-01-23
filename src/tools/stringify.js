"use strict";
exports.__esModule = true;
var FIELDS = ['value', 'amount', 'matcherFee', 'price', 'fee', 'minSponsoredAssetFee', 'quantity', 'sellMatcherFee', 'buyMatcherFee'];
var reg = new RegExp("(?!\\\\)\"(" + FIELDS.join('|') + ")\":\\s*\"(-?\\d+)\"", 'g');
function default_1(data) {
    return JSON.stringify(data).replace(reg, '"$1":$2');
}
exports["default"] = default_1;
//# sourceMappingURL=stringify.js.map