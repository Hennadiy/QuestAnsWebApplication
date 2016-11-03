"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var DisplayUserImage = (function (_super) {
    __extends(DisplayUserImage, _super);
    function DisplayUserImage() {
        _super.apply(this, arguments);
    }
    DisplayUserImage.prototype.render = function () {
        var url = "http://foryouindia.com/Default/Pages/Images/Profile.png";
        if (this.props.url) {
            url = this.props.url;
        }
        return (<div className="userImageContainer">
                <img src={url} className="userImage"/>
            </div>);
    };
    return DisplayUserImage;
}(React.Component));
exports.DisplayUserImage = DisplayUserImage;
