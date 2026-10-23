<script lang="ts">
	let { children } = $props();
</script>

<footer class="w-full px-4 py-4">
	<ul class="flex flex-col lg:flex-row lg:justify-between">{@render children?.()}</ul>
</footer>
