"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var getNetworkByte_1 = __importDefault(require("./getNetworkByte"));
function default_1(base) {
    return getNetworkByte_1["default"](base).then(function (byte) { return String.fromCharCode(byte); });
}
exports["default"] = default_1;
//# sourceMappingURL=getNetworkCode.js.map