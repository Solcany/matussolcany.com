<script lang="ts">
	let { children } = $props();
</script>

<ul class="grid w-full grid-cols-1 gap-x-2 pt-2 lg:grid-flow-row-dense lg:grid-cols-2 lg:pt-4">
	{@render children?.()}
</ul>
