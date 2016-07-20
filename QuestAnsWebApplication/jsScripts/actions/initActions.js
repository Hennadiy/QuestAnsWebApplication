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

            if (this.checkLocation(true)) {
                ReactRouter.browserHistory.push('/user/' + user.UserName);
            }
        }.bind(this))
        .fail(function () {
            callback();

            if (!this.checkLocation(false)) {
                ReactRouter.browserHistory.push('/login');
            }
        }.bind(this));
    }

    checkLocation(checkRoot) {
        var path = location.pathname.toLowerCase();
        if (path === "/" && checkRoot) {
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