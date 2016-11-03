"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var DisplayField = (function (_super) {
    __extends(DisplayField, _super);
    function DisplayField() {
        _super.apply(this, arguments);
    }
    DisplayField.prototype.render = function () {
        if (!this.props.value) {
            return (<span></span>);
        }
        return (<div className="row">
                <div className="col-lg-6">
                    {this.props.name}
                </div>
                <div className="col-lg-6">
                    {this.props.value}
                </div>
            </div>);
    };
    return DisplayField;
}(React.Component));
exports.DisplayField = DisplayField;
