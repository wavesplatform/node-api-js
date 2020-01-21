"use strict";
exports.__esModule = true;
var reg = new RegExp('((?!\\\\)"\\w+"):\\s*(-?[\\d|\\.]{14,})', 'g');
function default_1(json) {
    return JSON.parse(json.replace(reg, "$1:\"$2\""));
}
exports["default"] = default_1;
//# sourceMappingURL=parse.js.map