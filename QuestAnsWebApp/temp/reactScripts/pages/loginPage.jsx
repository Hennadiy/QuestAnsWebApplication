"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var loginForm_1 = require('../forms/loginForm');
var userActions_1 = require('../../scripts/actions/userActions');
var fieldValidator_1 = require('../../scripts/fieldValidator');
var spinner_1 = require('../../scripts/spinner');
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage() {
        _super.call(this);
        //this.mixins = [Navigator];
        this.state = {
            user: {
                UserName: '',
                Password: '',
                RememberMe: false
            },
            errors: {}
        };
        this.setUserState = this.setUserState.bind(this);
        this.signinUser = this.signinUser.bind(this);
    }
    LoginPage.prototype.setUserState = function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.user[field] = value;
        return this.setState({ user: this.state.user });
    };
    LoginPage.prototype.formIsValid = function () {
        this.state.errors = {};
        this.state.errors.UserName = fieldValidator_1.FieldValidator.validateText(this.state.user.UserName, 3, 16);
        this.state.errors.Password = fieldValidator_1.FieldValidator.validateText(this.state.user.Password, 8, 16);
        this.setState({ errors: this.state.errors });
        return !fieldValidator_1.FieldValidator.hasErrors(this.state.errors);
    };
    LoginPage.prototype.signinUser = function (event) {
        event.preventDefault();
        if (!this.formIsValid()) {
            return;
        }
        spinner_1.spinner.spin();
        userActions_1.userActions.signin(this.state.user).then(function () {
            this.context.router.push('/user/' + this.state.user.UserName);
            spinner_1.spinner.stop();
        }.bind(this));
    };
    LoginPage.prototype.render = function () {
        return (<div>
                <loginForm_1.LoginForm user={this.state.user} onChange={this.setUserState} onSave={this.signinUser} errors={this.state.errors}/>
            </div>);
    };
    LoginPage.contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    return LoginPage;
}(React.Component));
exports.LoginPage = LoginPage;
