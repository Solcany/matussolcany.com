import { draw } from './draw.ts';
import { createLayout, type Layout } from './layout.ts';
import { step } from './simulation.ts';

const MAX_DELTA = 1 / 20;
const START_DELAY = 2;
const SPEED = 0.8;
const MAX_PIXEL_RATIO = 2;
const FRAME_INTERVAL = 1000 / 60;
const FRAME_TOLERANCE = 2;

export function mountGrid(element: HTMLElement) {
	const canvas = document.createElement('canvas');
	canvas.className = 'absolute inset-0 size-full';
	element.append(canvas);

	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const styles = getComputedStyle(element);
	const colors = {
		fill: styles.getPropertyValue('--color-accent').trim(),
		stroke: styles.getPropertyValue('--color-line').trim()
	};
	const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

	let layout: Layout;
	let elapsed = 0;
	let last = 0;
	let frame = 0;
	let sleep = 0;
	let onScreen = false;

	const resize = () => {
		const { width, height } = element.getBoundingClientRect();
		if (!width || !height) return;
		const ratio = Math.min(devicePixelRatio || 1, MAX_PIXEL_RATIO);
		canvas.width = Math.round(width * ratio);
		canvas.height = Math.round(height * ratio);
		ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
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

	const resizeObserver = new ResizeObserver(() => {
		resize();
		update();
	});
	const intersectionObserver = new IntersectionObserver(([entry]) => {
		onScreen = entry.isIntersecting;
		update();
	});
	resizeObserver.observe(element);
	intersectionObserver.observe(element);
	document.addEventListener('visibilitychange', update);

	return () => {
		cancelAnimationFrame(frame);
		clearTimeout(sleep);
		resizeObserver.disconnect();
		intersectionObserver.disconnect();
		document.removeEventListener('visibilitychange', update);
		canvas.remove();
	};
}
