"use strict";
var react_router_1 = require('react-router');
var userStore_1 = require('../stores/userStore');
var Auth = (function () {
    function Auth() {
    }
    Auth.requireAuth = function (transition) {
        if (!userStore_1.userStore.isLoggedIn()) {
            transition.routes.push('/login');
        }
    };
    Auth.requireNotAuth = function (transition) {
        if (userStore_1.userStore.isLoggedIn()) {
            var user = userStore_1.userStore.getCurrentUser();
            react_router_1.browserHistory.push('/user/' + user.UserName);
        }
    };
    return Auth;
}());
exports.Auth = Auth;
