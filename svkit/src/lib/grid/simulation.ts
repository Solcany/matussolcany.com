import type { Cell, Layout, Point, Trigger } from './layout.ts';

const RADIUS_RATIO = 0.28;
const MAX_TWIST = 0.4;
const MAX_ANGLE = Math.PI / 2.46;
const TRIGGERED_ANGLE = Math.PI / 2.05;
const BASE_ALPHA = 150 / 255;

const PULL = 0.6;
const STIFFNESS = 0.02;
const DAMPING = 0.88;

const SWELL = 1.2;
const HOLD = 2.5;
const RELEASE = 2;
const MAX_ACTIVE = 3;

const SETTLED_VELOCITY = 0.01;
const SETTLED_ANGLE = 0.001;

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

function strength(trigger: Trigger, time: number) {
	const age = time - trigger.born;
	if (age < SWELL) return easeInOut(age / SWELL);
	if (age < SWELL + HOLD) return 1;
	return easeInOut(Math.max(0, 1 - (age - SWELL - HOLD) / RELEASE));
}

function isHolding(trigger: Trigger, time: number) {
	const age = time - trigger.born;
	return age >= SWELL && age < SWELL + HOLD;
}

function schedule(layout: Layout, time: number, random: () => number) {
	layout.triggers = layout.triggers.filter((trigger) => time - trigger.born < SWELL + HOLD + RELEASE);
	if (time < layout.nextTrigger) return;
	layout.nextTrigger = time + 1.5 + random() * 2;
	if (layout.triggers.length >= MAX_ACTIVE) return;
	const idle = layout.cells.filter((cell) => !layout.triggers.some((trigger) => trigger.cell === cell));
	layout.triggers.push({ cell: idle[Math.floor(random() * idle.length)], born: time });
}

function falloff(layout: Layout, from: Point, to: Point) {
	return Math.max(0, 1 - distance(from, to) / layout.reach) ** 2;
}

function displaceVertices(layout: Layout, active: [Trigger, number][]) {
	for (const vertex of layout.vertices) {
		vertex.head.x = vertex.origin.x;
		vertex.head.y = vertex.origin.y;
		for (const [trigger, power] of active) {
			const center = trigger.cell.origin;
			const away = Math.atan2(vertex.origin.y - center.y, vertex.origin.x - center.x);
			const offset = layout.push * power * falloff(layout, vertex.origin, center);
			vertex.head.x += Math.cos(away) * offset;
			vertex.head.y += Math.sin(away) * offset;
		}
	}
}

function moveCell(cell: Cell, targetX: number, targetY: number, frames: number) {
	const damping = DAMPING ** frames;
	cell.velocity.x = (cell.velocity.x + (targetX - cell.pos.x) * STIFFNESS * frames) * damping;
	cell.velocity.y = (cell.velocity.y + (targetY - cell.pos.y) * STIFFNESS * frames) * damping;
	cell.pos.x += cell.velocity.x * frames;
	cell.pos.y += cell.velocity.y * frames;
	return Math.abs(cell.velocity.x) + Math.abs(cell.velocity.y) > SETTLED_VELOCITY;
}

function shapeCell(cell: Cell, influence: number, own: number, stretch: number, frames: number) {
	const [topLeft, bottomLeft, topRight, bottomRight] = cell.corners;
	const diagonal = (distance(topLeft.head, bottomRight.head) + distance(bottomLeft.head, topRight.head)) / 2;
	const radius = diagonal * RADIUS_RATIO;

	const targetAngle = lerp(MAX_ANGLE * influence ** 2, TRIGGERED_ANGLE, own);
	cell.angle = lerp(cell.angle, targetAngle, 1 - 0.9 ** frames);
	cell.alpha = lerp(BASE_ALPHA * (1 - stretch) ** 4, 1, own);

	cell.parent.forEach((point, i) => {
		const angle = (i * Math.PI) / 2 + cell.angle;
		point.x = cell.pos.x + (Math.sin(angle) * radius) / 2;
		point.y = cell.pos.y + (Math.cos(angle) * radius) / 2;
	});

	const twist = MAX_TWIST * influence ** 1.5 * (1 - own);
	let previous = cell.parent;
	for (const square of cell.children) {
		square.forEach((point, v) => {
			const next = previous[(v + 1) % 4];
			point.x = lerp(previous[v].x, next.x, twist);
			point.y = lerp(previous[v].y, next.y, twist);
		});
		previous = square;
	}

	return Math.abs(cell.angle - targetAngle) > SETTLED_ANGLE;
}

export function step(layout: Layout, time: number, delta: number, random: () => number) {
	const frames = delta * 60;
	schedule(layout, time, random);
	const active = layout.triggers.map((trigger): [Trigger, number] => [trigger, strength(trigger, time)]);

	displaceVertices(layout, active);
	const maxStretch = PULL * layout.cellSize * falloff(layout, { x: 0, y: 0 }, { x: layout.cellSize, y: 0 });

	let moving = layout.triggers.some((trigger) => !isHolding(trigger, time));
	for (const cell of layout.cells) {
		let targetX = cell.origin.x;
		let targetY = cell.origin.y;
		let influence = 0;
		let own = 0;
		for (const [trigger, power] of active) {
			if (trigger.cell === cell) {
				own = Math.max(own, power);
				continue;
			}
			const pull = power * falloff(layout, cell.origin, trigger.cell.origin);
			targetX += (trigger.cell.origin.x - cell.origin.x) * PULL * pull;
			targetY += (trigger.cell.origin.y - cell.origin.y) * PULL * pull;
			influence = Math.max(influence, pull);
		}
		const sliding = moveCell(cell, targetX, targetY, frames);
		const stretch = Math.min(1, distance(cell.pos, cell.origin) / maxStretch);
		const turning = shapeCell(cell, influence, own, stretch, frames);
		moving ||= sliding || turning;
	}

	if (moving) return time;
	return Math.min(layout.nextTrigger, ...layout.triggers.map((trigger) => trigger.born + SWELL + HOLD));
}
