"use strict";
var $ = require('jquery');
var toastr = require('toastr');
var Ajax = (function () {
    function Ajax() {
        this.TOKEN = "Auth_Token";
        this.url = "http://localhost:36767";
    }
    Ajax.prototype.createUrl = function (controller, method) {
        return this.url + '/api/' + controller + '/' + method;
    };
    Ajax.prototype.get = function (controller, method, data, addToken, doneFunc, failFunc) {
        this.callService({
            url: this.createUrl(controller, method),
            type: 'GET',
            data: data
        }, addToken, doneFunc, failFunc);
    };
    Ajax.prototype.post = function (controller, method, data, addToken, doneFunc, failFunc) {
        this.callService({
            url: this.createUrl(controller, method),
            type: 'POST',
            data: data
        }, addToken, doneFunc, failFunc);
    };
    Ajax.prototype.getToken = function (userData, callback) {
        var _this = this;
        var doneFunc = function (data) {
            if (userData.RememberMe) {
                localStorage.setItem(_this.TOKEN, data.access_token);
            }
            else {
                sessionStorage.setItem(_this.TOKEN, data.access_token);
            }
            callback();
        };
        this.callService({
            url: this.url + '/token',
            type: 'POST',
            data: userData
        }, false, doneFunc, null);
    };
    Ajax.prototype.callService = function (options, addToken, doneFunc, failFunc) {
        if (!failFunc) {
            failFunc = this.defaultFailFunc;
        }
        if (addToken) {
            var token = localStorage.getItem(this.TOKEN);
            if (!token) {
                token = sessionStorage.getItem(this.TOKEN);
            }
            if (!token) {
                failFunc("Not Authorize", null);
                return;
            }
            //options.headers = {};
            options.headers['Authorization'] = 'Bearer ' + token;
        }
        $.ajax(options)
            .done(doneFunc)
            .fail(failFunc);
    };
    Ajax.prototype.removeToken = function () {
        localStorage.removeItem(this.TOKEN);
        sessionStorage.removeItem(this.TOKEN);
    };
    Ajax.prototype.defaultFailFunc = function (a, b) {
        if (a.responseJSON.error_description) {
            toastr.error(a.responseJSON.error_description);
        }
        else {
            toastr.error("Error occurred. Please contact administrator and reproduce your actions.");
        }
        console.error(a);
    };
    return Ajax;
}());
exports.ajax = new Ajax();
