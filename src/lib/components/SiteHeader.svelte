<script lang="ts">
	let { children } = $props();
</script>

<header
	class="flex w-full flex-col items-start px-4 xl:px-20 pt-4 lg:flex-row lg:justify-between lg:pb-4"
>
	{@render children?.()}
</header>
