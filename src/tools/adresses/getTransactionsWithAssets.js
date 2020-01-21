"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var transactions_1 = require("../../api-node/transactions");
var getAssetsByTransaction_1 = __importDefault(require("./getAssetsByTransaction"));
function default_1(base, address, limit, after) {
    return transactions_1.fetchTransactions(base, address, limit, after)
        .then(function (transactions) { return getAssetsByTransaction_1["default"](base, transactions).then(function (assets) { return ({ transactions: transactions, assets: assets }); }); });
}
exports["default"] = default_1;
//# sourceMappingURL=getTransactionsWithAssets.js.map