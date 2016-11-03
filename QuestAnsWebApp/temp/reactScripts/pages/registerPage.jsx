"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var registerForm_jsx_1 = require('../forms/registerForm.jsx');
var toastr = require('toastr');
var Spinner_1 = require('../../scripts/Spinner');
var fieldValidator_1 = require('../../scripts/fieldValidator');
var userActions_1 = require('../../scripts/actions/userActions');
var RegisterPage = (function (_super) {
    __extends(RegisterPage, _super);
    function RegisterPage() {
        _super.call(this);
        this.state = {
            user: {
                UserName: '',
                Name: '',
                Surname: '',
                Email: '',
                Password: '',
                RepPassword: ''
            },
            errors: {}
        };
        this.setUserState = this.setUserState.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }
    RegisterPage.prototype.setUserState = function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.user[field] = value;
        return this.setState({ user: this.state.user });
    };
    RegisterPage.prototype.formIsValid = function () {
        this.state.errors = {};
        this.state.errors.UserName = fieldValidator_1.FieldValidator.validateText(this.state.user.UserName, 3, 16);
        this.state.errors.Name = fieldValidator_1.FieldValidator.validateText(this.state.user.Name, 3, 24);
        this.state.errors.Surname = fieldValidator_1.FieldValidator.validateText(this.state.user.Surname, 3, 24);
        this.state.errors.Email = fieldValidator_1.FieldValidator.validateEmail(this.state.user.Email);
        this.state.errors.Password = fieldValidator_1.FieldValidator.validatePassword(this.state.user.Password, 8, 16);
        this.state.errors.RepPassword = fieldValidator_1.FieldValidator.isEqualPasswords(this.state.user.Password, this.state.user.RepPassword);
        this.setState({ errors: this.state.errors });
        return !fieldValidator_1.FieldValidator.hasErrors(this.state.errors);
    };
    RegisterPage.prototype.registerUser = function (event) {
        event.preventDefault();
        if (!this.formIsValid()) {
            return;
        }
        Spinner_1.spinner.spin();
        userActions_1.userActions.register(this.state.user).then(function () {
            Spinner_1.spinner.stop();
            toastr.success("You have been registered.");
            this.context.router.push('login');
        }.bind(this));
    };
    RegisterPage.prototype.render = function () {
        return (<div>
                <registerForm_jsx_1.RegisterForm user={this.state.user} onChange={this.setUserState} onSave={this.registerUser} errors={this.state.errors}/>
            </div>);
    };
    RegisterPage.contextTypes = {
        router: React.PropTypes.object
    };
    return RegisterPage;
}(React.Component));
exports.RegisterPage = RegisterPage;
