"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('events');
var Store = (function (_super) {
    __extends(Store, _super);
    function Store() {
        _super.call(this);
        this.CHANGE_EVENT = "change";
    }
    Store.prototype.addChangeListener = function (callback) {
        this.on(this.CHANGE_EVENT, callback);
    };
    Store.prototype.removeChangeListener = function (callback) {
        this.removeListener(this.CHANGE_EVENT, callback);
    };
    Store.prototype.emitChange = function () {
        this.emit(this.CHANGE_EVENT);
    };
    return Store;
}(events_1.EventEmitter));
exports.Store = Store;
