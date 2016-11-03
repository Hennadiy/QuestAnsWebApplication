"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Dropdown = (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown() {
        _super.apply(this, arguments);
    }
    Dropdown.prototype.render = function () {
        var optionRender = function (e) {
            return (<option key={e.Id} value={e.Id}>{e.Value}</option>);
        };
        var value = "-1";
        if (this.props.value) {
            value = this.props.value;
        }
        return (<div className="form-group" hidden={this.props.values.length === 0}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select name={this.props.name} value={value} onChange={this.props.onChange} className="form-control">
                        <option value="-1">{this.props.defaultValueText}</option>
                        {this.props.values.map(optionRender)}
                    </select>
                </div>
            </div>);
    };
    return Dropdown;
}(React.Component));
exports.Dropdown = Dropdown;
