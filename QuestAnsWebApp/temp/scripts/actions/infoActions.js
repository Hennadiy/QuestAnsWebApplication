"use strict";
var ajax_1 = require('../ajax');
var $ = require('jquery');
var InfoActions = (function () {
    function InfoActions() {
        this.INFO_CONTROLLER_NAME = "info";
    }
    InfoActions.prototype.getCountries = function () {
        var defer = $.Deferred();
        ajax_1.ajax.get(this.INFO_CONTROLLER_NAME, 'GetCountries', null, true, function (countries) {
            defer.resolve(countries);
        }, null);
        return defer.promise();
    };
    InfoActions.prototype.getCities = function (countryId) {
        var defer = $.Deferred();
        ajax_1.ajax.get(this.INFO_CONTROLLER_NAME, 'GetCities', { countryId: countryId }, true, function (cities) {
            defer.resolve(cities);
        }, null);
        return defer.promise();
    };
    return InfoActions;
}());
exports.InfoActions = InfoActions;
exports.infoActions = new InfoActions();
