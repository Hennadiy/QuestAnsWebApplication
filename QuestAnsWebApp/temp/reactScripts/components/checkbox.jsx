"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        _super.apply(this, arguments);
    }
    Checkbox.prototype.render = function () {
        return (<div className="checkbox">
                <label><input type="checkbox" value={this.props.value}/>{this.props.label}</label>
            </div>);
    };
    return Checkbox;
}(React.Component));
exports.Checkbox = Checkbox;
