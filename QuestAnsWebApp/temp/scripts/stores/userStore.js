"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var store_1 = require('./store');
var dispatcher_1 = require('../dispatcher/dispatcher');
var actionTypes_1 = require('../constants/actionTypes');
var user = null;
var UserStore = (function (_super) {
    __extends(UserStore, _super);
    function UserStore() {
        _super.apply(this, arguments);
    }
    UserStore.prototype.getCurrentUser = function () {
        return user;
    };
    UserStore.prototype.isLoggedIn = function () {
        return !!user;
    };
    return UserStore;
}(store_1.Store));
exports.userStore = new UserStore();
dispatcher_1.dispatcher.register(function (action) {
    switch (action.ActionType) {
        case actionTypes_1.ActionTypes.UPLOAD_PHOTO:
            user = action.User;
            exports.userStore.emitChange();
            break;
        case actionTypes_1.ActionTypes.INIT:
            user = action.InitUser;
            exports.userStore.emitChange();
            break;
        case actionTypes_1.ActionTypes.SIGNIN:
            user = action.User;
            exports.userStore.emitChange();
            break;
        case actionTypes_1.ActionTypes.SIGNOUT:
            user = null;
            exports.userStore.emitChange();
            break;
        case actionTypes_1.ActionTypes.USER_UPDATE:
            user = action.User;
            exports.userStore.emitChange();
            break;
        case actionTypes_1.ActionTypes.REGISTER:
            break;
        default: break;
    }
});
