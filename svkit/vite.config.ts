import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import { mediaImports } from './media-imports.ts';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			paths: {
				relative: false
			},
			extensions: ['.svelte', '.svx'],
			preprocess: [
				mdsvex({
					extensions: ['.svx'],
					layout: new URL('./src/lib/components/Markdown.svelte', import.meta.url).pathname
				}),
				mediaImports()
			],
			prerender: {
				entries: ['*', '/404']
			}
		})
	],
	assetsInclude: ['**/*.ogv']
});
