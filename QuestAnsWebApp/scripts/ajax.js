var $ = require('jquery');
var toastr = require('toastr');

var TOKEN = "Auth_Token";

class Ajax {
    constructor(context) {
        this.url = "http://localhost:36767";
    }

    createUrl(controller, method) {
        return this.url + '/api/' + controller + '/' + method;
    }

    get(controller, method, data, addToken, doneFunc, failFunc) {
        this.callService({
            url: this.createUrl(controller, method),
            type: 'GET',
            data: data
        }, addToken, doneFunc, failFunc);
    }

    post(controller, method, data, addToken, doneFunc, failFunc) {
        this.callService({
            url: this.createUrl(controller, method),
            type: 'POST',
            data: data
        }, addToken, doneFunc, failFunc);
    }

    getToken(userData, callback) {
        this.callService({
            url: this.url + '/token',
            type: 'POST',
            data: userData
        }, false,
            function (data) {
                if (userData.RememberMe) {
                    localStorage.setItem(TOKEN, data.access_token);
                }
                else {
                    sessionStorage.setItem(TOKEN, data.access_token);
                }
                callback();
            });
    }

    callService(options, addToken, doneFunc, failFunc) {
        if (!failFunc) {
            failFunc = this.defaultFailFunc;
        }

        if (addToken) {
            var token = localStorage.getItem(TOKEN);
            if (!token) {
                token = sessionStorage.getItem(TOKEN);
            }
            if (!token) {
                failFunc("Not Authorize", null);
                return;
            }

            options.headers = {};
            options.headers.Authorization = 'Bearer ' + token;
        }

        $.ajax(options)
            .done(doneFunc)
            .fail(failFunc);
    }
    removeToken() {
        localStorage.removeItem(TOKEN);
        sessionStorage.removeItem(TOKEN);
    }

    defaultFailFunc(a, b) {
        toastr.error("Error occurred. Please contact administrator and reproduce your actions.");
        console.error(a);
        console.error(b);
    }
}
module.exports = new Ajax();