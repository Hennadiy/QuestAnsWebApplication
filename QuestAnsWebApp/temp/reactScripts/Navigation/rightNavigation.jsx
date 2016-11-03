"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_router_1 = require('react-router');
var userActions_1 = require('../../scripts/actions/userActions');
var userStore_1 = require('../../scripts/stores/userStore');
var RightNavigation = (function (_super) {
    __extends(RightNavigation, _super);
    function RightNavigation() {
        _super.call(this);
        this.state = {
            user: userStore_1.userStore.getCurrentUser()
        };
        this.signOut = this.signOut.bind(this);
        this._onChange = this._onChange.bind(this);
    }
    RightNavigation.prototype.componentWillMount = function () {
        userStore_1.userStore.addChangeListener(this._onChange);
    };
    RightNavigation.prototype.componentWillUnmount = function () {
        userStore_1.userStore.removeChangeListener(this._onChange);
    };
    RightNavigation.prototype._onChange = function () {
        this.setState({ user: userStore_1.userStore.getCurrentUser() });
    };
    RightNavigation.prototype.signOut = function (event) {
        event.preventDefault();
        userActions_1.userActions.signout().then(function () {
            this.context.router.push('/login');
        }.bind(this));
    };
    RightNavigation.prototype.render = function () {
        var links = (<ul className="nav navbar-nav navbar-right">
                <li>
                    <react_router_1.Link to="login">Log In</react_router_1.Link>
                </li>
                <li>
                    <react_router_1.Link to="register">Register</react_router_1.Link>
                </li>
            </ul>);
        if (this.state.user) {
            links = (<ul className="nav navbar-nav navbar-right">
                    <li>
                        <a href="javascript:;" onClick={this.signOut}>Sign Out</a>
                    </li>
                </ul>);
        }
        return links;
    };
    RightNavigation.contextTypes = {
        router: React.PropTypes.object
    };
    return RightNavigation;
}(React.Component));
exports.RightNavigation = RightNavigation;
