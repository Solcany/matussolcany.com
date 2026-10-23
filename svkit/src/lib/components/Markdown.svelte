<script module lang="ts">
	export { default as h1 } from './H1.svelte';
	export { default as h2 } from './H2.svelte';
	export { default as h3 } from './H3.svelte';
	export { default as h4 } from './H4.svelte';
	export { default as p } from './P.svelte';
	export { default as a } from './A.svelte';
	export { default as ul } from './Ul.svelte';
	export { default as li } from './Li.svelte';
	export { default as img } from './Img.svelte';
</script>

<script lang="ts">
	let { children } = $props();
</script>

{@render children?.()}
