const filter_by_css_class = function(arr, css_class) {
	return arr.filter( function(element) { return element.classList.contains(css_class)})
}

const toggle_thumbnails_category = function(categorized_thumbnails, is_checked) {
	if(!is_checked) {
		for(i = 0; i < categorized_thumbnails.length; i++) {
			const thumbnail = categorized_thumbnails[i];
			const img = thumbnail.querySelector('img.thumbnail')
			img.classList.add('inactive');
			img.classList.remove('active');
		}
	} else {
		for(i = 0; i < categorized_thumbnails.length; i++) {
			const thumbnail = categorized_thumbnails[i];
			const img = thumbnail.querySelector('img.thumbnail')
			img.classList.add('active');
			img.classList.remove('inactive');

		}
	}
}
const toggle_thumbnails = function(categorized_thumbnails, checkboxes) {
	const checkboxes_state = checkboxes.map(function(checkbox) {
		return checkbox.checked;
	})
	for(let u = 0; u <  checkboxes_state.length; u++) {
		const thumbnails = categorized_thumbnails[u];
		const checkbox_state = checkboxes_state[u];
		// if all checkboxes are unchecked, show all thubmnails
		//if(checkboxes_state.every(function(checkbox) { return checkbox == false })) {
		//	toggle_thumbnails_category(thumbnails, true);
			// otherwise filter based on checkbox state
		//} else {
			toggle_thumbnails_category(thumbnails, checkbox_state);
		//}
	}
}

const init_thumbnails = function() {
	const thumbnails = document.querySelectorAll('li.post')
	const thumbnails_arr = Array.prototype.slice.call(thumbnails)
	const checkboxes = document.querySelectorAll('input[data-category]')
	const checkboxes_arr = Array.prototype.slice.call(checkboxes);
	const categories = checkboxes_arr.map(function(checkbox) { return checkbox.getAttribute('data-category')})

	// amount of thumbnail categories must match the amount of checkboxes
	// in the DOM
	const categorized_thumbnails = categories.map(function(category) {
		return filter_by_css_class(thumbnails_arr, "post-category-" + category)
	})
	toggle_thumbnails(categorized_thumbnails, checkboxes_arr);
	for(let i = 0; i < checkboxes_arr.length; i++) {
		const checkbox = checkboxes_arr[i]
		checkbox.addEventListener('click', function() {
			toggle_thumbnails(categorized_thumbnails, checkboxes_arr);
		})
	}
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

window.addEventListener('load', function() {
    init_thumbnails();
})
