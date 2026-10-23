<script lang="ts">
	import H2 from '../elements/H2.svelte';

	let { children } = $props();
</script>

<H2 class="pt-2 group-hover:text-theblue">{@render children?.()}</H2>
