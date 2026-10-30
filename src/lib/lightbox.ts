const dialog = document.querySelector<HTMLDialogElement>('dialog[data-lightbox]');
const figure = dialog?.querySelector('figure');
const image = figure?.querySelector('img');
const caption = figure?.querySelector('figcaption');

if (dialog && figure && image && caption) {
	document.addEventListener('click', (event) => {
		if (event.target === dialog) return dialog.close();
		if (!(event.target instanceof Element)) return;

		const source = event.target.closest<HTMLImageElement>('img[data-lightbox]');
		if (!source) return;

		const desktop = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-lg');
		if (!matchMedia(`(min-width: ${desktop})`).matches) return;

		const text = source.closest('figure')?.querySelector('figcaption')?.textContent?.trim() ?? '';
		const width = Number(source.getAttribute('width'));
		const height = Number(source.getAttribute('height'));
		const tallest = text ? 85 : 90;

		image.src = source.src;
		image.alt = source.alt;
		caption.textContent = text;
		figure.style.width = width && height ? `min(90vw, ${(tallest * width) / height}vh)` : '90vw';
		dialog.showModal();
		dialog.focus();
	});

	dialog.addEventListener('close', () => image.removeAttribute('src'));
}
