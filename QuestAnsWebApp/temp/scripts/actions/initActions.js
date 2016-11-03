"use strict";
var stringHelper_1 = require('../helpers/stringHelper');
var react_router_1 = require('react-router');
var userActions_1 = require('./userActions');
var dispatcher_1 = require('../dispatcher/dispatcher');
var actionTypes_1 = require('../constants/actionTypes');
var InitActions = (function () {
    function InitActions() {
    }
    InitActions.prototype.initApp = function (callback) {
        userActions_1.userActions.getCurrentUser().then(function (user) {
            dispatcher_1.dispatcher.dispatch({
                actionType: actionTypes_1.ActionTypes.INIT,
                initData: {
                    user: user
                }
            });
            callback();
            if (this.checkLocation(true)) {
                react_router_1.browserHistory.push('/user/' + user.UserName);
            }
        }.bind(this))
            .fail(function () {
            callback();
            if (!this.checkLocation(false)) {
                react_router_1.browserHistory.push('/login');
            }
        }.bind(this));
    };
    InitActions.prototype.checkLocation = function (checkRoot) {
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
    return InitActions;
}());
exports.initActions = new InitActions();
