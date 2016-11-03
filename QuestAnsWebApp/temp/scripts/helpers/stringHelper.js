"use strict";
var StringHelper = (function () {
    function StringHelper() {
    }
    StringHelper.startsWith = function (str, search) {
        return str.substr(0, search.length) === search;
    };
    return StringHelper;
}());
exports.StringHelper = StringHelper;
