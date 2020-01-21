"use strict";
exports.__esModule = true;
var utils_1 = require("../utils");
var transactions_1 = require("../../api-node/transactions");
var constants_1 = require("../../constants");
function default_1(base, tx, options) {
    var isOnce = !Array.isArray(tx);
    var start = Date.now();
    var confirmed = [];
    var confirmations = options && options.confirmations || 0;
    var maxWaitTime = options && options.maxWaitTime || 0;
    var requestInterval = options && options.requestInterval || 250;
    var waitTx = function (list) {
        return transactions_1.fetchStatus(base, list.map(utils_1.prop('id')))
            .then(function (status) {
            var hash = utils_1.indexBy(utils_1.prop('id'), status.statuses);
            var hasError = list.some(function (tx) { return hash[tx.id].status === constants_1.TRANSACTION_STATUSES.NOT_FOUND; });
            if (hasError) {
                throw new Error('One transaction is not in blockchain!');
            }
            var toRequest = list.filter(function (tx) {
                if (hash[tx.id].confirmations >= confirmations) {
                    confirmed.push(tx);
                    return false;
                }
                else {
                    return true;
                }
            });
            if (!toRequest.length) {
                return void 0;
            }
            if (maxWaitTime && Date.now() - start > maxWaitTime) {
                return Promise.reject('Timeout error!');
            }
            return utils_1.wait(requestInterval).then(function () { return waitTx(toRequest); });
        });
    };
    return waitTx(utils_1.toArray(tx)).then(function () { return isOnce ? utils_1.head(confirmed) : confirmed; });
}
exports["default"] = default_1;
//# sourceMappingURL=wait.js.map