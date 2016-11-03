"use strict";
var Checker = (function () {
    function Checker() {
    }
    Checker.getProperValueObj = function (obj, fieldName) {
        if (obj) {
            return obj[fieldName];
        }
        return "";
    };
    Checker.getProperValue = function (value) {
        if (value) {
            return value;
        }
        return '';
    };
    Checker.checkDropDownValue = function (value) {
        if (value == -1) {
            return null;
        }
        return value;
    };
    return Checker;
}());
exports.Checker = Checker;
