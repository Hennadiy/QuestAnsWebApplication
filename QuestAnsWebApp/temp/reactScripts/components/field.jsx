"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var checker_1 = require('../../scripts/checker');
var Field = (function (_super) {
    __extends(Field, _super);
    function Field() {
        _super.apply(this, arguments);
    }
    Field.prototype.render = function () {
        var type = "text";
        if (this.props.type) {
            type = this.props.type;
        }
        var wrapperClass = "form-group";
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " has-error";
        }
        var errors = [];
        if (this.props.error) {
            errors = this.props.error;
        }
        var value = checker_1.Checker.getProperValue(this.props.value);
        var errorRender = function (e) {
            return (<div key={e}>{e}</div>);
        };
        return (<div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <input type={type} name={this.props.name} className="form-control" onChange={this.props.onChange} value={value} maxLength={32}/>
                    <div className="input">
                        {errors.map(errorRender)}
                    </div>
                </div>
            </div>);
    };
    Field.propTypes = {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    };
    return Field;
}(React.Component));
exports.Field = Field;
