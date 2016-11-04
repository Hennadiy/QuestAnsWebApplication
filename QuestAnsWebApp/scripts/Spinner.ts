import Spinner = require('spin');
import * as $ from 'jquery';

class SpinnerCustom {
    private spinner: Spinner;
    private target: HTMLElement;
    //private readonly BACKDROP_TRANSITION_DURATION = 500;

    constructor() {
        let options: SpinnerOptions = {
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
            position: 'fixed'   // Element positioning
        };
        this.spinner = new Spinner(options);
        this.target = document.getElementById("app");
    }

    public spin(): void {
        this.showBackdrop();
        this.spinner.spin(this.target);
    }

    public stop(): void {
        this.spinner.stop();
        this.hideBackdrop();
    }

    private showBackdrop(): void {
        let animate = "fade";

        let _backdrop = $(document.createElement('div'));

        _backdrop.addClass('modal-backdrop ' + animate)
            .appendTo("body");

        _backdrop.addClass('in')
    }

    private hideBackdrop(): void {

        let _backdrop = $('.modal-backdrop');

        _backdrop.removeClass('in');

        _backdrop.remove();
    }
}

export let spinner = new SpinnerCustom();