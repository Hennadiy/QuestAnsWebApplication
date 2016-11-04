import { User } from './models/userModels';
import { Token } from './models/tokenModels';
import * as $ from 'jquery';
import * as toastr from 'toastr';

class Ajax {
    private readonly TOKEN = "Auth_Token";
    private url: string;

    constructor() {
        this.url = "http://localhost:36767";
    }

    private createUrl(controller: string, method: string): string {
        return this.url + '/api/' + controller + '/' + method;
    }

    public get(controller: string, method: string, data: any, addToken: boolean,
        doneFunc: Function, failFunc: Function | null): void {

        this.callService({
            url: this.createUrl(controller, method),
            type: 'GET',
            data: data
        }, addToken, doneFunc, failFunc);
    }

    public post(controller: string, method: string, data: User, addToken: boolean,
        doneFunc: Function, failFunc: Function | null): void {

        this.callService({
            url: this.createUrl(controller, method),
            type: 'POST',
            data: data
        }, addToken, doneFunc, failFunc);
    }

    public getToken(userData: User, callback: Function): void {
        let doneFunc = (data: Token): void => {
            if (userData.RememberMe) {
                localStorage.setItem(this.TOKEN, data.access_token);
            }
            else {
                sessionStorage.setItem(this.TOKEN, data.access_token);
            }
            callback();
        };

        this.callService({
            url: this.url + '/token',
            type: 'POST',
            data: userData
        }, false, doneFunc, null);
    }

    private callService(options: JQueryAjaxSettings, addToken: boolean,
        doneFunc: Function, failFunc: Function | null): void {

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

            options.headers = {};
            options.headers['Authorization'] = 'Bearer ' + token;
        }

        $.ajax(options)
            .done(doneFunc as any)
            .fail(failFunc as any);
    }
    public removeToken(): void {
        localStorage.removeItem(this.TOKEN);
        sessionStorage.removeItem(this.TOKEN);
    }

    private defaultFailFunc(a: any, b: any): void {
        if (a.responseJSON.error_description) {
            toastr.error(a.responseJSON.error_description);
        }
        else {
            toastr.error("Error occurred. Please contact administrator and reproduce your actions.");
        }
        console.error(a);
    }
}

export let ajax = new Ajax();