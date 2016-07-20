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

var userActions = new UserActions();