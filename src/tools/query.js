"use strict";
exports.__esModule = true;
function default_1(params, evolver) {
    if (evolver === void 0) { evolver = Object.create(null); }
    var query = Object.keys(params)
        .map(function (key) { return [key, params[key]]; })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return [key, Object.prototype.hasOwnProperty.call(evolver, key) ? evolver[key](value) : value];
    })
        .filter(function (_a) {
        var key = _a[0], value = _a[1];
        return value != null;
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return key + "=" + value;
    })
        .join('&');
    return query.length ? "?" + query : '';
}
exports["default"] = default_1;
;
//# sourceMappingURL=query.js.map