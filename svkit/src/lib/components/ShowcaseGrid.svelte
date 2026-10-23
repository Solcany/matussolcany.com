<script lang="ts">
	let { children } = $props();
</script>

<ul class="grid w-full grid-cols-1 gap-x-2 pt-2 l:grid-flow-row-dense l:grid-cols-2 l:pt-4">
	{@render children?.()}
</ul>
