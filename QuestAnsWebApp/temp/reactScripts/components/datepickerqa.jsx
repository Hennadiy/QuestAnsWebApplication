"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var moment = require('moment');
var DatePicker = require('react-datepicker');
var DatepickerQA = (function (_super) {
    __extends(DatepickerQA, _super);
    function DatepickerQA() {
        _super.call(this);
        this.onChange = this.onChange.bind(this);
    }
    DatepickerQA.prototype.onChange = function (event) {
        this.props.onChange({
            target: {
                name: this.props.name,
                value: event._d
            }
        });
    };
    DatepickerQA.prototype.render = function () {
        var date = moment();
        if (this.props.value) {
            date = moment(this.props.value);
        }
        return (<div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <DatePicker showYearDropdown dateFormat="DD.MM.YYYY" selected={date} onChange={this.onChange}/>
                </div>
            </div>);
    };
    return DatepickerQA;
}(React.Component));
exports.DatepickerQA = DatepickerQA;
