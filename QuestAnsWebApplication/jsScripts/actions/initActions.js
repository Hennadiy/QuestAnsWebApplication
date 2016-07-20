class InitActions {
    initApp(callback) {
        userActions.getCurrentUser().then(function (user) {
            Dispatcher.dispatch({
                actionType: ActionTypes.INIT,
                initData: {
                    user: user
                }
            });

            callback();

            if (this.checkLocation()) {
                ReactRouter.browserHistory.push('/user/' + user.UserName);
            }
        }.bind(this))
        .fail(function () {
            callback();

            if (!this.checkLocation()) {
                ReactRouter.browserHistory.push('/login');
            }
        });
    }

    checkLocation() {
        var path = location.pathname.toLowerCase();
        if (path === "/") {
            return true;
        }

        var locations = ["/login", "/register"];

        for (var i = 0; i < locations.length; i++) {
            if (path.startsWith(locations[i].toLowerCase())) {
                return true;
            }
        }
        return false;
    }
}

var initActions = new InitActions();