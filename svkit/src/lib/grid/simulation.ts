import {
	ANGLE_CURVE,
	ANGLE_EASING,
	BASE_ALPHA,
	DAMPING,
	FADE_CURVE,
	FALLOFF_CURVE,
	HOLD,
	HOLD_TURN,
	HOLD_TWIST,
	MAX_ACTIVE,
	MAX_ANGLE,
	MAX_TWIST,
	PULL,
	RADIUS_RATIO,
	RELEASE,
	SETTLED_ANGLE,
	SETTLED_VELOCITY,
	SIMULATION_FPS,
	SNAP,
	STIFFNESS,
	SWELL,
	TRIGGERED_ANGLE,
	TRIGGER_INTERVAL,
	TWIST_CURVE
} from './config.ts';
import type { Cell, Layout, Point, Trigger } from './layout.ts';

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

type Active = { trigger: Trigger; power: number; wind: number };

function activate(trigger: Trigger, time: number): Active {
	if (trigger.snap) {
		const remaining = easeInOut(Math.max(0, 1 - (time - trigger.snap.at) / SNAP));
		return { trigger, power: trigger.snap.power * remaining, wind: trigger.snap.wind * remaining };
	}
	const age = time - trigger.born;
	if (age < SWELL) return { trigger, power: easeInOut(age / SWELL), wind: 0 };
	if (age < SWELL + HOLD) return { trigger, power: 1, wind: (age - SWELL) / HOLD };
	const power = easeInOut(Math.max(0, 1 - (age - SWELL - HOLD) / RELEASE));
	return { trigger, power, wind: power };
}

function schedule(layout: Layout, time: number, random: () => number) {
	layout.triggers = layout.triggers.filter((trigger) =>
		trigger.snap ? time - trigger.snap.at < SNAP : time - trigger.born < SWELL + HOLD + RELEASE
	);
	if (time < layout.nextTrigger) return;
	layout.nextTrigger = time + TRIGGER_INTERVAL.min + random() * (TRIGGER_INTERVAL.max - TRIGGER_INTERVAL.min);
	if (layout.triggers.length >= MAX_ACTIVE) return;
	const idle = layout.cells.filter((cell) => !layout.triggers.some((trigger) => trigger.cell === cell));
	layout.triggers.push({ cell: idle[Math.floor(random() * idle.length)], born: time });
}

function entersSquare(square: Point[], corner: number, towards: Point) {
	const origin = square[corner];
	const cross = (a: Point, b: Point) =>
		(a.x - origin.x) * (b.y - origin.y) - (a.y - origin.y) * (b.x - origin.x);
	const next = square[(corner + 1) % 4];
	const previous = square[(corner + 3) % 4];
	const wedge = Math.sign(cross(next, previous));
	return Math.sign(cross(next, towards)) === wedge && Math.sign(cross(towards, previous)) === wedge;
}

function crossesOwnSquare(layout: Layout, cell: Cell) {
	const index = layout.cells.indexOf(cell);
	const column = Math.floor(index / layout.rows);
	const row = index % layout.rows;
	const edges: [number, Point][] = [];
	if (column < layout.columns - 1) edges.push([1, layout.cells[index + layout.rows].parent[3]]);
	if (column > 0) edges.push([3, layout.cells[index - layout.rows].parent[1]]);
	if (row < layout.rows - 1) edges.push([0, layout.cells[index + 1].parent[2]]);
	if (row > 0) edges.push([2, layout.cells[index - 1].parent[0]]);
	return edges.some(([corner, towards]) => entersSquare(cell.parent, corner, towards));
}

function falloff(layout: Layout, from: Point, to: Point) {
	return Math.max(0, 1 - distance(from, to) / layout.reach) ** FALLOFF_CURVE;
}

function displaceVertices(layout: Layout, active: Active[]) {
	for (const vertex of layout.vertices) {
		vertex.head.x = vertex.origin.x;
		vertex.head.y = vertex.origin.y;
		for (const { trigger, power } of active) {
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

function shapeCell(cell: Cell, influence: number, own: number, winding: number, stretch: number, frames: number) {
	const [topLeft, bottomLeft, topRight, bottomRight] = cell.corners;
	const diagonal = (distance(topLeft.head, bottomRight.head) + distance(bottomLeft.head, topRight.head)) / 2;
	const radius = diagonal * RADIUS_RATIO;

	const targetAngle = lerp(MAX_ANGLE * influence ** ANGLE_CURVE, TRIGGERED_ANGLE, own) + HOLD_TURN * winding;
	cell.angle = lerp(cell.angle, targetAngle, 1 - ANGLE_EASING ** frames);
	cell.alpha = lerp(BASE_ALPHA * (1 - stretch) ** FADE_CURVE, 1, own);

	cell.parent.forEach((point, i) => {
		const angle = (i * Math.PI) / 2 + cell.angle;
		point.x = cell.pos.x + (Math.sin(angle) * radius) / 2;
		point.y = cell.pos.y + (Math.cos(angle) * radius) / 2;
	});

	const twist = MAX_TWIST * influence ** TWIST_CURVE * (1 - own) + HOLD_TWIST * winding;
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
	const frames = delta * SIMULATION_FPS;
	schedule(layout, time, random);
	const active = layout.triggers.map((trigger) => activate(trigger, time));

	displaceVertices(layout, active);
	const maxStretch = PULL * layout.cellSize * falloff(layout, { x: 0, y: 0 }, { x: layout.cellSize, y: 0 });

	let moving = layout.triggers.length > 0;
	for (const cell of layout.cells) {
		let targetX = cell.origin.x;
		let targetY = cell.origin.y;
		let influence = 0;
		let own = 0;
		let winding = 0;
		for (const { trigger, power, wind } of active) {
			if (trigger.cell === cell) {
				own = Math.max(own, power);
				winding = Math.max(winding, power * wind);
				continue;
			}
			const pull = power * falloff(layout, cell.origin, trigger.cell.origin);
			targetX += (trigger.cell.origin.x - cell.origin.x) * PULL * pull;
			targetY += (trigger.cell.origin.y - cell.origin.y) * PULL * pull;
			influence = Math.max(influence, pull);
			winding = Math.max(winding, pull * wind);
		}
		const sliding = moveCell(cell, targetX, targetY, frames);
		const stretch = Math.min(1, distance(cell.pos, cell.origin) / maxStretch);
		const turning = shapeCell(cell, influence, own, winding, stretch, frames);
		moving ||= sliding || turning;
	}

	for (const { trigger, power, wind } of active) {
		if (!trigger.snap && crossesOwnSquare(layout, trigger.cell)) trigger.snap = { at: time, power, wind };
	}

	return moving ? time : layout.nextTrigger;
}
