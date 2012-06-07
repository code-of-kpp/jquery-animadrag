/**
 * AnimaDrag
 * Animated jQuery Drag and Drop Plugin
 * Version 0.5.1 beta
 * Author Abel Mohler
 * Released with the MIT License: http://www.opensource.org/licenses/mit-license.php
 */
(function($){
    $.fn.animaDrag = function(o, callback) {
        var defaults = {
            speed: 400,
            interval: 300,
            easing: null,
            cursor: 'move',
            boundary: document.body,
            grip: null,
            overlay: true,
            after: function(e) {},
            during: function(e) {},
            before: function(e) {},
            afterEachAnimation: function(e) {}
        }
        if(typeof callback == 'function') {
            defaults.after = callback;
        }
        o = $.extend(defaults, o || {});
        return this.each(function() {
            var id, startX, startY, draggableStartX, draggableStartY, dragging = false, Ev, draggable = this,
            grip = ($(this).find(o.grip).length > 0) ? $(this).find(o.grip) : $(this);
            if(o.boundary) {
                var limitTop = $(o.boundary).offset().top, limitLeft = $(o.boundary).offset().left,
                limitBottom = limitTop + $(o.boundary).innerHeight(), limitRight = limitLeft + $(o.boundary).innerWidth();
            }
            grip.mousedown(function(e) {
                o.before.call(draggable, e);

                var lastX, lastY;
                dragging = true;

                Ev = e;

                startX = lastX = e.pageX;
                startY = lastY = e.pageY;
                draggableStartX = $(draggable).offset().left;
                draggableStartY = $(draggable).offset().top;

                $(draggable).css({
                    position: 'absolute',
                    left: draggableStartX + 'px',
                    top: draggableStartY + 'px',
                    cursor: o.cursor,
                    zIndex: '1010'
                }).addClass('anima-drag').appendTo(document.body);
                if(o.overlay && $('#anima-drag-overlay').length == 0) {
                    $('<div id="anima-drag-overlay"></div>').css({
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '1000',
                        width: $(document.body).outerWidth() + 'px',
                        height: $(document.body).outerHeight() + 'px'
                    }).appendTo(document.body);
                }
                else if(o.overlay) {
                    $('#anima-drag-overlay').show();
                }
                id = setInterval(function() {
                    if(lastX != Ev.pageX || lastY != Ev.pageY) {
                        var positionX = draggableStartX - (startX - Ev.pageX), positionY = draggableStartY - (startY - Ev.pageY);
                        if(positionX < limitLeft && o.boundary) {
                            positionX = limitLeft;
                        }
                        else if(positionX + $(draggable).innerWidth() > limitRight && o.boundary) {
                            positionX = limitRight - $(draggable).outerWidth();
                        }
                        if(positionY < limitTop && o.boundary) {
                            positionY = limitTop;
                        }
                        else if(positionY + $(draggable).innerHeight() > limitBottom && o.boundary) {
                            positionY = limitBottom - $(draggable).outerHeight();
                        }
                        $(draggable).stop().animate({
                            left: positionX + 'px',
                            top: positionY + 'px'
                        }, o.speed, o.easing, function(){o.afterEachAnimation.call(draggable, Ev)});
                    }
                    lastX = Ev.pageX;
                    lastY = Ev.pageY;
                }, o.interval);
                ($.browser.safari || e.preventDefault());
            });
            $(document).mousemove(function(e) {
                if(dragging) {
                    Ev = e;
                    o.during.call(draggable, e);
                }
            });
            $(document).mouseup(function(e) {
                if(dragging) {
                    $(draggable).css({
                        cursor: '',
                        zIndex: '990'
                    }).removeClass('anima-drag');
                    $('#anima-drag-overlay').hide().appendTo(document.body);
                    clearInterval(id);
                    o.after.call(draggable, e);
                    dragging = false;
                }
            });
        });
    }
})(jQuery);