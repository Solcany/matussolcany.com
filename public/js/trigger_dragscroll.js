const CONTENT_HORIZONTAL_PADDING = 32; // left + right padding, the val comes from scss $offset3 variable
const VIEW_CONTROL_BUTTON_WIDTH = 30;

const PADDING_MOBILE = CONTENT_HORIZONTAL_PADDING
const PADDING_DESKTOP = CONTENT_HORIZONTAL_PADDING +  VIEW_CONTROL_BUTTON_WIDTH

const MEDIA_QUERY = window.matchMedia( "(max-width: 959px)" );


var is_zoom_disabled = false; // not nice, but will have to do for now

const debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const get_screen_width = function() {
    var win = window,
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        x = win.innerWidth || docElem.clientWidth || body.clientWidth
    return x;
}

const resize_fullscreen_images = function(images) {
    // resize all images so they perfectly fill the content space of <main> element
    // including horizontal padding
    const screen_width = get_screen_width()

    images.forEach(function(image) {
        const current_view = image.getAttribute("data-zoomable");
        if(current_view == "full-view") {
            const new_image_width = screen_width - CONTENT_HORIZONTAL_PADDING;
            image.style.width = new_image_width + "px";
        }
    })
}

const disable_zoom_on_mobile_width = function(images) {
    // image zoom is disabled on mobile devices
    const media_query = window.matchMedia( "(max-width: 959px)" );

    // save the curent state of zoom lock
    const was_zoom_disabled = is_zoom_disabled;

    // update the state of zoom lock
    if(media_query.matches) {
        is_zoom_disabled = true;
    } else {
        is_zoom_disabled = false;
    }

    // if the window is resized from desktop width to mobile width...
    if(!was_zoom_disabled && is_zoom_disabled) {
        images.forEach(function(image) {
            // disable zoom and set width of the image to 100%
            image.setAttribute("data-zoomable", "basic-view-disabled")
            image.style.width = "100%";
        })
    // if the window is resized from mobile to desktop width...
    } else if (was_zoom_disabled && !is_zoom_disabled) {
        images.forEach(function(image) {
            // reset zoom to basic-view
            image.setAttribute("data-zoomable", "basic-view")
        })
    }
}

const dragscroll = function() {
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
        dragged = document.querySelectorAll('div.img-container');
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed, scroller, cont, parent){
                cont = el.container || el
                parent =  cont.parentElement.parentElement
                cont.addEventListener("mousedown",
                    cont.md = function(e) {
                        if (!el.hasAttribute('nochilddrag') ||
                            document.elementFromPoint( e.pageX, e.pageY ) == cont
                        ) {
                            // check if the image is expanded
                            if(parent.getAttribute("data-view") === "expanded-view") {
                                pushed = 1;
                                console.log("drag ev")
                                lastClientX = e.clientX;
                                lastClientY = e.clientY;
                            }
                            //e.preventDefault();
                        }
                    }, 0
                );

                window.addEventListener(
                    "mouseup",
                    cont.mu = function() {
                        pushed = 0;}, 0);

                window.addEventListener(
                    "mousemove",
                    cont.mm = function(e) {
                        if (pushed && parent.getAttribute("data-view") === "expanded-view") {
                            (scroller = el.scroller||el).scrollLeft -= newScrollX = (- lastClientX + (lastClientX=e.clientX));
                            scroller.scrollTop -= newScrollY = (- lastClientY + (lastClientY=e.clientY));
                            if (el == document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0 );
             })(dragged[i++]);
        }
    }
    reset();
}

const init = function() {
    // collect only zoomable images
    const expandable_containers = document.querySelectorAll('div[data-view]')
    const view_control_buttons =  document.querySelectorAll('button.control-view')

    var padding = (MEDIA_QUERY.matches) ? PADDING_MOBILE : PADDING_DESKTOP

    expandable_containers.forEach(function(container, index) {
        const control_button = view_control_buttons[index];
        control_button.addEventListener('click', function() {
            const current_view = container.getAttribute("data-view")
            const figure = container.querySelector('figure.expandable')

            // check if hq image has been loaded yet
            var is_hq_loaded = container.getAttribute("data-hq-loaded")

            // if hq img isn't loaded yet, load it and replace the lq image
            if(current_view == "basic-view" && !is_hq_loaded) {
                // hq_img_src value is set within the Hugo shortcode "zoomable_img.html"
                const hq_img_src = container.getAttribute("data-hq-src")
                const hq_img = document.createElement('img');
                const img_container = document.createElement('div');

                hq_img.src = hq_img_src
                hq_img.setAttribute('data-hq', '')
                hq_img.setAttribute('draggable', false); // prevent ghost image dragging
                img_container.append(hq_img);
                img_container.classList.add("img-container");

                hq_img.onload = function() {
                    // set the new hq image to it's actual size
                    this.style.width = this.width + "px"

                    // make the container take up the entire screen
                    const screen_width = get_screen_width()
                    const new_container_width = screen_width - padding;
                    img_container.style.width = new_container_width + "px";
                    container.setAttribute("data-view", "expanded-view")
                    container.setAttribute("data-hq-loaded", "true")
                    figure.prepend(img_container);
                    dragscroll();

                }
                // if the hq image is already loaded, just show it
                } else if (current_view == "basic-view" && is_hq_loaded) {
                    const screen_width = get_screen_width()
                    const new_container_width = screen_width - padding;
                    const img_container = figure.querySelector("div.img-container");
                    img_container.style.width = new_container_width + "px";
                    container.setAttribute("data-view", "expanded-view")
                // switch to the basic view: show lq image instead
                } else if (current_view =="expanded-view") {
                    const img_container = figure.querySelector("div.img-container");
                    img_container.style.width = "100%";
                    container.setAttribute("data-view", "basic-view")
                }
        })
    })
    // if for some reason this script is loaded on a mobile device...
    // (which should be prevented in <head>)
    // ...disable zoom
    //disable_zoom_on_mobile_width(zoomable_images);

    // if the user resizes their window...
    window.addEventListener('resize', function(){
       // ...resize all expanded images to fit the new width
      // debounce(resize_fullscreen_images(zoomable_images), 250)
       // ...if the screen is resized to mobile, disable the zoom
      // debounce(disable_zoom_on_mobile_width(zoomable_images), 250)
    })
}

window.addEventListener('load', function() {
    init();
    //dragscroll();
})
