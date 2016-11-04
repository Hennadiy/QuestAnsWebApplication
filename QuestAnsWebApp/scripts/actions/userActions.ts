import * as $ from 'jquery';
import { fail } from 'assert';
import { UserAction } from '../models/userModels';
import { ajax } from '../ajax';
import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../constants/actionTypes';

class UserActions {
    private readonly USER_CONTROLLER_NAME = "account";

    public signin(user): JQueryPromise<{}> {
        let defer = $.Deferred();

        user.grant_type = 'password';

        ajax.getToken(user, function () {

            let userNameModel = {
                userName: user.UserName
            };

            ajax.get(this.USER_CONTROLLER_NAME, 'GetUser', userNameModel, true, (userModel) => {
                let action = new UserAction(ActionTypes.SIGNIN, userModel, false);

                dispatcher.dispatch(action);

                defer.resolve(userModel)
            }, null);
        }.bind(this));

        return defer.promise();
    }

    uploadUserPhoto(image): JQueryPromise<{}> {
        let defer = $.Deferred();

        ajax.post(this.USER_CONTROLLER_NAME, 'UploadPhoto', image, true, (userModel) => {
            let action = new UserAction(ActionTypes.UPLOAD_PHOTO, userModel, false);

            dispatcher.dispatch(action);

            defer.resolve(userModel)
        }, () => {
            defer.reject();
        });

        return defer.promise();
    }

    public getUserByUserName(userName: string): JQueryPromise<{}> {
        let defer = $.Deferred();

        let userNameModel = {
            userName: userName
        };

        ajax.get(this.USER_CONTROLLER_NAME, 'GetUser', userNameModel, true, (userModel) => {
            defer.resolve(userModel)
        }, () => {
            defer.reject();
        });

        return defer.promise();
    }

    public getCurrentUser(): JQueryPromise<{}> {
        let defer = $.Deferred();

        ajax.get(this.USER_CONTROLLER_NAME, 'GetCurrentUser', null, true, (userModel) => {
            defer.resolve(userModel)
        }, () => {
            defer.reject();
        });

        return defer.promise();
    }

    public register(user): JQueryPromise<{}> {
        let defer = $.Deferred();

        ajax.post(this.USER_CONTROLLER_NAME, 'register', user, false, () => {
            let action = new UserAction(ActionTypes.REGISTER, null, false);

            dispatcher.dispatch(action);

            defer.resolve()
        }, null);

        return defer.promise();
    }

    public update(user): JQueryPromise<{}> {
        let defer = $.Deferred();

        ajax.post(this.USER_CONTROLLER_NAME, 'UpdateCurrentUser', user, true, (user) => {
            let action = new UserAction(ActionTypes.USER_UPDATE, user, false);

            dispatcher.dispatch(action);

            defer.resolve(user)
        }, null);

        return defer.promise();
    }

    public signout(): JQueryPromise<{}> {
        let defer = $.Deferred();

        ajax.post(this.USER_CONTROLLER_NAME, 'signout', null, true, function () {
            ajax.removeToken();

            let action = new UserAction(ActionTypes.SIGNOUT, null, false);

            dispatcher.dispatch(action);

            defer.resolve()
        }, null);

        return defer.promise();
    }
}

export let userActions = new UserActions();