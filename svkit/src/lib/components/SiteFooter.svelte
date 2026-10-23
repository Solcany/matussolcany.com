<script lang="ts">
	let { children } = $props();
</script>

<footer class="w-full px-4 py-4 l:px-20">
	<ul class="flex flex-col l:flex-row l:justify-between">{@render children?.()}</ul>
</footer>
