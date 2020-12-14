const CONTENT_HORIZONTAL_PADDING = 32; // left + right padding, the val comes from scss $offset3 variable
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

const init = function() {
    // collect only zoomable images
    const zoomable_images = document.querySelectorAll('img[data-zoomable]')

    zoomable_images.forEach(function(image) {
        image.addEventListener('click', function() {
            const current_view = image.getAttribute("data-zoomable")
                // if the clicked image isn't expanded, expand it
                if(current_view == "basic-view") {
                    image.setAttribute("data-zoomable", "full-view")
                    const screen_width = get_screen_width()
                    const new_image_width = screen_width - CONTENT_HORIZONTAL_PADDING;
                    image.style.width = new_image_width + "px";
                // otherwise fit it back into container
                } else if (current_view == "full-view"){
                    image.setAttribute("data-zoomable", "basic-view")
                    image.style.width = "100%";
                }
        })
    })
    // if for some reason this script is loaded on a mobile device...
    // (which should be prevented in <head>)
    // ...disable zoom
    disable_zoom_on_mobile_width(zoomable_images);

    // if the user resizes their window...
    window.addEventListener('resize', function(){
       // ...resize all expanded images to fit the new width
       debounce(resize_fullscreen_images(zoomable_images), 250)
       // ...if the screen is resized to mobile, disable the zoom
       debounce(disable_zoom_on_mobile_width(zoomable_images), 250)
    })
}

window.addEventListener('load', function() {
    init();
})
