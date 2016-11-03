import * as $ from 'jquery';
import { ajax } from '../ajax';
import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../constants/actionTypes';

class UserActions {
    private readonly USER_CONTROLLER_NAME = "account";

    public signin(user): JQueryPromise<{}> {
        var defer = $.Deferred();

        user.grant_type = 'password';

        ajax.getToken(user, function () {

            var userNameModel = {
                userName: user.UserName
            };

            ajax.get(this.USER_CONTROLLER_NAME, 'GetUser', userNameModel, true, (userModel) => {
                dispatcher.dispatch({
                    actionType: ActionTypes.SIGNIN,
                    user: userModel
                });

                defer.resolve(userModel)
            }, null);
        });

        return defer.promise();
    }

    uploadUserPhoto(image): JQueryPromise<{}> {
        var defer = $.Deferred();

        ajax.post(this.USER_CONTROLLER_NAME, 'UploadPhoto', image, true, (userModel) => {
            dispatcher.dispatch({
                actionType: ActionTypes.UPLOAD_PHOTO,
                user: userModel
            });

            defer.resolve(userModel)
        }, () => {
            defer.reject();
        });

        return defer.promise();
    }

    public getUserByUserName(userName: string): JQueryPromise<{}> {
        var defer = $.Deferred();

        var userNameModel = {
            userName: userName
        };

        ajax.get(this.USER_CONTROLLER_NAME, 'GetUser', userNameModel, true, (userModel) => {
            dispatcher.dispatch({
                actionType: ActionTypes.SIGNIN,
                user: userModel
            });

            defer.resolve(userModel)
        }, () => {
            defer.reject();
        });

        return defer.promise();
    }

    public getCurrentUser(): JQueryPromise<{}> {
        var defer = $.Deferred();

        ajax.get(this.USER_CONTROLLER_NAME, 'GetCurrentUser', null, true, (userModel) => {
            defer.resolve(userModel)
        }, () => {
            defer.reject();
        });

        return defer.promise();
    }

    public register(user): JQueryPromise<{}> {
        var defer = $.Deferred();

        ajax.post(this.USER_CONTROLLER_NAME, 'register', user, false, () => {
            dispatcher.dispatch({
                actionType: ActionTypes.REGISTER,
                user: null
            });

            defer.resolve()
        }, null);

        return defer.promise();
    }

    public update(user): JQueryPromise<{}> {
        var defer = $.Deferred();

        ajax.post(this.USER_CONTROLLER_NAME, 'UpdateCurrentUser', user, true, function (user) {
            dispatcher.dispatch({
                actionType: ActionTypes.USER_UPDATE,
                user: user
            });

            defer.resolve(user)
        }, null);

        return defer.promise();
    }

    public signout(): JQueryPromise<{}> {
        var defer = $.Deferred();

        ajax.post(this.USER_CONTROLLER_NAME, 'signout', null, true, function () {
            ajax.removeToken();

            dispatcher.dispatch({
                actionType: ActionTypes.SIGNOUT,
                user: null
            });

            defer.resolve()
        }, null);

        return defer.promise();
    }
}

export let userActions = new UserActions();