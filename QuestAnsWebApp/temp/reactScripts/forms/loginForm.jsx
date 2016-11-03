"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var field_1 = require('../components/field');
var simplebutton_1 = require('../components/simplebutton');
var checkbox_1 = require('../components/checkbox');
var LoginForm = (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        _super.apply(this, arguments);
    }
    LoginForm.prototype.render = function () {
        return (<div>
                <h1>Login Form 11</h1>
                <form>
                    <field_1.Field label="Login" name="UserName" required="true" value={this.props.user.UserName} onChange={this.props.onChange} error={this.props.errors.UserName}/>
                    <field_1.Field type="password" name="Password" label="Password" required="true" value={this.props.user.Password} onChange={this.props.onChange} error={this.props.errors.Password}/>
                    <checkbox_1.Checkbox label="Remember Me" name="RememberMe" value={this.props.user.RememberMe} onChange={this.props.onChange}/>
                    <simplebutton_1.SimpleButton text="Log In" onClick={this.props.onSave}/>
                </form>
            </div>);
    };
    return LoginForm;
}(React.Component));
exports.LoginForm = LoginForm;
