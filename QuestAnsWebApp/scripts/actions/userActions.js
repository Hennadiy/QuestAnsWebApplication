var $ = require('jquery');
var ajax = require('../ajax');
var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

var USER_CONTROLLER_NAME = "account";

class UserActions {
    signin(user) {
        var defer = $.Deferred();

        user.grant_type = 'password';

        ajax.getToken(user, function () {

            var userNameModel = {
                userName: user.UserName
            };

            ajax.get(USER_CONTROLLER_NAME, 'GetUser', userNameModel, true, function (userModel) {
                Dispatcher.dispatch({
                    actionType: ActionTypes.SIGNIN,
                    user: userModel
                });

                defer.resolve(userModel)
            });
        });

        return defer.promise();
    }

    uploadUserPhoto(image) {
        var defer = $.Deferred();

        ajax.post(USER_CONTROLLER_NAME, 'UploadPhoto', image, true, function (userModel) {
            Dispatcher.dispatch({
                actionType: ActionTypes.UPLOAD_PHOTO,
                user: userModel
            });

            defer.resolve(userModel)
        }, function () {
            defer.reject();
        });

        return defer.promise();
    }

    getUserByUserName(userName) {
        var defer = $.Deferred();

        var userNameModel = {
            userName: userName
        };

        ajax.get(USER_CONTROLLER_NAME, 'GetUser', userNameModel, true, function (userModel) {
            Dispatcher.dispatch({
                actionType: ActionTypes.SIGNIN,
                user: userModel
            });

            defer.resolve(userModel)
        }, function () {
            defer.reject();
        });

        return defer.promise();
    }

    getCurrentUser() {
        var defer = $.Deferred();

        ajax.get(USER_CONTROLLER_NAME, 'GetCurrentUser', null, true, function (userModel) {
            defer.resolve(userModel)
        }, function () {
            defer.reject();
        });

        return defer.promise();
    }

    register(user) {
        var defer = $.Deferred();

        ajax.post(USER_CONTROLLER_NAME, 'register', user, false, function () {
            Dispatcher.dispatch({
                actionType: ActionTypes.REGISTER,
                user: null
            });

            defer.resolve()
        });

        return defer.promise();
    }

    update(user) {
        var defer = $.Deferred();

        ajax.post(USER_CONTROLLER_NAME, 'UpdateCurrentUser', user, true, function (user) {
            Dispatcher.dispatch({
                actionType: ActionTypes.USER_UPDATE,
                user: user
            });

            defer.resolve(user)
        });

        return defer.promise();
    }

    signout() {
        var defer = $.Deferred();

        ajax.post(USER_CONTROLLER_NAME, 'signout', null, true, function () {
            ajax.removeToken();

            Dispatcher.dispatch({
                actionType: ActionTypes.SIGNOUT,
                user: null
            });

            defer.resolve()
        });

        return defer.promise();
    }
}

module.exports = new UserActions();