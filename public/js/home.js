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


const filter_by_css_class = function(arr, css_class) {
	return arr.filter( function(element) { return element.classList.contains(css_class)})
}

const toggle_thumbnails_category = function(categorized_thumbnails, is_checked) {
	if(is_checked) {
		for(i = 0; i < categorized_thumbnails.length; i++) {
			const thumbnail = categorized_thumbnails[i];
			const img = thumbnail.querySelector('img.thumbnail')
			const placeholder = thumbnail.querySelector('div.placeholder')
			img.style.opacity = "1";
			placeholder.style.opacity ="0";
		}
	} else {
		for(i = 0; i < categorized_thumbnails.length; i++) {
			const thumbnail = categorized_thumbnails[i];
			const img = thumbnail.querySelector('img.thumbnail')
			const placeholder = thumbnail.querySelector('div.placeholder')
			img.style.opacity = "0";
			placeholder.style.opacity ="1";
		}
	}
}

const manage_thumbnails = function(thumbnails) {
	const thumbnails_arr = Array.prototype.slice.call(thumbnails)
	const thumbnails_interactive = filter_by_css_class(thumbnails_arr, "post-category-interactive")
	const thumbnails_dataviz = filter_by_css_class(thumbnails_arr, "post-category-dataviz")
	const thumbnails_graphic = filter_by_css_class(thumbnails_arr, "post-category-graphic")
	const checkbox_interactive = document.getElementById('checkbox-interactive')
	const checkbox_dataviz = document.getElementById('checkbox-dataviz')
	const checkbox_graphic = document.getElementById('checkbox-graphic')

	if(!checkbox_interactive.checked) {
		toggle_thumbnails_category(thumbnails_interactive, false);
	}
	if(!checkbox_dataviz.checked) {
		toggle_thumbnails_category(thumbnails_dataviz, false);
	}
	if(!checkbox_graphic.checked) {
		toggle_thumbnails_category(thumbnails_graphic, false);
	}

	checkbox_interactive.addEventListener('click', function() {
		const is_checked = checkbox_interactive.checked;
		toggle_thumbnails_category(thumbnails_interactive, is_checked)
	})

	checkbox_dataviz.addEventListener('click', function() {
		const is_checked = checkbox_dataviz.checked;
		toggle_thumbnails_category(thumbnails_dataviz, is_checked)
	})

	checkbox_graphic.addEventListener('click', function() {
		const is_checked = checkbox_graphic.checked;
		toggle_thumbnails_category(thumbnails_graphic, is_checked)
	})


}

const resize_placeholders = function(thumbnails) {
	for(i = 0; i < thumbnails.length; i++ ) {
		const thumbnail = thumbnails[i];
		const image_link = thumbnail.querySelector('a.image-link');
		const img = thumbnail.querySelector('img.thumbnail');
		const img_w = img.clientWidth;
		const img_h = img.clientHeight;
		const placeholder = image_link.querySelector('div.placeholder')
		placeholder.style.width = img_w + "px";
		placeholder.style.height = img_h + "px";
	}
}

const init_thumbnails = function() {
	const thumbnails = document.querySelectorAll('li.post')

	for(i = 0; i < thumbnails.length; i++) {
		const thumbnail = thumbnails[i];
		const image_link = thumbnail.querySelector('a.image-link');
		const img = thumbnail.querySelector('img.thumbnail');
		const img_w = img.clientWidth;
		const img_h = img.clientHeight;
		const placeholder = document.createElement('div');
		placeholder.style.width = img_w + "px";
		placeholder.style.height = img_h + "px";
		placeholder.classList.add('placeholder');
		image_link.append(placeholder);
	}
	manage_thumbnails(thumbnails);

	window.addEventListener('resize', function() {
 		debounce(resize_placeholders(thumbnails), 500)
	})
}

window.addEventListener('load', function() {
    init_thumbnails();
})
