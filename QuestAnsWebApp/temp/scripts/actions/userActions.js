"use strict";
var $ = require('jquery');
var ajax_1 = require('../ajax');
var dispatcher_1 = require('../dispatcher/dispatcher');
var actionTypes_1 = require('../constants/actionTypes');
var UserActions = (function () {
    function UserActions() {
        this.USER_CONTROLLER_NAME = "account";
    }
    UserActions.prototype.signin = function (user) {
        var defer = $.Deferred();
        user.grant_type = 'password';
        ajax_1.ajax.getToken(user, function () {
            var userNameModel = {
                userName: user.UserName
            };
            ajax_1.ajax.get(this.USER_CONTROLLER_NAME, 'GetUser', userNameModel, true, function (userModel) {
                dispatcher_1.dispatcher.dispatch({
                    actionType: actionTypes_1.ActionTypes.SIGNIN,
                    user: userModel
                });
                defer.resolve(userModel);
            }, null);
        });
        return defer.promise();
    };
    UserActions.prototype.uploadUserPhoto = function (image) {
        var defer = $.Deferred();
        ajax_1.ajax.post(this.USER_CONTROLLER_NAME, 'UploadPhoto', image, true, function (userModel) {
            dispatcher_1.dispatcher.dispatch({
                actionType: actionTypes_1.ActionTypes.UPLOAD_PHOTO,
                user: userModel
            });
            defer.resolve(userModel);
        }, function () {
            defer.reject();
        });
        return defer.promise();
    };
    UserActions.prototype.getUserByUserName = function (userName) {
        var defer = $.Deferred();
        var userNameModel = {
            userName: userName
        };
        ajax_1.ajax.get(this.USER_CONTROLLER_NAME, 'GetUser', userNameModel, true, function (userModel) {
            dispatcher_1.dispatcher.dispatch({
                actionType: actionTypes_1.ActionTypes.SIGNIN,
                user: userModel
            });
            defer.resolve(userModel);
        }, function () {
            defer.reject();
        });
        return defer.promise();
    };
    UserActions.prototype.getCurrentUser = function () {
        var defer = $.Deferred();
        ajax_1.ajax.get(this.USER_CONTROLLER_NAME, 'GetCurrentUser', null, true, function (userModel) {
            defer.resolve(userModel);
        }, function () {
            defer.reject();
        });
        return defer.promise();
    };
    UserActions.prototype.register = function (user) {
        var defer = $.Deferred();
        ajax_1.ajax.post(this.USER_CONTROLLER_NAME, 'register', user, false, function () {
            dispatcher_1.dispatcher.dispatch({
                actionType: actionTypes_1.ActionTypes.REGISTER,
                user: null
            });
            defer.resolve();
        }, null);
        return defer.promise();
    };
    UserActions.prototype.update = function (user) {
        var defer = $.Deferred();
        ajax_1.ajax.post(this.USER_CONTROLLER_NAME, 'UpdateCurrentUser', user, true, function (user) {
            dispatcher_1.dispatcher.dispatch({
                actionType: actionTypes_1.ActionTypes.USER_UPDATE,
                user: user
            });
            defer.resolve(user);
        }, null);
        return defer.promise();
    };
    UserActions.prototype.signout = function () {
        var defer = $.Deferred();
        ajax_1.ajax.post(this.USER_CONTROLLER_NAME, 'signout', null, true, function () {
            ajax_1.ajax.removeToken();
            dispatcher_1.dispatcher.dispatch({
                actionType: actionTypes_1.ActionTypes.SIGNOUT,
                user: null
            });
            defer.resolve();
        }, null);
        return defer.promise();
    };
    return UserActions;
}());
exports.userActions = new UserActions();
