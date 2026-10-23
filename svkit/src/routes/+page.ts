import { projects } from '#lib/content.ts';

export function load() {
	const listed = projects.filter((project) => project.is_listed);
	const showcase = [0, 1].flatMap((column) =>
		listed
			.filter((project) => project.is_showcased && project.showcase_column === column)
			.sort((a, b) => (a.showcase_column_position ?? 0) - (b.showcase_column_position ?? 0))
			.map((project, position) => ({ ...project, eager: position === 0 }))
	);
	const rest = listed
		.filter((project) => !project.is_showcased)
		.sort((a, b) => a.title.localeCompare(b.title));

	return { showcase, rest };
}
