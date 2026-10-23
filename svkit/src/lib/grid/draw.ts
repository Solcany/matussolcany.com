import { LATTICE_WIDTH, OUTLINE_WIDTH, VISIBLE_ALPHA } from './config.ts';
import type { Layout, Point } from './layout.ts';

type Colors = { fill: string; stroke: string };

function addSquare(ctx: CanvasRenderingContext2D, points: Point[]) {
	ctx.moveTo(points[0].x, points[0].y);
	for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
	ctx.closePath();
}

export function draw(ctx: CanvasRenderingContext2D, layout: Layout, colors: Colors) {
	ctx.clearRect(0, 0, layout.width, layout.height);
	ctx.fillStyle = colors.fill;
	ctx.strokeStyle = colors.stroke;
	ctx.lineJoin = 'round';

	ctx.beginPath();
	layout.cells.forEach((cell, i) => {
		const column = Math.floor(i / layout.rows);
		const row = i % layout.rows;
		if (column < layout.columns - 1) {
			const right = layout.cells[i + layout.rows];
			ctx.moveTo(cell.parent[1].x, cell.parent[1].y);
			ctx.lineTo(right.parent[3].x, right.parent[3].y);
		}
		if (row < layout.rows - 1) {
			const below = layout.cells[i + 1];
			ctx.moveTo(cell.parent[0].x, cell.parent[0].y);
			ctx.lineTo(below.parent[2].x, below.parent[2].y);
		}
	});
	ctx.globalAlpha = 1;
	ctx.lineWidth = LATTICE_WIDTH;
	ctx.stroke();

	for (const cell of layout.cells) {
		if (cell.alpha < VISIBLE_ALPHA) continue;
		ctx.globalAlpha = cell.alpha;
		for (const square of [cell.parent, ...cell.children]) {
			ctx.beginPath();
			addSquare(ctx, square);
			ctx.fill();
		}
	}

	ctx.beginPath();
	for (const cell of layout.cells) {
		addSquare(ctx, cell.parent);
		for (const square of cell.children) addSquare(ctx, square);
	}
	ctx.globalAlpha = 1;
	ctx.lineWidth = OUTLINE_WIDTH;
	ctx.stroke();
}
