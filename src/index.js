"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var addressesModule = __importStar(require("./api-node/addresses"));
var blocksModule = __importStar(require("./api-node/blocks"));
var transactionsModule = __importStar(require("./api-node/transactions"));
var leasingModule = __importStar(require("./api-node/leasing"));
var peersModule = __importStar(require("./api-node/peers"));
var rewardsModule = __importStar(require("./api-node/rewards"));
var utilsModule = __importStar(require("./api-node/utils"));
var debugModule = __importStar(require("./api-node/debug"));
var aliasModule = __importStar(require("./api-node/alias"));
var consensusModule = __importStar(require("./api-node/consensus"));
var activationModule = __importStar(require("./api-node/activation"));
var nodeModule = __importStar(require("./api-node/node"));
var assetsModule = __importStar(require("./api-node/assets"));
var query_1 = __importDefault(require("./tools/query"));
var resolve_1 = __importDefault(require("./tools/resolve"));
var request_1 = __importDefault(require("./tools/request"));
var broadcast_1 = __importDefault(require("./tools/transactions/broadcast"));
var getAssetsByTransaction_1 = __importDefault(require("./tools/adresses/getAssetsByTransaction"));
var getAssetIdListByTx_1 = __importDefault(require("./tools/adresses/getAssetIdListByTx"));
var getTransactionsWithAssets_1 = __importDefault(require("./tools/adresses/getTransactionsWithAssets"));
var availableSponsoredBalances_1 = __importDefault(require("./tools/adresses/availableSponsoredBalances"));
var wait_1 = __importDefault(require("./tools/transactions/wait"));
var parse_1 = __importDefault(require("./tools/parse"));
var getNetworkByte_1 = __importDefault(require("./tools/blocks/getNetworkByte"));
var getNetworkCode_1 = __importDefault(require("./tools/blocks/getNetworkCode"));
var watch_1 = __importDefault(require("./tools/adresses/watch"));
var toolsUtilsModule = __importStar(require("./tools/utils"));
function create(base) {
    var addresses = wrapRecord(base, addressesModule);
    var blocks = wrapRecord(base, blocksModule);
    var transactions = wrapRecord(base, transactionsModule);
    var leasing = wrapRecord(base, leasingModule);
    var peers = wrapRecord(base, peersModule);
    var rewards = wrapRecord(base, rewardsModule);
    var utils = wrapRecord(base, utilsModule);
    var debug = wrapRecord(base, debugModule);
    var alias = wrapRecord(base, aliasModule);
    var consensus = wrapRecord(base, consensusModule);
    var activation = wrapRecord(base, activationModule);
    var node = wrapRecord(base, nodeModule);
    var assets = wrapRecord(base, assetsModule);
    var tools = {
        transactions: {
            broadcast: wrapRequest(base, broadcast_1["default"]),
            wait: wrapRequest(base, wait_1["default"])
        },
        blocks: {
            getNetworkByte: wrapRequest(base, getNetworkByte_1["default"]),
            getNetworkCode: wrapRequest(base, getNetworkCode_1["default"])
        },
        addresses: {
            createWatch: wrapRequest(base, watch_1["default"]),
            getAssetsByTransaction: wrapRequest(base, getAssetsByTransaction_1["default"]),
            getAssetIdListByTx: getAssetIdListByTx_1["default"],
            getTransactionsWithAssets: wrapRequest(base, getTransactionsWithAssets_1["default"]),
            availableSponsoredBalances: wrapRequest(base, availableSponsoredBalances_1["default"])
        },
        utils: toolsUtilsModule,
        query: query_1["default"],
        resolve: resolve_1["default"],
        request: request_1["default"],
        parse: parse_1["default"]
    };
    return {
        addresses: addresses,
        blocks: blocks,
        transactions: transactions,
        leasing: leasing,
        tools: tools,
        peers: peers,
        rewards: rewards,
        utils: utils,
        debug: debug,
        alias: alias,
        consensus: consensus,
        activation: activation,
        node: node,
        assets: assets
    };
}
exports.create = create;
exports["default"] = create;
function wrapRecord(base, hash) {
    return Object.keys(hash).reduce(function (acc, methodName) {
        acc[methodName] = wrapRequest(base, hash[methodName]);
        return acc;
    }, {});
}
function wrapRequest(base, callback) {
    return callback.bind(null, base);
}
//# sourceMappingURL=index.js.map