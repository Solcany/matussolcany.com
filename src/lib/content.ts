import type { ResponsiveImage } from './image.ts';
import { resolve } from '$app/paths';
import type { Component } from 'svelte';

type Metadata = {
	title: string;
	date: Date | string;
	description?: string;
	thumbnail_alt?: string;
	is_listed?: boolean;
	is_showcased?: boolean;
	showcase_column?: number;
	showcase_column_position?: number;
};

export type Module = { default: Component; metadata: Metadata };

const drafts = import.meta.env.DEV
	? await import('./drafts.ts')
	: { modules: {}, thumbnails: {} };

const modules = {
	...import.meta.glob<Module>('/src/content/projects/*/index.svx', { eager: true }),
	...drafts.modules
};

const thumbnails = {
	...import.meta.glob<ResponsiveImage>('/src/content/projects/*/image/thumbnail.jpg', {
		eager: true,
		query: '?responsive',
		import: 'default'
	}),
	...drafts.thumbnails
};

export const projects = Object.entries(modules)
	.map(([path, { default: content, metadata }]) => {
		const slug = path.split('/').at(-2) ?? '';
		return {
			...metadata,
			slug,
			content,
			href: resolve(`projects/${slug}/`),
			thumbnail: thumbnails[path.replace('index.svx', 'image/thumbnail.jpg')]
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function nextProject(slug: string) {
	const index = projects.findIndex((project) => project.slug === slug);
	for (let step = 1; step < projects.length; step++) {
		const candidate = projects[(index + step) % projects.length];
		if (candidate.is_listed) return candidate;
	}
}
