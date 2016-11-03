"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var moment = require('moment');
var displayField_1 = require('../components/displayField');
var checker_1 = require('../../scripts/checker');
var displayUserImage_1 = require('../components/displayUserImage');
var DisplayUserForm = (function (_super) {
    __extends(DisplayUserForm, _super);
    function DisplayUserForm() {
        _super.apply(this, arguments);
    }
    DisplayUserForm.prototype.render = function () {
        var country = checker_1.Checker.getProperValueObj(this.props.user.Country, "Value");
        var city = checker_1.Checker.getProperValueObj(this.props.user.City, "Value");
        var birthdate = '';
        if (this.props.user.Birthdate) {
            birthdate = moment(new Date(this.props.user.Birthdate)).format('DD.MM.YYYY');
        }
        return (<div className="row">
                <div className="col-md-5">
                    <displayUserImage_1.DisplayUserImage url={this.props.user.PhotoUrl}/>
                </div>
                <div className="col-md-7">
                    <displayField_1.DisplayField name="Country" value={country}/>
                    <displayField_1.DisplayField name="City" value={city}/>
                    <displayField_1.DisplayField name="Birthdate" value={birthdate}/>
                    <displayField_1.DisplayField name="Skype" value={this.props.user.Skype}/>
                    <displayField_1.DisplayField name="Email" value={this.props.user.Email}/>
                    <displayField_1.DisplayField name="Phone Number" value={this.props.user.PhoneNumber}/>
                </div>
            </div>);
    };
    return DisplayUserForm;
}(React.Component));
exports.DisplayUserForm = DisplayUserForm;
