"use strict";
var Spinner = require('spin');
var $ = require('jquery');
var SpinnerCustom = (function () {
    //private readonly BACKDROP_TRANSITION_DURATION = 500;
    function SpinnerCustom() {
        var options = {
            lines: 17,
            length: 56,
            width: 25,
            radius: 84,
            scale: 0.75,
            corners: 1,
            color: '#FFF',
            opacity: 0,
            rotate: 49,
            direction: -1,
            speed: 0.5,
            trail: 100,
            fps: 20,
            zIndex: 2e9,
            className: 'spinner',
            top: '50%',
            left: '50%',
            shadow: true,
            hwaccel: false,
            position: 'fixed' // Element positioning
        };
        this.spinner = new Spinner(options);
        this.target = document.getElementById("app");
    }
    SpinnerCustom.prototype.spin = function () {
        this.showBackdrop();
        this.spinner.spin(this.target);
    };
    SpinnerCustom.prototype.stop = function () {
        this.hideBackdrop();
        this.spinner.stop();
    };
    SpinnerCustom.prototype.showBackdrop = function () {
        var animate = "fade";
        //var doAnimate = $.support.transition && animate;
        var _backdrop = $(document.createElement('div'));
        _backdrop.addClass('modal-backdrop ' + animate)
            .appendTo("body");
        //if (doAnimate) 
        _backdrop[0].offsetWidth; // force reflow
        _backdrop.addClass('in');
    };
    SpinnerCustom.prototype.hideBackdrop = function () {
        var callbackRemove = function () {
            _backdrop.remove();
        };
        var _backdrop = $('.modal-backdrop');
        _backdrop.removeClass('in');
        //$.support.transition && _backdrop.hasClass('fade') ?
        _backdrop.one('bsTransitionEnd', callbackRemove);
        //.emulateTransitionEnd(this.BACKDROP_TRANSITION_DURATION) 
        //:callbackRemove()
    };
    return SpinnerCustom;
}());
exports.spinner = new SpinnerCustom();
