var INFO_CONTROLLER_NAME = "info";

class InfoActions {
    getCountries() {
        var defer = $.Deferred();

        ajax.get(INFO_CONTROLLER_NAME, 'GetCountries', null, true, function (countries) {
            defer.resolve(countries)
        });

        return defer.promise();
    }

    getCities(country) {
        var defer = $.Deferred();

        ajax.get(INFO_CONTROLLER_NAME, 'GetCities', { country: country }, true, function (cities) {
            defer.resolve(cities)
        });

        return defer.promise();
    }
}