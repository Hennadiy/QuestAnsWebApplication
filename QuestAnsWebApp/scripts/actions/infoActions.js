var ajax = require('../ajax');
var $ = require('jquery');

var INFO_CONTROLLER_NAME = "info";

class InfoActions {
    getCountries() {
        var defer = $.Deferred();

        ajax.get(INFO_CONTROLLER_NAME, 'GetCountries', null, true, function (countries) {
            defer.resolve(countries)
        });

        return defer.promise();
    }

    getCities(countryId) {
        var defer = $.Deferred();

        ajax.get(INFO_CONTROLLER_NAME, 'GetCities', { countryId: countryId }, true, function (cities) {
            defer.resolve(cities)
        });

        return defer.promise();
    }
}

module.exports = new InfoActions();