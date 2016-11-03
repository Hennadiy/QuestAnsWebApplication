"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var SimpleButton = (function (_super) {
    __extends(SimpleButton, _super);
    function SimpleButton() {
        _super.apply(this, arguments);
    }
    SimpleButton.prototype.render = function () {
        var cssClasses = "btn btn-";
        if (this.props.cssClasses) {
            cssClasses += this.props.cssClasses;
        }
        else {
            cssClasses += 'default';
        }
        return (<button type="submit" onClick={this.props.onClick} className={cssClasses}>{this.props.text}</button>);
    };
    return SimpleButton;
}(React.Component));
exports.SimpleButton = SimpleButton;
