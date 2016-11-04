"use strict";
var stringHelper_1 = require('./stringHelper');
var LocationHelper = (function () {
    function LocationHelper() {
    }
    LocationHelper.checkLocation = function (checkRoot) {
        var path = location.pathname.toLowerCase();
        if (path === "/" && checkRoot) {
            return true;
        }
        var locations = ["/login", "/register"];
        for (var i = 0; i < locations.length; i++) {
            if (stringHelper_1.StringHelper.startsWith(path, locations[i].toLowerCase())) {
                return true;
            }
        }
        return false;
    };
    return LocationHelper;
}());
exports.LocationHelper = LocationHelper;
