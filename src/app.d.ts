declare module '*.svx' {
	import type { Component } from 'svelte';
	const component: Component;
	export const metadata: { title: string };
	export default component;
}
