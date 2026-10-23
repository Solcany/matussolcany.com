import type { ResponsiveImage } from './image.ts';
import type { Module } from './content.ts';

export const modules = import.meta.glob<Module>('/src/content/drafts/*/index.svx', { eager: true });

export const thumbnails = import.meta.glob<ResponsiveImage>('/src/content/drafts/*/image/thumbnail.jpg', {
	eager: true,
	query: '?responsive',
	import: 'default'
});
