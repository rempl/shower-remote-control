/* global shower */

var html2canvas = require('html2canvas');
var rempl = require('rempl/dist/rempl.js');

shower.modules.define('shower-remote-control', [], function(provide) {
    provide(function(shower) {
        var remoteControl = rempl.createPublisher('shower-remote-control', rempl.scriptFromFile('src/remote-ui.js'));

        function sendState() {
            function send(image, notes) {
                remoteControl.publish({
                    slideMode: shower.container.isSlideMode(),
                    slidesCount: shower.getSlidesCount(),
                    currentSlide: shower.player.getCurrentSlideIndex(),
                    slideImage: image,
                    notes: notes
                });
            }

            setTimeout(function() { // otherwise currentSlide is wrong
                if (shower.container.isSlideMode()) {
                    var slide = shower.getSlides()[shower.player.getCurrentSlideIndex()];
                    var notes = slide.layout.getElement().querySelector('.footer');

                    if (notes) {
                        notes = notes.innerHTML;
                    }

                    html2canvas(slide.layout.getElement(), {
                        onrendered: function(canvas) {
                            send(canvas.toDataURL(), notes);
                        }
                    });
                } else {
                    send();
                }
            }, 5);
        }

        shower.container.events.on(['slideadd', 'slideremove', 'slidemodeenter', 'slidemodeexit'], sendState);
        shower.player.events.on(['prev', 'next', 'prevslide', 'nextslide'], sendState);

        remoteControl.provide({
            switchMode: function() {
                if (shower.container.isSlideMode()) {
                    shower.container.exitSlideMode();
                } else {
                    shower.container.enterSlideMode();
                }
            },
            next: function() {
                shower.player.next();
            },
            prev: function() {
                shower.player.prev();
            }
        });

        sendState();
    });
});

shower.modules.require(['shower'], function(sh) {
    sh.plugins.add('shower-remote-control');
});
