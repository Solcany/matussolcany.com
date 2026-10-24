import {
	FRAME_INTERVAL,
	FRAME_TOLERANCE,
	MAX_DELTA,
	PIXEL_RATIO,
	RESIZE_DEBOUNCE,
	SPEED,
	START_DELAY
} from './config.ts';
import { draw } from './draw.ts';
import { createLayout, type Layout } from './layout.ts';
import { step } from './simulation.ts';

export function mountGrid(element: HTMLElement) {
	const canvas = document.createElement('canvas');
	canvas.className = 'absolute inset-0 size-full';
	element.append(canvas);

	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const readColors = () => {
		const styles = getComputedStyle(element);
		return {
			fill: styles.getPropertyValue('--color-accent').trim(),
			stroke: styles.getPropertyValue('--color-line').trim()
		};
	};
	let colors = readColors();
	const colorScheme = matchMedia('(prefers-color-scheme: dark)');
	const recolor = () => {
		colors = readColors();
		if (layout) draw(ctx, layout, colors);
	};
	const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

	let layout: Layout;
	let elapsed = 0;
	let last = 0;
	let frame = 0;
	let sleep = 0;
	let resizing = 0;
	let size = { width: 0, height: 0 };
	let onScreen = false;

	const resize = () => {
		const { width, height } = element.getBoundingClientRect();
		if (!width || !height || (width === size.width && height === size.height)) return;
		size = { width, height };
		canvas.width = Math.round(width * PIXEL_RATIO);
		canvas.height = Math.round(height * PIXEL_RATIO);
		ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
		layout = createLayout(width, height, elapsed + START_DELAY);
		step(layout, elapsed, 0, Math.random);
		draw(ctx, layout, colors);
	};

	const tick = (now: number) => {
		if (now - last < FRAME_INTERVAL - FRAME_TOLERANCE) {
			frame = requestAnimationFrame(tick);
			return;
		}
		const delta = Math.min((now - last) / 1000, MAX_DELTA) * SPEED;
		last = now;
		elapsed += delta;
		const wakeAt = step(layout, elapsed, delta, Math.random);
		draw(ctx, layout, colors);
		if (wakeAt > elapsed) {
			frame = 0;
			sleep = setTimeout(() => {
				elapsed = wakeAt;
				start();
			}, ((wakeAt - elapsed) / SPEED) * 1000);
			return;
		}
		frame = requestAnimationFrame(tick);
	};

	const start = () => {
		last = performance.now();
		frame = requestAnimationFrame(tick);
	};

	const update = () => {
		cancelAnimationFrame(frame);
		clearTimeout(sleep);
		frame = 0;
		if (reducedMotion || !onScreen || document.hidden || !layout) return;
		start();
	};

	const rebuild = () => {
		resize();
		update();
	};

	const resizeObserver = new ResizeObserver(() => {
		clearTimeout(resizing);
		if (layout) resizing = setTimeout(rebuild, RESIZE_DEBOUNCE);
		else rebuild();
	});
	const intersectionObserver = new IntersectionObserver(([entry]) => {
		onScreen = entry.isIntersecting;
		update();
	});
	resizeObserver.observe(element);
	intersectionObserver.observe(element);
	document.addEventListener('visibilitychange', update);
	colorScheme.addEventListener('change', recolor);

	return () => {
		cancelAnimationFrame(frame);
		clearTimeout(sleep);
		clearTimeout(resizing);
		resizeObserver.disconnect();
		intersectionObserver.disconnect();
		document.removeEventListener('visibilitychange', update);
		colorScheme.removeEventListener('change', recolor);
		canvas.remove();
	};
}
