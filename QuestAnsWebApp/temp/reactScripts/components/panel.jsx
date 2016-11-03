"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        _super.apply(this, arguments);
    }
    Panel.prototype.render = function () {
        var additionalHtml;
        if (this.props.additional.isVisible) {
            var spanStyle = {
                float: "right"
            };
            additionalHtml = (<span style={spanStyle}>
                    <a href="javascript:;" onClick={this.props.additional.onClick}>{this.props.additional.text}</a>
                </span>);
        }
        return (<div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.headerText}
                    {additionalHtml}
                </div>
                <div className="panel-body">
                    {this.props.children}
                </div>
            </div>);
    };
    return Panel;
}(React.Component));
exports.Panel = Panel;
