import type { Module } from './content.ts';

export const modules = import.meta.glob<Module>('/src/content/drafts/*/index.svx', { eager: true });

export const thumbnails = import.meta.glob<string>('/src/content/drafts/*/image/thumbnail.jpg', {
	eager: true,
	query: '?url',
	import: 'default'
});
