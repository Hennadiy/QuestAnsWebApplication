"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var field_1 = require('../components/field');
var simpleButton_1 = require('../components/simpleButton');
var RegisterForm = (function (_super) {
    __extends(RegisterForm, _super);
    function RegisterForm() {
        _super.apply(this, arguments);
    }
    RegisterForm.prototype.render = function () {
        return (<div>
                <h1>Register Form</h1>
                <form>
                    <field_1.Field type="email" label="Email" name="Email" value={this.props.user.Email} onChange={this.props.onChange} error={this.props.errors.Email}/>
                    <field_1.Field label="User Name" name="UserName" value={this.props.user.UserName} onChange={this.props.onChange} error={this.props.errors.UserName}/>
                    <field_1.Field type="password" label="Password" name="Password" value={this.props.user.Password} onChange={this.props.onChange} error={this.props.errors.Password}/>
                    <field_1.Field type="password" label="Repeat Password" name="RepPassword" value={this.props.user.RepPassword} onChange={this.props.onChange} error={this.props.errors.RepPassword}/>
                    <field_1.Field label="Name" name="Name" value={this.props.user.Name} onChange={this.props.onChange} error={this.props.errors.Name}/>
                    <field_1.Field label="Surname" name="Surname" value={this.props.user.Surname} onChange={this.props.onChange} error={this.props.errors.Surname}/>
                    <simpleButton_1.SimpleButton text="Register" cssClasses="success" onClick={this.props.onSave}/>
                </form>
            </div>);
    };
    return RegisterForm;
}(React.Component));
exports.RegisterForm = RegisterForm;
