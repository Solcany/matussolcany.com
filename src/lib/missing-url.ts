function readable(path: string) {
	try {
		return decodeURI(path);
	} catch {
		return path;
	}
}

document.querySelectorAll('[data-missing-url]').forEach((slot) => {
	slot.textContent = `: ${readable(location.href)}`;
});
