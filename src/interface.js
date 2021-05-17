"use strict";
exports.__esModule = true;
exports.isCallableFuncRecordArguments = exports.isCallableFuncArrayArguments = void 0;
exports.isCallableFuncArrayArguments = function (scriptInfoMeta) {
    return !!scriptInfoMeta.isArrayArguments;
};
exports.isCallableFuncRecordArguments = function (scriptInfoMeta) {
    return !scriptInfoMeta.isArrayArguments;
};
//# sourceMappingURL=interface.js.map