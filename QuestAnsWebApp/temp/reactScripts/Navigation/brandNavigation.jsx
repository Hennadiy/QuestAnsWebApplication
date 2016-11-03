"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_router_1 = require('react-router');
var userStore_1 = require('../../scripts/stores/userStore');
var BrandNavigation = (function (_super) {
    __extends(BrandNavigation, _super);
    function BrandNavigation() {
        _super.call(this);
        this.state = {
            user: userStore_1.userStore.getCurrentUser()
        };
        this._onChange = this._onChange.bind(this);
    }
    BrandNavigation.prototype.componentWillMount = function () {
        userStore_1.userStore.addChangeListener(this._onChange);
    };
    BrandNavigation.prototype.componentWillUnmount = function () {
        userStore_1.userStore.removeChangeListener(this._onChange);
    };
    BrandNavigation.prototype._onChange = function () {
        this.setState({ user: userStore_1.userStore.getCurrentUser() });
    };
    BrandNavigation.prototype.render = function () {
        var link = "/login";
        if (this.state.user) {
            link = "/user/" + this.state.user.UserName;
        }
        return (<div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <react_router_1.Link to={link} className="navbar-brand">Question & Answer</react_router_1.Link>
            </div>);
    };
    return BrandNavigation;
}(React.Component));
exports.BrandNavigation = BrandNavigation;
