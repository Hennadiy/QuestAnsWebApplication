class Auth {
    static requireAuth(transition) {
        if (!userStore.isLoggedIn()) {
            transition.routes.push('/login');
        }
    }

    static requireNotAuth(transition) {
        if (userStore.isLoggedIn()) {
            var user = userStore.getCurrentUser();
            ReactRouter.browserHistory.push('/user/' + user.UserName);
        }
    }
}