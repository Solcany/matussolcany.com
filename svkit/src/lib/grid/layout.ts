import { BLEED, NESTED_SQUARES, PUSH, REACH, ROWS } from './config.ts';

export type Point = { x: number; y: number };

type Vertex = { origin: Point; head: Point };

export type Cell = {
	corners: [Vertex, Vertex, Vertex, Vertex];
	origin: Point;
	pos: Point;
	velocity: Point;
	angle: number;
	alpha: number;
	stretch: number;
	parent: Point[];
	children: Point[][];
};

export type Trigger = { cell: Cell; born: number; snap?: { at: number; power: number; wind: number } };

export type Layout = {
	width: number;
	height: number;
	cellSize: number;
	reach: number;
	push: number;
	columns: number;
	rows: number;
	cells: Cell[];
	vertices: Vertex[];
	triggers: Trigger[];
	nextTrigger: number;
};

const square = () => Array.from({ length: 4 }, () => ({ x: 0, y: 0 }));

export function createLayout(width: number, height: number, firstTrigger: number): Layout {
	const rows = ROWS;
	const columns = Math.max(1, Math.round((rows * width) / height));
	const step = { x: width / (columns - BLEED * 2), y: height / (rows - BLEED * 2) };

	const grid: Vertex[][] = [];
	for (let x = 0; x <= columns; x++) {
		grid[x] = [];
		for (let y = 0; y <= rows; y++) {
			const origin = { x: (x - BLEED) * step.x, y: (y - BLEED) * step.y };
			grid[x][y] = { origin, head: { ...origin } };
		}
	}

	const cells: Cell[] = [];
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			const corners: Cell['corners'] = [grid[x][y], grid[x][y + 1], grid[x + 1][y], grid[x + 1][y + 1]];
			const origin = {
				x: corners.reduce((sum, corner) => sum + corner.origin.x, 0) / 4,
				y: corners.reduce((sum, corner) => sum + corner.origin.y, 0) / 4
			};
			cells.push({
				corners,
				origin,
				pos: { ...origin },
				velocity: { x: 0, y: 0 },
				angle: 0,
				alpha: 0,
				stretch: 0,
				parent: square(),
				children: Array.from({ length: NESTED_SQUARES }, square)
			});
		}
	}

	const cellSize = Math.min(step.x, step.y);

	return {
		width,
		height,
		cellSize,
		reach: cellSize * REACH,
		push: cellSize * PUSH,
		columns,
		rows,
		cells,
		vertices: grid.flat(),
		triggers: [],
		nextTrigger: firstTrigger
	};
}
