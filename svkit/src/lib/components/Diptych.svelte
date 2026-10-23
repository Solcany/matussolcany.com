<script lang="ts">
	let { children } = $props();
</script>

<div
	class="flex w-full flex-col lg:flex-row [&>figure]:w-full lg:[&>figure]:w-1/2 lg:[&>figure:first-child]:pr-2"
>
	{@render children?.()}
</div>
