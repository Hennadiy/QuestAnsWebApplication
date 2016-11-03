"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var NotFoundPage = (function (_super) {
    __extends(NotFoundPage, _super);
    function NotFoundPage() {
        _super.apply(this, arguments);
    }
    NotFoundPage.prototype.render = function () {
        return (<div>
                <h1>Page Not Found</h1>
                <p>Whoops! Sorry, there is nothing to see here.</p>
                <p>
                    <ReactRouter.Link to="/">Back to Home</ReactRouter.Link>
                </p>
            </div>);
    };
    return NotFoundPage;
}(React.Component));
exports.NotFoundPage = NotFoundPage;
