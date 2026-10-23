<script lang="ts">
	let { children } = $props();
</script>

<div
	class="flex w-full flex-col l:flex-row [&>figure]:w-full l:[&>figure]:w-1/2 l:[&>figure:first-child]:pr-2"
>
	{@render children?.()}
</div>
