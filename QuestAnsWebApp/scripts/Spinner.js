var $ = require('jquery');
var Spinner = require('spin');

class SpinnerCustom {
    constructor() {
        var options = {
            lines: 17, // The number of lines to draw
            length: 56,   // The length of each line
            width: 25,   // The line thickness
            radius: 84,   // The radius of the inner circle
            scale: 0.75,   // Scales overall size of the spinner
            corners: 1,   // Corner roundness (0..1)
            color: '#FFF',   // #rgb or #rrggbb or array of colors
            opacity: 0,   // Opacity of the lines
            rotate: 49,   // The rotation offset
            direction: -1,   // 1: clockwise, -1: counterclockwise
            speed: 0.5,   // Rounds per second
            trail: 100,   // Afterglow percentage
            fps: 20,   // Frames per second when using setTimeout() as a fallback for CSS
            zIndex: 2e9,   // The z-index (defaults to 2000000000)
            className: 'spinner',   // The CSS class to assign to the spinner
            top: '50%',   // Top position relative to parent
            left: '50%',   // Left position relative to parent
            shadow: true,   // Whether to render a shadow
            hwaccel: false,   // Whether to use hardware acceleration
            position: 'absolute',   // Element positioning
        };
        this.spinner = new Spinner(options)
        this.target = document.getElementById("app");
        this._backdrop = null;
        this.BACKDROP_TRANSITION_DURATION = 500;
    }

    spin() {
        this.showBackdrop();
        this.spinner.spin(this.target);
    }

    stop() {
        this.hideBackdrop();
        this.spinner.stop();
    }

    showBackdrop() {
        var animate = "fade";
        var doAnimate = $.support.transition && animate

        this._backdrop = $(document.createElement('div'));

        this._backdrop.addClass('modal-backdrop ' + animate)
            .appendTo("body")

        if (doAnimate) this._backdrop[0].offsetWidth // force reflow

        this._backdrop.addClass('in')
    }

    hideBackdrop() {
        var callbackRemove = function () {
            this._backdrop.remove()
        };

        this._backdrop.removeClass('in')

        $.support.transition && this._backdrop.hasClass('fade') ?
            this._backdrop
            .one('bsTransitionEnd', callbackRemove)
            .emulateTransitionEnd(this.BACKDROP_TRANSITION_DURATION) :
            callbackRemove()
    }
}

module.exports.spinner = new SpinnerCustom();
