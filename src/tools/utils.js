"use strict";
exports.__esModule = true;
function toArray(data) {
    return Array.isArray(data) ? data : [data];
}
exports.toArray = toArray;
function head(data) {
    return data[0];
}
exports.head = head;
function wait(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
exports.wait = wait;
function prop(key) {
    return function (data) { return data[key]; };
}
exports.prop = prop;
exports.keys = function (obj) {
    return Object.keys(obj);
};
exports.entries = function (obj) {
    return exports.keys(obj).map(function (name) { return [name, obj[name]]; });
};
exports.values = function (obj) {
    return exports.keys(obj).map(function (key) { return obj[key]; });
};
exports.assign = function (target, merge) {
    return exports.entries(merge).reduce(function (acc, _a) {
        var key = _a[0], value = _a[1];
        target[key] = value;
        return target;
    }, target);
};
function map(process) {
    return function (list) { return list.map(process); };
}
exports.map = map;
function filter(process) {
    return function (list) { return list.filter(process); };
}
exports.filter = filter;
function indexBy(process, data) {
    return data.reduce(function (acc, item) {
        acc[process(item)] = item;
        return acc;
    }, {});
}
exports.indexBy = indexBy;
exports.uniq = function (list) {
    return exports.keys(list.reduce(function (acc, item) {
        acc[item] = item;
        return acc;
    }, Object.create(null)));
};
function switchTransactionByType(choices) {
    return function (tx) { return choices[tx.type] && typeof choices[tx.type] === 'function' ? choices[tx.type](tx) : undefined; };
}
exports.switchTransactionByType = switchTransactionByType;
exports.pipe = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (data) { return args.reduce(function (acc, item) { return item(acc); }, data); };
};
//# sourceMappingURL=utils.js.map