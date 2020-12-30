/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 * 
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


(function (){
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el.removeEventListener("mousedown", el.md, 0)
            window.removeEventListener("mouseup", el.mu, 0)
            window.removeEventListener("mousemove", el.mm, 0)
        }

        dragged = document.querySelectorAll('figure["data-view"]');
        for (i = 0; i < dragged.length;) {

            (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                (cont = el.container || el).addEventListener("mousedown",
                    cont.md = function(e) {
                        if (!el.hasAttribute('nochilddrag') ||
                            document.elementFromPoint( e.pageX, e.pageY ) == cont
                        ) {
                            pushed = 1;
                            lastClientX = e.clientX;
                            lastClientY = e.clientY;

                            e.preventDefault();
                        }
                    }, 0
                );

                window.addEventListener(
                    "mouseup",
                    cont.mu = function() {pushed = 0;}, 0);

                window.addEventListener(
                    "mousemove",
                    cont.mm = function(e) {
                        if (pushed) {
                            (scroller = el.scroller||el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX=e.clientX));
                            scroller.scrollTop -=
                                newScrollY = (- lastClientY + (lastClientY=e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0 );
             })(dragged[i++]);
        }
    }

      
    if (document.readyState == 'complete') {
        reset();
    } else {
        window.addEventListener('load', reset, 0);
    }
})();
