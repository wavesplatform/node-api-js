"use strict";
exports.__esModule = true;
var blocks_1 = require("../../api-node/blocks");
function default_1(base) {
    return blocks_1.fetchHeadersLast(base).then(function (header) {
        var firstHeight = Math.max(2, header.height - 1000);
        return blocks_1.fetchHeadersAt(base, firstHeight)
            .then(function (oldHeader) { return Math.floor((header.timestamp - oldHeader.timestamp) / (header.height - firstHeight)); });
    });
}
exports["default"] = default_1;
//# sourceMappingURL=detectInterval.js.map