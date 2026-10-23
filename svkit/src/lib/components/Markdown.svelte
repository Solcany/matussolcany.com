<script module lang="ts">
	export { default as h1 } from './elements/H1.svelte';
	export { default as h2 } from './elements/H2.svelte';
	export { default as h3 } from './elements/H3.svelte';
	export { default as h4 } from './elements/H4.svelte';
	export { default as p } from './elements/P.svelte';
	export { default as a } from './elements/A.svelte';
	export { default as ul } from './elements/Ul.svelte';
	export { default as li } from './elements/Li.svelte';
	export { default as img } from './elements/Img.svelte';
</script>

<script lang="ts">
	let { children } = $props();
</script>

{@render children?.()}
