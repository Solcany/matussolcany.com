<script lang="ts">
	import H2 from './H2.svelte';

	let { children, id } = $props();
</script>

<H2 {id} class="pt-2 group-hover:text-accent group-focus-visible:text-accent">{@render children?.()}</H2>
