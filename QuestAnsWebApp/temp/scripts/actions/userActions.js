"use strict";
var $ = require('jquery');
var userModels_1 = require('../models/userModels');
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
                var action = new userModels_1.UserAction(actionTypes_1.ActionTypes.SIGNIN, userModel, false);
                dispatcher_1.dispatcher.dispatch(action);
                defer.resolve(userModel);
            }, null);
        }.bind(this));
        return defer.promise();
    };
    UserActions.prototype.uploadUserPhoto = function (image) {
        var defer = $.Deferred();
        ajax_1.ajax.post(this.USER_CONTROLLER_NAME, 'UploadPhoto', image, true, function (userModel) {
            var action = new userModels_1.UserAction(actionTypes_1.ActionTypes.UPLOAD_PHOTO, userModel, false);
            dispatcher_1.dispatcher.dispatch(action);
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
            var action = new userModels_1.UserAction(actionTypes_1.ActionTypes.REGISTER, null, false);
            dispatcher_1.dispatcher.dispatch(action);
            defer.resolve();
        }, null);
        return defer.promise();
    };
    UserActions.prototype.update = function (user) {
        var defer = $.Deferred();
        ajax_1.ajax.post(this.USER_CONTROLLER_NAME, 'UpdateCurrentUser', user, true, function (user) {
            var action = new userModels_1.UserAction(actionTypes_1.ActionTypes.USER_UPDATE, user, false);
            dispatcher_1.dispatcher.dispatch(action);
            defer.resolve(user);
        }, null);
        return defer.promise();
    };
    UserActions.prototype.signout = function () {
        var defer = $.Deferred();
        ajax_1.ajax.post(this.USER_CONTROLLER_NAME, 'signout', null, true, function () {
            ajax_1.ajax.removeToken();
            var action = new userModels_1.UserAction(actionTypes_1.ActionTypes.SIGNOUT, null, false);
            dispatcher_1.dispatcher.dispatch(action);
            defer.resolve();
        }, null);
        return defer.promise();
    };
    return UserActions;
}());
exports.userActions = new UserActions();
