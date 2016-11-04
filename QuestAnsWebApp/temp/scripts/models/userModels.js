"use strict";
var commonModels_1 = require('./commonModels');
var User = (function () {
    function User() {
        this.UserName = '';
        this.Name = '';
        this.Surname = '';
        this.Country = new commonModels_1.Value();
        this.City = new commonModels_1.Value();
    }
    return User;
}());
exports.User = User;
var UserAction = (function () {
    function UserAction(actionType, user, isInit) {
        this.ActionType = actionType;
        if (isInit) {
            this.InitUser = user;
        }
        else {
            this.User = user;
        }
    }
    return UserAction;
}());
exports.UserAction = UserAction;
