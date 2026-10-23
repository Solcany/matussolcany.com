<script lang="ts">
	import A from '../elements/A.svelte';

	let { children, href } = $props();
</script>

<li class="pb-2"><A {href}>{@render children?.()}</A></li>
