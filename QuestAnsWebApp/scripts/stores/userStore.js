var Store = require('./store');
var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

var user = null;

class UserStore extends Store {

    getCurrentUser() {
        return user;
    }

    isLoggedIn() {
        return !!user;
    }
}

var userStore = new UserStore();

Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.UPLOAD_PHOTO:
            user = action.user;
            userStore.emitChange();
            break;
        case ActionTypes.INIT:
            user = action.initData.user;
            userStore.emitChange();
            break;

        case ActionTypes.SIGNIN:
            user = action.user;
            userStore.emitChange();
            break;
        case ActionTypes.SIGNOUT:
            user = null;
            userStore.emitChange();
            break;
        case ActionTypes.USER_UPDATE:
            user = action.user;
            userStore.emitChange();
            break;
        case ActionTypes.REGISTER:
            break;
        default: break;
    }
});

module.exports = userStore;