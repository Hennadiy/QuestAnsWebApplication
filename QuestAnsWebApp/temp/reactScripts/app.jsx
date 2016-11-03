"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var rightNavigation_1 = require('./Navigation/rightNavigation');
var brandNavigation_1 = require('./Navigation/brandNavigation');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        var copyRights = "© " + (new Date()).getFullYear() + " - Question & Answer Application.";
        return (<div>
                <div className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <brandNavigation_1.BrandNavigation />
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li></li>
                            </ul>

                            <rightNavigation_1.RightNavigation />
                        </div>
                    </div>
                </div>

                <div className="container body-content">
                    {this.props.children}

                    <hr />

                    <footer>
                        <p>{copyRights}</p>
                    </footer>
                </div>
            </div>);
    };
    return App;
}(React.Component));
exports.App = App;
