"use strict";
var loactionHelper_1 = require('../helpers/loactionHelper');
var userModels_1 = require('../models/userModels');
var react_router_1 = require('react-router');
var userActions_1 = require('./userActions');
var dispatcher_1 = require('../dispatcher/dispatcher');
var actionTypes_1 = require('../constants/actionTypes');
var InitActions = (function () {
    function InitActions() {
    }
    InitActions.prototype.initApp = function (callback) {
        userActions_1.userActions.getCurrentUser().then(function (user) {
            var action = new userModels_1.UserAction(actionTypes_1.ActionTypes.INIT, user, true);
            dispatcher_1.dispatcher.dispatch(action);
            callback();
            if (loactionHelper_1.LocationHelper.checkLocation(true)) {
                react_router_1.browserHistory.push('/user/' + user.UserName);
            }
        }.bind(this))
            .fail(function () {
            callback();
            if (!loactionHelper_1.LocationHelper.checkLocation(false)) {
                react_router_1.browserHistory.push('/login');
            }
        }.bind(this));
    };
    return InitActions;
}());
exports.initActions = new InitActions();
