import { error } from '@sveltejs/kit';
import { nextProject, projects } from '#lib/content.ts';

export function entries() {
	return projects.map(({ slug }) => ({ slug }));
}

export function load({ params }) {
	const project = projects.find(({ slug }) => slug === params.slug);
	if (!project) error(404, 'Not found');

	return { project, next: nextProject(project.slug) };
}
